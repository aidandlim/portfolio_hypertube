const Bitfield = require('bitfield');
const blocklist = require('ip-set');
const bufferFrom = require('buffer-from');
const crypto = require('crypto');
const { EventEmitter } = require('events');
const Discovery = require('torrent-discovery');
const fs = require('fs-extra');
const FSChunkStore = require('fs-chunk-store');
const hat = require('hat');
const ImmediateChunkStore = require('immediate-chunk-store');
const os = require('os');
const parseTorrent = require('parse-torrent');
const path = require('path');
const Piece = require('torrent-piece');
const pify = require('pify');
const pAll = require('p-all');
const pIf = require('p-if');
const pEvent = require('p-event');
const pws = require('peer-wire-swarm');
const { ThrottleGroup } = require('stream-throttle');
const exchangeMetadata = require('./exchange-metadata');

const DEFAULT_PORT = 4242;
const MAX_PEERS = 100;

const MAX_REQUESTS = 5;
const CHOKE_TIMEOUT = 5000;
const REQUEST_TIMEOUT = 30000;
const SPEED_THRESHOLD = 3 * Piece.BLOCK_LENGTH;

const BAD_PIECE_STRIKES_MAX = 3;
const BAD_PIECE_STRIKES_DURATION = 120000; // 2 minutes

const RECHOKE_INTERVAL = 1000;
const RECHOKE_OPTIMISTIC_DURATION = 2;

const noop = () => {};
const sha1 = data =>
	crypto
		.createHash('sha1')
		.update(data)
		.digest('hex');
const thruthy = () => true;
const falsy = () => false;
const toNumber = val => {
	if (val === true) return 1;
	return val || 0;
};

class Torrent extends EventEmitter {
	constructor(source, options = {}) {
		super();

		this.peerId = 'HyperTube0HyperTube0';
		this.name = 'HyperTube';
		this.userAgent = 'HyperTube';

		this.port = options.port || DEFAULT_PORT;
		this.userAgent = options.userAgent;
		this.maxPeers = options.maxPeers || MAX_PEERS;
		this.storage = options.storage;
		this.complete = options.complete;
		this.verify = options.verify;
		this.dht = options.dht !== undefined ? options.dht : true;
		this.tracker = options.tracker !== undefined ? options.tracker : true;
		this.trackers = options.trackers;
		this.announce = options.announce || [];
		this.speed = options.speed;

		this.ready = false;
		this.running = false;
		this.verified = false;
		this.destroyed = false;

		this.verifiedPieces = 0;
		this.on('verify', () => {
			this.verifiedPieces += 1;
		});

		this.path = options.path !== undefined ? options.path : undefined;
		this.torrentPath =
			options.torrentPath || path.join(os.tmpdir(), this.name);
		this.cache = options.cache !== undefined ? options.cache : true;

		this.downloadRate = options.downloadRate
			? options.downloadRate
			: Number.MAX_SAFE_INTEGER;
		this.uploadRate = options.uploadRate
			? options.uploadRate
			: Number.MAX_SAFE_INTEGER;
		this.downloadThrottle = new ThrottleGroup({ rate: this.downloadRate });
		this.uploadThrottle = new ThrottleGroup({ rate: this.uploadRate });

		this.files = [];
		this.selection = [];
		this.parse = null;
		this.bitfield = null;
		this.amInterested = false;
		this.store = null;
		this.swarm = null;
		this.discovery = null;

		this.pieces = [];
		this.reservations = [];
		this.critical = [];

		this.rechokeSlots =
			options.uploads === false || options.uploads === 0
				? 0
				: +options.uploads || 10;
		this.rechokeOptimistic = null;
		this.rechokeOptimisticTime = 0;
		this.rechokeIntervalId = null;

		this.blocked = blocklist(options.blocklist);

		if (options.autostart !== false)
			process.nextTick(() => {
				this.start();
			});

		const onMetadata = parse => {
			console.log('got metadata');

			this.parse = parse;
			this.emit('metadata');

			let onUpdate = () => {};
			const onDone = () => {
				this.wires.forEach(wire => {
					if (wire.isSeeder) this.swarm.remove(wire.peerAddress);
				});
			};
			const onInterested = () => {
				this.swarm.resume();
			};
			const onUninterested = () => {
				this.swarm.pause();
			};
			const onInterestChange = () => {
				const prev = this.amInterested;
				this.amInterested = !!this.selection.length;

				this.wires.forEach(wire => {
					if (this.amInterested) wire.interested();
					else wire.uninterested();
				});

				if (prev === this.amInterested) return;
				if (this.amInterested) this.emit('interested');
				else this.emit('uninterested');
			};
			const gc = () => {
				for (let i = 0; i < this.selection.length; i += 1) {
					const s = this.selection[i];
					const oldOffset = s.offset;

					while (
						!this.pieces[s.from + s.offset] &&
						s.from + s.offset < s.to
					)
						s.offset += 1;

					if (oldOffset !== s.offset) s.notify();
					if (
						!(s.to !== s.from + s.offset) &&
						!this.pieces[s.from + s.offset]
					) {
						this.selection.splice(i, 1);
						i -= 1; // -1 to offset splice
						s.notify();
						onInterestChange();
					}
				}

				if (!this.selection.length) this.emit('idle');
				if (this.verifiedPieces === this.pieces.length) {
					this.complete = true;
					this.discovery.complete();
					this.emit('done');
				}
			};
			const onUpdateTick = () => {
				process.nextTick(onUpdate);
			};
			const onPieceComplete = (index, buffer) => {
				if (!this.pieces[index]) return;

				this.store.put(index, buffer, err => {
					if (err) {
						onUpdateTick();
						return;
					}

					this.pieces[index] = null;
					this.reservations[index] = null;
					this.bitfield.set(index, true);

					for (let i = 0; i < this.wires.length; i += 1)
						this.wires[i].have(index);

					this.emit('verify', index);
					this.emit('download', index, buffer);

					gc();
					onUpdateTick();
				});
			};
			const onHotswap =
				this.hotswap === false
					? falsy
					: (wire, index) => {
							const speed = wire.downloadSpeed();
							if (speed < Piece.BLOCK_LENGTH) return false;
							if (
								!this.reservations[index] ||
								!this.pieces[index]
							)
								return false;

							const r = this.reservations[index];
							let minSpeed = Infinity;
							let min;

							for (let i = 0; i < r.length; i += 1) {
								const other = r[i];
								if (other && other !== wire) {
									const otherSpeed = other.downloadSpeed();
									if (
										!(otherSpeed >= SPEED_THRESHOLD) &&
										!(
											2 * otherSpeed > speed ||
											otherSpeed > minSpeed
										)
									) {
										min = other;
										minSpeed = otherSpeed;
									}
								}
							}

							if (!min) return false;

							for (let i = 0; i < r.length; i += 1) {
								if (r[i] === min) r[i] = null;
							}

							for (let i = 0; i < min.requests.length; i += 1) {
								const req = min.requests[i];
								if (req.piece === index) {
									this.pieces[index].cancel(
										parseInt(
											req.offset / Piece.BLOCK_SIZE,
											10
										)
									);
								}
							}

							this.emit('hotswap', min, wire, index);
							return true;
					  };
			const onRequest = (wire, index, hotswap) => {
				if (!this.pieces[index]) return false;

				const p = this.pieces[index];
				let reservation = p.reserve();

				if (reservation === -1 && hotswap && onHotswap(wire, index))
					reservation = p.reserve();
				if (reservation === -1) return false;

				const r = this.reservations[index] || [];
				const offset = p.chunkOffset(reservation);
				const size = p.chunkLength(reservation);

				let i = r.indexOf(null);
				if (i === -1) i = r.length;
				r[i] = wire;

				wire.request(index, offset, size, (err, block) => {
					if (r[i] === wire) r[i] = null;

					if (p !== this.pieces[index]) {
						onUpdateTick();
						return;
					}

					if (err) {
						p.cancel(reservation);
						onUpdateTick();
						return;
					}
					if (!p.set(reservation, block, wire)) {
						onUpdateTick();
						return;
					}

					const { sources } = p;
					const buffer = p.flush();

					if (sha1(buffer) !== parse.pieces[index]) {
						this.pieces[index] = new Piece(p.length);
						this.emit('invalid-piece', index, buffer);
						onUpdateTick();

						sources.forEach(wireSource => {
							const now = Date.now();

							const badPieceStrikes = wireSource.badPieceStrikes.filter(
								strike =>
									now - strike < BAD_PIECE_STRIKES_DURATION
							);
							Object.assign(wireSource, { badPieceStrikes });
							wireSource.badPieceStrikes.push(now);

							if (
								wireSource.badPieceStrikes.length >
								BAD_PIECE_STRIKES_MAX
							) {
								this.block(wireSource.peerAddress);
							}
						});

						return;
					}

					onPieceComplete(index, buffer);
				});

				return true;
			};
			const onValidateWire = wire => {
				if (wire.requests.length) return;

				for (let i = this.selection.length - 1; i >= 0; i -= 1) {
					const next = this.selection[i];
					for (
						let j = next.to;
						j >= next.from + next.offset;
						j -= 1
					) {
						if (wire.peerPieces[j]) {
							if (onRequest(wire, j, false)) return;
						}
					}
				}
			};
			const speedRanker = wire => {
				const speed = wire.downloadSpeed() || 1;
				if (speed > SPEED_THRESHOLD) return thruthy;

				const secs = (MAX_REQUESTS * Piece.BLOCK_LENGTH) / speed;
				let tries = 10;
				let ptr = 0;

				return index => {
					if (!tries || !this.pieces[index]) return true;

					let { missing } = this.pieces[index];
					for (; ptr < this.wires.length; ptr += 1) {
						const other = this.wires[ptr];
						const otherSpeed = other.downloadSpeed();

						missing -= otherSpeed * secs;

						if (
							!(otherSpeed < SPEED_THRESHOLD) &&
							!(
								otherSpeed <= speed || !other.peerPieces[index]
							) &&
							!(missing > 0)
						) {
							tries -= 1;
							return false;
						}
					}

					return true;
				};
			};
			const shufflePriority = i => {
				let last = i;
				for (
					let j = i;
					j < this.selection.length && this.selection[j].priority;
					j += 1
				) {
					last = j;
				}
				const tmp = this.selection[i];
				this.selection[i] = this.selection[last];
				this.selection[last] = tmp;
			};
			const selectWire = (wire, hotswap) => {
				if (wire.requests.length >= MAX_REQUESTS) return true;

				const rank = speedRanker(wire);

				for (let i = 0; i < this.selection.length; i += 1) {
					const next = this.selection[i];
					for (
						let j = next.from + next.offset;
						j <= next.to;
						j += 1
					) {
						if (!(!wire.peerPieces[j] || !rank(j))) {
							while (
								wire.requests.length < MAX_REQUESTS &&
								onRequest(wire, j, this.critical[j] || hotswap)
							) {
								noop();
							}
							if (!(wire.requests.length < MAX_REQUESTS)) {
								if (next.priority) shufflePriority(i);
								return true;
							}
						}
					}
				}

				return false;
			};
			const onUpdateWire = wire => {
				if (this.complete && wire.isSeeder) {
					this.swarm.remove(wire.peerAddress);
					return;
				}
				if (wire.peerChoking || !this.amInterested) return;
				if (!wire.downloaded) {
					onValidateWire(wire);
					return;
				}
				if (!selectWire(wire, false)) selectWire(wire, true);
			};
			onUpdate = () => {
				this.wires.forEach(onUpdateWire);
			};
			const onWire = wire => {
				wire.setTimeout(this.timeout || REQUEST_TIMEOUT, () => {
					this.emit('timeout', wire);
					wire.destroy();
				});

				if (this.selection.length) wire.interested();

				const timeout = CHOKE_TIMEOUT;
				let id;
				const onChokeTimeout = () => {
					if (
						this.swarm.queued >
							2 * (this.swarm.size - this.swarm.wires.length) &&
						wire.amInterested
					) {
						wire.destroy();
						return;
					}
					id = setTimeout(onChokeTimeout, timeout);
				};

				wire.on('close', () => {
					clearTimeout(id);
				});
				wire.on('choke', () => {
					clearTimeout(id);
					id = setTimeout(onChokeTimeout, timeout);
				});
				wire.on('unchoke', () => {
					clearTimeout(id);
				});

				wire.on('request', (index, offset, length, cb) => {
					if (this.pieces[index]) return;
					this.store.get(index, { offset, length }, (err, buffer) => {
						if (err) {
							cb(err);
							return;
						}
						this.emit('upload', index, offset, length);
						cb(null, buffer);
					});
				});

				wire.on('unchoke', onUpdate);
				wire.on('bitfield', onUpdate);
				wire.on('have', onUpdate);

				Object.assign(wire, { isSeeder: false });

				let i = 0;
				const checkSeeder = () => {
					if (wire.peerPieces.length < parse.pieces.length) return;
					for (; i < parse.pieces.length; i += 1) {
						if (!wire.peerPieces[i]) return;
					}
					Object.assign(wire, { isSeeder: true });
					if (this.complete) this.swarm.remove(wire.peerAddress);
				};

				wire.on('bitfield', checkSeeder);
				wire.on('have', checkSeeder);
				checkSeeder();

				Object.assign(wire, { badPieceStrikes: [] });

				wire.bitfield(this.bitfield);

				id = setTimeout(onChokeTimeout, timeout);
			};
			const rechokeSort = (a, b) => {
				// Prefer higher download speed
				if (a.downSpeed !== b.downSpeed)
					return a.downSpeed > b.downSpeed ? -1 : 1;
				// Prefer higher upload speed
				if (a.upSpeed !== b.upSpeed)
					return a.upSpeed > b.upSpeed ? -1 : 1;
				// Prefer unchoked
				if (a.wasChoked !== b.wasChoked) return a.wasChoked ? 1 : -1;
				// Random order
				return a.salt - b.salt;
			};
			const onRechoke = () => {
				if (this.rechokeOptimisticTime > 0)
					this.rechokeOptimisticTime -= 1;
				else this.rechokeOptimistic = null;

				const peers = [];

				this.wires.forEach(wire => {
					if (wire.isSeeder) {
						if (!wire.amChoking) wire.choke();
					} else if (wire !== this.rechokeOptimistic) {
						peers.push({
							wire,
							downSpeed: wire.downloadSpeed(),
							upSpeed: wire.uploadSpeed(),
							salt: Math.random(),
							interested: wire.peerInterested,
							wasChoked: wire.amChoking,
							isChoked: true
						});
					}
				});

				peers.sort(rechokeSort);

				let i = 0;
				let unchokeInterested = 0;
				for (
					;
					i < peers.length && unchokeInterested < this.rechokeSlots;
					i += 1
				) {
					peers[i].isChoked = false;
					if (peers[i].interested) unchokeInterested += 1;
				}

				if (
					!this.rechokeOptimistic &&
					i < peers.length &&
					this.rechokeSlots
				) {
					const candidates = peers
						.slice(i)
						.filter(peer => peer.interested);
					const optimistic =
						candidates[
							parseInt(Math.random() * candidates.length, 10)
						];

					if (optimistic) {
						optimistic.isChoked = false;
						this.rechokeOptimistic = optimistic.wire;
						this.rechokeOptimisticTime = RECHOKE_OPTIMISTIC_DURATION;
					}
				}

				peers.forEach(peer => {
					if (peer.wasChoked !== peer.isChoked) {
						if (peer.isChoked) peer.wire.choke();
						else peer.wire.unchoke();
					}
				});
			};

			const refresh = () => {
				process.nextTick(gc);
				onInterestChange();
				onUpdate();
			};
			const onRunning = () => {
				if (this.destroyed || !this.running) return;

				this.on('uninterested', onUninterested);
				this.on('interested', onInterested);

				this.on('done', onDone);

				this.swarm.on('wire', onWire);
				this.swarm.wires.forEach(onWire);

				this.rechokeIntervalId = setInterval(
					onRechoke,
					RECHOKE_INTERVAL
				);

				process.nextTick(refresh);
			};
			const onReady = () => {
				if (this.destroyed) return;
				this.ready = true;
				console.log('ready');
				this.emit('ready');
				if (this.running) {
					onRunning();
				} else {
					this.once('start', onRunning);
				}
			};

			const selectFile = (from, to, priority, notify) => {
				this.selection.push({
					from,
					to,
					offset: 0,
					priority: toNumber(priority),
					notify: notify || noop
				});

				this.selection.sort((a, b) => b.priority - a.priority);

				refresh();
			};
			const deselectFile = (from, to, priority, notify) => {
				for (let i = 0; i < this.selection.length; i += 1) {
					const s = this.selection[i];
					if (
						!(s.from !== from || s.to !== to) &&
						!(s.priority !== toNumber(priority)) &&
						!(s.notify !== (notify || noop))
					) {
						this.selection.splice(i, 1);
						i -= 1;
						break;
					}
				}

				refresh();
			};

			const storage = this.storage || FSChunkStore;
			this.store = new ImmediateChunkStore(
				storage(parse.pieceLength, {
					files: parse.files.map(file => ({
						path: this.path
							? path.join(this.path, file.path)
							: path.join(
									this.torrentPath,
									parse.infoHash,
									file.path
							  ),
						length: file.length,
						offset: file.offset
					}))
				})
			);
			if (!this.bitfield)
				this.bitfield = new Bitfield(parse.pieces.length);

			const { pieceLength, lastPieceLength } = parse;
			this.pieces = parse.pieces.map(
				(hash, i) =>
					new Piece(
						i !== parse.pieces.length - 1
							? pieceLength
							: lastPieceLength
					)
			);
			this.reservations = parse.pieces.map(() => []);

			this.files = parse.files.map(fileMetadata => {
				const file = Object.create(fileMetadata);
				const offsetPiece = parseInt(file.offset / pieceLength, 10);
				const endPiece = parseInt(
					(file.offset + file.length - 1) / pieceLength,
					10
				);

				file.select = () => {
					selectFile(offsetPiece, endPiece, false);
				};
				file.deselect = () => {
					deselectFile(offsetPiece, endPiece, false);
				};

				file.select();

				return file;
			});

			const validPiece = index => {
				this.pieces[index] = null;
				this.bitfield.set(index, true);
				// console.log('piece %s valid', index);
				this.emit('verify', index);
			};
			const verify = () => {
				if (this.complete && !this.verified) {
					this.pieces.forEach((piece, index) => {
						if (this.destroyed) return;
						validPiece(index);
					});
					this.verified = true;
					onReady();
				} else if (this.verified || this.verify === false) {
					onReady();
				} else {
					this.emit('verifiyng');
					console.log('verifying');

					pAll(
						this.pieces.map((piece, index) => () => {
							if (this.destroyed)
								return new Error('torrent is destroyed');
							const invalidPiece = i => {
								// console.log('piece %d invalid', i);
							};
							return pify(this.store.get.bind(this.store))(index)
								.then(buf => {
									if (
										sha1(buf) !== parse.pieces[index] ||
										!this.pieces[index]
									) {
										invalidPiece(index);
									} else {
										validPiece(index);
									}
								})
								.catch(() => invalidPiece(index));
						}),
						{ concurrency: 1 }
					)
						.then(() => {
							this.verified = true;
							onReady();
						})
						.catch(noop);
				}
			};

			if (this.running || this.verify) verify();
			else
				pEvent(this, ['start', 'check']).then(() => {
					verify();
				});
		};
		const getMetdata = () => {
			console.log('get metdata');
			const parse = this.parse || parseTorrent(source);

			this.swarm = pws(parse.infoHash, this.peerId, {
				size: this.maxPeers,
				speed: this.speed
			});
			this.swarm.listen(this.port);

			if (parse.files === undefined && parse.infoBuffer === undefined) {
				const cacheFile = path
					.join(this.torrentPath, parse.infoHash)
					.concat('.torrent');
				if (fs.pathExistsSync(cacheFile)) {
					onMetadata({
						...parseTorrent(fs.readFileSync(cacheFile)),
						announce:
							this.trackers ||
							this.announce.concat(parse.announce)
					});
				}
			} else {
				onMetadata(parse);
			}

			const startDiscovery = () => {
				console.log('start discovery');
				console.log(parse.infoHash);
				console.log(this.peerId);
				this.discovery = new Discovery({
					infoHash: parse.infoHash,
					peerId: bufferFrom(this.peerId),
					dht: parse.private ? false : this.dht,
					tracker: this.tracker,
					port: this.port,
					announce:
						this.trackers || this.announce.concat(parse.announce)
				});
				this.discovery.on('peer', addr => {
					if (this.blocked.contains(addr.split(':')[0])) {
						this.emit('blocked-peer', addr);
					} else if (!this.complete) {
						this.emit('peer', addr);
						this.connect(addr);
					}
				});

				let exchange = exchangeMetadata(
					parse.infoHash,
					parse.infoBuffer,
					metadata => {
						if (!this.metadata) {
							// Doesn't include announce
							const torrentFile = path
								.join(this.torrentPath, parse.infoHash)
								.concat('.torrent');
							if (this.cache && !fs.pathExistsSync(torrentFile)) {
								fs.ensureDir(this.torrentPath)
									.then(() =>
										fs.writeFile(torrentFile, metadata)
									)
									.then(() => {
										console.log('metadata saved');
									});
							}

							const parsedMetadata = parseTorrent(metadata);
							exchange = exchangeMetadata(
								parse.infoHash,
								parsedMetadata.infoBuffer,
								noop
							);
							onMetadata(parsedMetadata);
						}
					}
				);

				this.swarm.on('wire', (wire, connection) => {
					Object.assign(wire, {
						get origin() {
							return `${connection.remoteAddress}:${connection.remotePort}`;
						}
					});
					const downloadLimit = connection.pipe(
						this.downloadThrottle.throttle()
					);
					downloadLimit.on('data', noop);

					const uploadThrottle = this.uploadThrottle.throttle();
					uploadThrottle.on('data', noop);
					wire.pipe(uploadThrottle);

					this.emit('wire', wire, connection);
					exchange(wire);
				});
			};
			if (this.running) startDiscovery();
			else this.once('start', startDiscovery);
		};

		getMetdata();

		this.on('start', () => {
			if (this.destroyed) {
				this.destroyed = false;
				getMetdata();
			}
		});
	}

	get infoHash() {
		return this.parse && this.parse.infoHash;
	}

	get id() {
		return this.infoHash;
	}

	get shortId() {
		return this.id ? this.id.toString('hex').substring(0, 7) : undefined;
	}

	get debugId() {
		return this.shortId;
	}

	get metadata() {
		return this.parse ? this.parse.infoBuffer : undefined;
	}

	get wires() {
		return this.swarm ? this.swarm.wires : [];
	}

	get peers() {
		return this.wires;
	}

	get numPeers() {
		return this.peers.length;
	}

	get downloaded() {
		if (!this.bitfield) return 0;

		return this.pieces.reduce((downloaded, piece, index) => {
			if (this.bitfield.get(index)) {
				const { pieceLength, lastPieceLength } = this.parse;
				return (
					downloaded +
					(index !== this.pieces.length - 1
						? pieceLength
						: lastPieceLength)
				);
			}
			const { length, missing } = this.pieces[index];
			return downloaded + length - missing;
		}, 0);
	}

	get downloadSpeed() {
		return this.swarm ? this.swarm.downloadSpeed() : 0;
	}

	get received() {
		return this.swarm ? this.swarm.downloaded : 0;
	}

	get uploaded() {
		return this.swarm ? this.swarm.uploaded : 0;
	}

	get uploadSpeed() {
		return this.swarm ? this.swarm.uploadSpeed() : 0;
	}

	get progress() {
		return this.parse ? this.downloaded / this.parse.length : 0;
		// return this.parse ? this.verifiedPieces / this.parse.pieces.length : 0;
	}

	get timeRemaining() {
		if (this.selection.length === 0) return 0;
		if (!this.parse || this.downloadSpeed === 0) return Infinity;
		return parseInt(
			((this.parse.length - this.downloaded) / this.downloadSpeed) * 1000,
			10
		);
	}

	get ratio() {
		return this.uploaded / (this.received || 1);
	}

	check() {
		console.log('check');
		return new Promise(resolve => {
			this.complete = false;
			this.verify = true;
			this.emit('check');
			if (this.verified) resolve();
			else this.once('ready', resolve);
		});
	}

	start() {
		console.log('start');

		return new Promise(resolve => {
			this.running = true;
			this.emit('start');
			if (this.ready) resolve();
			else this.once('ready', resolve);
		});
	}

	stop() {
		console.log('stop');
		this.running = false;
		return this.destroy().then(() => {
			this.emit('stop');
		});
	}

	destroy() {
		console.log('destroy');

		return pIf(
			this.destroyed === false,
			() =>
				pAll([
					() => {
						this.destroyed = true;
					},
					() =>
						new Promise(resolve => {
							if (this.discovery)
								this.discovery.destroy(() => {
									console.log('discovery closed');
									resolve();
								});
							else resolve();
						}),
					() =>
						new Promise(resolve => {
							if (this.swarm) {
								clearInterval(this.rechokeIntervalId);
								this.swarm.pause();
								this.swarm.destroy();
								this.swarm.on('close', () => {
									console.log('swarm closed');
									resolve();
								});
								this.wires.forEach(wire => {
									wire.destroy();
								});
								this.swarm.connections.forEach(connection => {
									connection.destroy();
								});
							} else resolve();
						}),
					() =>
						new Promise(resolve => {
							if (this.store)
								this.store.close(() => {
									console.log('store closed');
									resolve();
								});
							else resolve();
						})
				]).then(() => {
					this.emit('close');
				}),
			() => Promise.resolve()
		)();
	}

	connect(addr) {
		this.swarm.add(addr);
	}

	disconnect(addr) {
		this.swarm.remove(addr);
	}

	block(addr) {
		console.log('block');
		this.blocked.add(addr.split(':')[0]);
		this.disconnect(addr);
		this.emit('blocking', addr);
	}

	setDownloadRate(rate) {
		this.downloadRate = rate;
		this.downloadThrottle.bucket.bucketSize = rate;
		this.downloadThrottle.bucket.tokensPerInterval = rate;
	}

	setUploadRate(rate) {
		this.uploadRate = rate;
		this.uploadThrottle.bucket.bucketSize = rate;
		this.uploadThrottle.bucket.tokensPerInterval = rate;
	}
}

module.exports = Torrent;
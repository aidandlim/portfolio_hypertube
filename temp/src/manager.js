const { EventEmitter } = require('events');
const fs = require('fs-extra');
const get = require('simple-get');
const hat = require('hat');
const Torrent = require('./torrent');
const path = require('path');
const pify = require('pify');
const pAll = require('p-all');
const pIf = require('p-if');
const { ThrottleGroup } = require('stream-throttle');

const DEFAULT_PORT = 4242;
const DEFAULT_PATH = path.join(__dirname, '..', 'public', 'video');
const MAX_PEERS = 200;

const noop = () => {};

class Manager extends EventEmitter {
	constructor(options = {}) {
		super();

		this.peerId = 'HyperTube0HyperTube0';
		this.userAgent = 'HyperTube';
		this.path = options.path;
		this.port = options.port || DEFAULT_PORT;
		this.dht = options.dht !== undefined ? options.dht : true;

		this.torrentPath = options.torrentPath || DEFAULT_PATH;
		this.maxPeers = options.maxPeers || MAX_PEERS;

		this.downloadRate = options.downloadRate
			? options.downloadRate
			: Number.MAX_SAFE_INTEGER;
		this.uploadRate = options.uploadRate
			? options.uploadRate
			: Number.MAX_SAFE_INTEGER;
		this.downloadThrottle = new ThrottleGroup({ rate: this.downloadRate });
		this.uploadThrottle = new ThrottleGroup({ rate: this.uploadRate });

		this.torrents = [];
	}

	get(infoHash) {
		return this.torrents.find(torrent => torrent.id === infoHash);
	}

	get numPeers() {
		return this.torrents.reduce(
			(acc, torrent) => acc + torrent.peers.length,
			0
		);
	}

	add(source, options) {
		console.log('add');

		return fs
			.pathExists(source)
			.then(
				pIf(
					exsist => exsist,
					() => fs.readFile(source),
					() =>
						pify(get.concat, { multiArgs: true })(source).then(
							([, data]) => data
						)
				)
			)
			.catch(() => source)
			.then(torrentId => {
				const torrent = new Torrent(torrentId, {
					peerId: this.peerId,
					path: this.path,
					port: this.port,
					dht: this.dht,
					torrentPath: this.torrentPath,
					userAgent: this.userAgent,
					...options
				});

				torrent.on('wire', (wire, connection) => {
					const downloadLimit = connection.pipe(
						this.downloadThrottle.throttle()
					);
					downloadLimit.on('data', noop);

					const uploadThrottle = this.uploadThrottle.throttle();
					uploadThrottle.on('data', noop);
					wire.pipe(uploadThrottle);
				});

				this.torrents.push(torrent);

				return torrent;
			})
			.catch(err => {
				this.emit('error', err);
			});
	}

	remove(infoHash) {
		console.log(`remove ${infoHash}`);
		const torrent = this.get(infoHash);

		if (torrent !== null) {
			return torrent.destroy().then(() => {
				this.torrents = this.torrents.filter(
					t => t.infoHash !== infoHash
				);
			});
		}

		return Promise.resolve();
	}

	start(infoHash) {
		console.log('start');

		const foundTorrent = this.get(infoHash);
		return foundTorrent.start();
	}

	stop(infoHash) {
		console.log('stop');

		const foundTorrent = this.get(infoHash);
		return foundTorrent.stop();
	}

	check(infoHash) {
		console.log('check');

		const foundTorrent = this.get(infoHash);
		return foundTorrent.check();
	}

	startAll() {
		console.log('start all');
		return pAll(this.torrents.map(torrent => () => torrent.start()));
	}

	stopAll() {
		console.log('stop all');
		return pAll(this.torrents.map(torrent => () => torrent.stop()));
	}

	checkAll() {
		console.log('verify all');
		this.torrents.forEach(torrent => {
			torrent.check();
		});
	}

	destroy() {
		console.log('destroy');
		return pAll(this.torrents.map(torrent => () => torrent.destroy()));
	}

	progress() {
		return (
			this.torrents.reduce((acc, torrent) => acc + torrent.progress, 0) /
			this.torrents.length
		);
	}

	ratio() {
		return (
			this.torrents.reduce((acc, torrent) => acc + torrent.ratio, 0) /
			this.torrents.length
		);
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

module.exports = Manager;

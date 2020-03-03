const BitField = require('bitfield');
const get = require('simple-get');
const sha1 = require('simple-sha1');
const Wire = require('bittorrent-protocol');

class WebConn extends Wire {
    constructor(url, torrent) {
        super();

        this.url = url;
        this.webPeerId = sha1.sync(url);
        this._torrent = torrent;

        this._init();
    }

    _init() {
        this.setKeepAlive(true);

        this.once('handshake', infoHash => {
            if (this.destroyed) return;
            this.handshake(infoHash, this.webPeerId);
            const numPieces = this._torrent.pieces.length;
            const bitfield = new BitField(numPieces);
            for (let i = 0; i <= numPieces; i++) {
                bitfield.set(i, true);
            }
            this.bitfield(bitfield);
        });

        this.once('interested', () => {
            this.unchoke();
        });

        this.on('request', (pieceIndex, offset, length, callback) => {
            this.httpRequest(pieceIndex, offset, length, callback);
        });
    }

    httpRequest(pieceIndex, offset, length, cb) {
        const pieceOffset = pieceIndex * this._torrent.pieceLength;
        const rangeStart = pieceOffset + offset;
        const rangeEnd = rangeStart + length - 1;

        const files = this._torrent.files;
        let requests;
        if (files.length <= 1) {
            requests = [
                {
                    url: this.url,
                    start: rangeStart,
                    end: rangeEnd
                }
            ];
        } else {
            const requestedFiles = files.filter(file => {
                return file.offset <= rangeEnd && file.offset + file.length > rangeStart;
            });
            if (requestedFiles.length < 1) {
                return cb(
                    new Error('Could not find file corresponnding to web seed range request')
                );
            }

            requests = requestedFiles.map(requestedFile => {
                const fileEnd = requestedFile.offset + requestedFile.length - 1;
                const url =
                    this.url +
                    (this.url[this.url.length - 1] === '/' ? '' : '/') +
                    requestedFile.path;
                return {
                    url,
                    fileOffsetInRange: Math.max(requestedFile.offset - rangeStart, 0),
                    start: Math.max(rangeStart - requestedFile.offset, 0),
                    end: Math.min(fileEnd, rangeEnd - requestedFile.offset)
                };
            });
        }

        let numRequestsSucceeded = 0;
        let hasError = false;

        let ret;
        if (requests.length > 1) {
            ret = Buffer.alloc(length);
        }

        requests.forEach(request => {
            const url = request.url;
            const start = request.start;
            const end = request.end;
            const opts = {
                url,
                method: 'GET',
                headers: {
                    'user-agent': `HyperTube`,
                    range: `bytes=${start}-${end}`
                }
            };
            function onResponse(res, data) {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    hasError = true;
                    return cb(new Error(`Unexpected HTTP status code ${res.statusCode}`));
                }

                if (requests.length === 1) {
                    cb(null, data);
                } else {
                    data.copy(ret, request.fileOffsetInRange);
                    if (++numRequestsSucceeded === requests.length) {
                        cb(null, ret);
                    }
                }
            }
            get.concat(opts, (err, res, data) => {
                if (hasError) return;
                if (err) {
                    if (
                        typeof window === 'undefined' ||
                        url.startsWith(`${window.location.origin}/`)
                    ) {
                        hasError = true;
                        return cb(err);
                    }

                    return get.head(url, (errHead, res) => {
                        if (hasError) return;
                        if (errHead) {
                            hasError = true;
                            return cb(errHead);
                        }
                        if (res.statusCode < 200 || res.statusCode >= 300) {
                            hasError = true;
                            return cb(new Error(`Unexpected HTTP status code ${res.statusCode}`));
                        }
                        if (res.url === url) {
                            hasError = true;
                            return cb(err);
                        }

                        opts.url = res.url;
                        get.concat(opts, (err, res, data) => {
                            if (hasError) return;
                            if (err) {
                                hasError = true;
                                return cb(err);
                            }
                            onResponse(res, data);
                        });
                    });
                }
                onResponse(res, data);
            });
        });
    }

    destroy() {
        super.destroy();
        this._torrent = null;
    }
}

module.exports = WebConn;

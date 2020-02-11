const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const RarbgApi = require('rarbg');

const app = express();
const TORRENT_PORT = 8443;
const API_PORT = 9443;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(
    '/api',
    proxy({
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true
    })
);

app.use(express.static('public'));

app.get('/torrent/search/:id', async (req, res) => {
    const id = req.params.id;

    const rarbg = new RarbgApi({
        host: 'torrentapi.org',
        path: '/pubapi_v2.php?',
        app_id: 'hypertube',
        user_agent: 'Hypertube 0.0.1'
    });

    await rarbg
        .search({
            search_themoviedb: id,
            sort: 'seeders',
            category: [
                rarbg.categories.MOVIES_X264_1080,
                rarbg.categories.MOVIES_X264_720
            ],
            min_seeders: 0,
            format: 'json_extended'
        })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json(error);
        });
});

const WebTorrent = require('webtorrent');

const client = new WebTorrent();

client.on('error', err => {
    console.log(err.message);
});

client.on('download', () => {
    stats = {
        progress: Math.round(client.progress * 100 * 100) / 100,
        downloadSpeed: client.downloadSpeed,
        ratio: client.ratio
    };
    console.log(stats);
});

app.get('/torrent/add/:magnet', (req, res) => {
    const magnet = req.params.magnet;

    client.add(magnet, function(torrent) {
        let max = {
            name: '',
            length: 0
        };

        torrent.files.forEach(function(data) {
            if (max.length < data.length)
                max = {
                    name: data.name,
                    length: data.length
                };
        });

        res.json(max);
    });
});

app.get('/torrent/stream/:magnet/:filename', (req, res, next) => {
    const magnet = req.params.magnet;
    const filename = req.params.filename;

    var tor = client.get(magnet);

    let file = {};

    for (i = 0; i < tor.files.length; i++) {
        if (tor.files[i].name == filename) {
            file = tor.files[i];
        }
    }

    let range = req.headers.range;

    if (!range) {
        let err = new Error('Wrong range');
        err.status = 416;
        return next(err);
    }

    let positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    let file_size = file.length;

    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;

    let chunksize = end - start + 1;

    let head = {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + file_size,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
    };

    res.writeHead(206, head);

    let stream_position = {
        start: start,
        end: end
    };

    let stream = file.createReadStream(stream_position);

    stream.pipe(res);

    stream.on('error', err => {
        return next(err);
    });
});

app.get('/torrent/delete/:magnet', (req, res, next) => {
    let magnet = req.params.magnet;

    client.remove(magnet, () => {
        res.status(200);
        res.end();
    });
});

app.listen(TORRENT_PORT, () => {
    console.log(`Torrent server is running on port ${TORRENT_PORT}`);
});

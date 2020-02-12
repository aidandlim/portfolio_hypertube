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

// client.on('download', () => {
//     stats = {
//         progress: Math.round(client.progress * 100 * 100) / 100,
//         downloadSpeed: client.downloadSpeed,
//         ratio: client.ratio
//     };
//     console.log(stats);
// });

app.get('/torrent/add/:magnet', (req, res) => {
    const magnet = req.params.magnet;

    const exist = client.get(magnet);

    if(exist) {
        console.log(`There is magnet(${magnet}) already`);
        client.remove(magnet, () => {
            console.log(`magnet(${magnet}) has removed`);
        });
    }

    client.add(magnet, torrent => {
        console.log(`magnet(${magnet}) has added`);
        let max = {
            name: '',
            length: 0
        };

        torrent.files.forEach(data => {
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

    console.log(filename);

    const tor = client.get(magnet);

    let file = {};

    for (i = 0; i < tor.files.length; i++) {
        if (tor.files[i].name == filename) {
            file = tor.files[i];
        }
    }

    const range = req.headers.range;

    if (!range) {
        let err = new Error('Wrong range');
        err.status = 416;
        return next(err);
    }

    const file_size = file.length;
    const positions = range.replace(/bytes=/, '').split('-');
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;

    const chunksize = end - start + 1;

    res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + file_size,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
    });

    let stream = file.createReadStream({
        start,
        end
    });

    stream.pipe(res);

    stream.on('error', err => {
        return next(err);
    });
});

app.get('/torrent/delete/:magnet', (req, res, next) => {
    let magnet = req.params.magnet;

    client.remove(magnet, () => {
        console.log(`magnet(${magnet}) has removed`);
    });
});

app.listen(TORRENT_PORT, () => {
    console.log(`Torrent server is running on port ${TORRENT_PORT}`);
});

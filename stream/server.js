const express = require('express');
const cors = require('cors');

const app = express();

const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('cert/key.pem', 'utf8');
const certificate = fs.readFileSync('cert/hypertube.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

const TorrentService = require('./src');

// const API_IP = 'localhost';
// const TORRENT_PORT = 8444;
const STREAM_PORT = 8445;
// const API_PORT = 8446;
// const SOCKET_PORT = 8447;

app.use(cors());

app.get('/stream', (req, res) => {
    res.json('Stream server is running');
});

const client = new TorrentService();

client.on('error', err => {
    console.log(err.message);
});

app.get('/stream/add/:magnet', (req, res) => {

    const magnet = req.params.magnet;

    const tor = client.get(magnet);

    if (tor != null) {
        let max = {
            name: '',
            length: 0
        };
        for (i = 0; i < tor.files.length; i++) {
            if (max.length < tor.files[i].length)
                max = {
                    name: tor.files[i].name,
                    length: tor.files[i].length
                };
        } res.json(max);
    }

    client.add(magnet, torrent => {
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

app.get('/stream/play/:magnet/:filename', (req, res, next) => {
    const magnet = req.params.magnet;
    const filename = req.params.filename;

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

    if (filename.split('.')[filename.split('.').length - 1] === 'mkv') {
        
    } else {
        stream.pipe(res);
    }

    stream.on('error', err => {
        return next(err);
    });
});

server.listen(STREAM_PORT, () => {
    console.log(`Stream server is running on port ${STREAM_PORT}`);
});

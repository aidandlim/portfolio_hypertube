const express = require('express');
const cors = require('cors');

const RarbgApi = require('rarbg');

const app = express();

const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('cert/key.pem', 'utf8');
const certificate = fs.readFileSync('cert/hypertube.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

// const API_IP = 'localhost';
const TORRENT_PORT = 8444;
// const STREAM_PORT = 8445;
// const API_PORT = 8446;
// const SOCKET_PORT = 8447;

app.use(cors());

app.get('/torrent', (req, res) => {
    res.json('Torrent server is running');
});

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
            category: [rarbg.categories.MOVIES_X264_1080, rarbg.categories.MOVIES_X264_720],
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

server.listen(TORRENT_PORT, () => {
    console.log(`Torrent server is running on port ${TORRENT_PORT}`);
});

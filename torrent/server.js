const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const RarbgApi = require('rarbg');

const app = express();
const TORRENT_PORT = 8443;
const STREAM_PORT = 8444;
// const SOCKET_PORT = 8445;
const API_IP = '10.10.146.166';
const API_PORT = 8446;

app.use(cors());

app.use(
    '/api',
    proxy({
        target: `http://${API_IP}:${API_PORT}`,
        changeOrigin: true
    })
);

app.use(
    '/stream',
    proxy({
        target: `http://localhost:${STREAM_PORT}`,
        changeOrigin: true
    })
);

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

app.listen(TORRENT_PORT, () => {
    console.log(`Torrent server is running on port ${TORRENT_PORT}`);
});

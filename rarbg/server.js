const express = require('express');
const cors = require('cors');

const RarbgApi = require('rarbg');

const app = express();
const PORT = 9443;

app.use(cors());

app.get('/search/:id', async (req, res) => {
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

app.listen(PORT, function() {
    console.log(`Rarbg server is running on port ${PORT}`);
});

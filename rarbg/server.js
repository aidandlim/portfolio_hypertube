const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const RarbgApi = require('rarbg');

const app = express();
const PORT = 9443;

app.use(cors());

app.use(
    '/api',
    proxy({
        target: 'http://10.10.146.166:8080/',
        changeOrigin: true
    })
);

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

let fs = require('fs');
let path = require('path');
let WebTorrent = require('webtorrent');

//
//	1.	When the server starts create a WebTorrent client
//
let client = new WebTorrent();

//
//	2.	The object that holds the client stats to be displayed in the front end
//	using an API call every n amount of time using jQuery.
//
let stats = {
    progress: 0,
    downloadSpeed: 0,
    ratio: 0
};

//
//	3.	The variable that holds the error message from the client. Farly crude but
//		I don't expect to much happening hear aside the potential to add the same
//		Magnet Hash twice.
//
let error_message = '';

//
//	4.	Listen for any potential client error and update the above variable so
//		the front end can display it in the browser.
//
client.on('error', function(err) {
    error_message = err.message;
});

//
//	5.	Emitted by the client whenever data is downloaded. Useful for reporting the
//		current torrent status of the client.
//
client.on('download', function(bytes) {
    //
    //	1.	Update the object with fresh data
    //
    stats = {
        progress: Math.round(client.progress * 100 * 100) / 100,
        downloadSpeed: client.downloadSpeed,
        ratio: client.ratio
    };
});

//
//	API call that adds a new Magnet Hash to the client so it can start
//	downloading it.
//
//	magnet 		-> 	Magnet Hash
//
//	return 		<-	An array with a list of files
//
app.get('/add', function(req, res) {
    console.log('add ::: ' + new Date());
    //
    //	1.	Extract the magnet Hash and save it in a meaningful variable.
    //
    let magnet = 'magnet:?xt=urn:btih:301b87b481e1ba5816f2183dd7682bf526580630&dn=Ad.Astra.2019.1080p.WEBRip.x264-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce';

    //
    //	2.	Add the magnet Hash to the client
    //
    client.add(magnet, function(torrent) {
        //
        //	1.	The array that will hold the content of the Magnet Hash.
        //
        let files = [];

        //
        //	2.	Loop over all the file that are inside the Magnet Hash and add
        //	them to the above variable.
        //
        torrent.files.forEach(function(data) {
            files.push({
                name: data.name,
                length: data.length
            });
        });

        //
        //	->	Once we have all the data send it back to the browser to be
        //		displayed.
        //
        res.status(200);
        res.json(files);
    });
});

//
//	The API call to start streaming the selected file to the video tag.
//
//	magnet 		-> 	Magnet Hash
//	file_name 	-> 	the selected file name that is within the Magnet Hash
//
//	return 		<-	A chunk of the video file as buffer (binary data)
//
app.get('/stream/:file_name/:start/:end', function(req, res, next) {
    console.log('stream ::: start : ' + req.params.start + ' + end : ' + req.params.end + ' /// ' + new Date());
    //
    //	1.	Extract the magnet Hash and save it in a meaningful variable.
    //
    let magnet = 'magnet:?xt=urn:btih:301b87b481e1ba5816f2183dd7682bf526580630&dn=Ad.Astra.2019.1080p.WEBRip.x264-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce';

    //
    //	2.	Returns the torrent with the given torrentId. Convenience method.
    //		Easier than searching through the client.torrents array. Returns
    //		null if no matching torrent found.
    //
    var tor = client.get(magnet);

    //
    //	3.	Variable that will store the user selected file
    //
    let file = {};

    //
    //	4.	Loop over all the files contained inside a Magnet Hash and find the one
    //		the user selected.
    //
    for (i = 0; i < tor.files.length; i++) {
        if (tor.files[i].name == req.params.file_name) {
            file = tor.files[i];
        }
    }

    //
    //	14.	Create the createReadStream option object so createReadStream
    //		knows how much data it should be read from the file.
    //
    let stream_position = {
        start: req.params.start,
        end: req.params.end,
    };

    //
    //	15.	Create a stream chunk based on what the browser asked us for
    //
    let stream = file.createReadStream(stream_position);

    //
    //	16.	Pipe the video chunk to the request back to the request
    //
    stream.pipe(res);

    //
    //	->	If there was an error while opening a stream we stop the
    //		request and display it.
    //
    stream.on('error', function(err) {
        return next(err);
    });
});

//
//	The API call that gets all the Magnet Hashes that the client is actually
//	having.
//
//	return 		<-	An array with all the Magnet Hashes
//
app.get('/list', function(req, res, next) {
    //
    //	1.	Loop over all the Magnet Hashes
    //
    let torrent = client.torrents.reduce(function(array, data) {
        array.push({
            hash: data.infoHash
        });

        return array;
    }, []);

    //
    //	->	Return the Magnet Hashes
    //
    res.status(200);
    res.json(torrent);
});

//
//	The API call that sends back the stats of the client
//
//	return 		<-	A object with the client stats
//
app.get('/stats', function(req, res, next) {
    res.status(200);
    res.json(stats);
});

//
//	The API call that gets errors that occurred with the client
//
//	return 		<-	A a string with the error
//
app.get('/errors', function(req, res, next) {
    res.status(200);
    res.json(error_message);
});

//
//	The API call to delete a Magnet Hash from the client.
//
//	magnet 		-> 	Magnet Hash
//
//	return 		<-	Just the status of the request
//
app.get('/delete/:magnet', function(req, res, next) {
    //
    //	1.	Extract the magnet Hash and save it in a meaningful variable.
    //
    let magnet = req.params.magnet;

    //
    //	2.	Remove the Magnet Hash from the client.
    //
    client.remove(magnet, function() {
        res.status(200);
        res.end();
    });
});

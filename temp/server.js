const express = require('express');
const cors = require('cors');
const { getMagnet, addMagnet, removeMagnet } = require('./src/container');

const app = express();

const fs = require('fs');
const path = require('path');
const https = require('https');
const privateKey = fs.readFileSync('cert/key.pem', 'utf8');
const certificate = fs.readFileSync('cert/hypertube.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);

const TEMP_PORT = 9445;

app.use(cors());

const TorrentsManager = require('./src/manager');

app.get('/temp/add/:magnet', (req, res) => {
	const magnet = req.params.magnet;

	console.log(`add - ${magnet}`);

	if (getMagnet(magnet) === undefined) {
		console.log(`add function has started!`);

		const torrentsManager = new TorrentsManager();

		torrentsManager
			.add(magnet, {
				dht: true
			})
			.then(async torrent => {
				let max = {
					filename: '',
					length: 0
				};

				await torrent.files.forEach(data => {
					if (max.length < data.length)
						max = {
							filename: data.name,
							length: data.length
						};
				});

				addMagnet(magnet, max.filename);
				res.json(max);
			});
	} else {
		console.log(`This margnet has been existed already!`);
		res.json(getMagnet(magnet));
	}
});

app.get('/temp/stream/:magnet/:filename', (req, res) => {
	const magnet = req.params.magnet;
	const filename = req.params.filename;

	console.log(`stream - ${magnet}`);

	const basepath = `${path.join(__dirname, 'public', 'video', magnet)}`;

	const filepath = `${path.join(
		__dirname,
		'public',
		'video',
		magnet,
		fs
			.readdirSync(basepath)
			.filter(file =>
				fs.statSync(path.join(basepath, file)).isDirectory()
			)[0],
		filename
	)}`;

	console.log(filepath);

	let stat = fs.statSync(filepath);
	let fileSize = stat.size;
	const range = req.headers.range;

	const parts = range.replace(/bytes=/, '').split('-');
	const start = parseInt(parts[0], 10);
	const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
	const chunkSize = end - start + 1;

	res.writeHead(206, {
		'Content-Range': 'bytes ' + start + '-' + end + '/*',
		'Accept-Ranges': 'bytes',
		'Content-Length': chunkSize,
		'Content-Type': 'video/mp4',
		'Cache-Control': 'must-revalidate'
	});

	let stream = fs.createReadStream(filepath);

	stream.on('data', (res) => {
		console.log(res);
	})

	stream.pipe(res);

	stream.on('error', err => {
		return next(err);
	});
});

server.listen(TEMP_PORT, () => {
	console.log(`Server is running on port ${TEMP_PORT}`);
});

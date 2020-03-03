const bncode = require('bncode');
const crypto = require('crypto');

const METADATA_BLOCK_SIZE = 1 << 14;
const METADATA_MAX_SIZE = 1 << 22;
const EXTENSIONS = { m: { ut_metadata: 1 } };

const sha1 = data =>
	crypto
		.createHash('sha1')
		.update(data)
		.digest('hex');

const exchangeMetadata = (infoHash, metadata, callback) => {
	let metadataPieces = [];

	return wire => {
		wire.once('extended', (id, encodedHandshake) => {
			let handshake;
			try {
				handshake = bncode.decode(encodedHandshake);
			} catch (err) {
				return;
			}

			if (id || !handshake.m || handshake.m.ut_metadata === undefined)
				return;

			const channel = handshake.m.ut_metadata;
			const size = handshake.metadata_size;

			wire.on('extended', (extId, ext) => {
				if (extId !== EXTENSIONS.m.ut_metadata) return;

				let wireMetadata = metadata;
				let delimiter;
				let message;
				let piece;

				try {
					delimiter = ext.toString('ascii').indexOf('ee');
					message = bncode.decode(
						ext.slice(
							0,
							delimiter === -1 ? ext.length : delimiter + 2
						)
					);
					piece = message.piece;
				} catch (err) {
					return;
				}

				if (piece < 0) return;
				if (message.msg_type === 2) return;

				if (message.msg_type === 0) {
					if (!wireMetadata) {
						wire.extended(channel, { msg_type: 2, piece });
						return;
					}
					const offset = piece * METADATA_BLOCK_SIZE;
					const buf = wireMetadata.slice(
						offset,
						offset + METADATA_BLOCK_SIZE
					);
					wire.extended(
						channel,
						Buffer.concat([
							bncode.encode({ msg_type: 1, piece }),
							buf
						])
					);
					return;
				}

				if (message.msg_type === 1 && !wireMetadata) {
					metadataPieces[piece] = ext.slice(delimiter + 2);
					for (let i = 0; i * METADATA_BLOCK_SIZE < size; i += 1) {
						if (!metadataPieces[i]) return;
					}

					wireMetadata = Buffer.concat(metadataPieces);

					if (infoHash !== sha1(wireMetadata)) {
						metadataPieces = [];
						wireMetadata = null;
						return;
					}

					const buf = bncode.encode({
						info: bncode.decode(wireMetadata),
						'announce-list': []
					});
					callback(buf);
				}
			});

			if (size > METADATA_MAX_SIZE) return;
			if (!size || metadata) return;

			for (let i = 0; i * METADATA_BLOCK_SIZE < size; i += 1) {
				if (!metadataPieces[i]) {
					wire.extended(channel, { msg_type: 0, piece: i });
				}
			}
		});

		if (!wire.peerExtensions.extended) return;
		wire.extended(
			0,
			metadata
				? { m: { ut_metadata: 1 }, metadata_size: metadata.length }
				: { m: { ut_metadata: 1 } }
		);
	};
};

module.exports = exchangeMetadata;
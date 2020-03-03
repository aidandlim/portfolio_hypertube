const currentMagnets = [];

const getMagnet = magnet => {
    return currentMagnets.find(check => check.magnet === magnet);
}

const addMagnet = (magnet, filename) => {
    currentMagnets.push({ magnet, filename });
};

const removeMagnet = magnet => {
	const index = currentMagnets.findIndex(check => check.magnet === magnet);

	if (index !== -1) {
		return currentMagnets.splice(index, 1)[0];
	}
};

module.exports = { getMagnet, addMagnet, removeMagnet };

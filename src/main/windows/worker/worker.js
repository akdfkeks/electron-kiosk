window.onload = async () => {
	try {
		await window.preload.init();
	} catch (e) {
		console.log(e);
	}
};

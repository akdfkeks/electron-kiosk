const startBtn = document.getElementById("startBtn");
const canvas = document.getElementById("overlay");

startBtn.onclick = async () => {
	try {
		await window.faceapi.init(canvas);
		window.faceapi.detect();
	} catch (e) {
		console.log(e);
	}
};

const startBtn = document.getElementById("startBtn");
const canvas = document.getElementById("overlay");

window.onload = async () => {
	try {
		await window.faceapi.init(canvas);
	} catch (e) {
		console.log(e);
	}
};

const faceapi = require("face-api.js");
const path = require("path");

let cam;
const displaySize = { width: 480, height: 360 }; //
const overlay = document.getElementById("overlay");
const dims = faceapi.matchDimensions(overlay, displaySize, true);
const minConfidence = 0.1;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });

faceapi.env.monkeyPatch({
	Canvas: HTMLCanvasElement,
	Image: HTMLImageElement,
	ImageData: ImageData,
	Video: HTMLVideoElement,
	createCanvasElement: () => document.createElement("canvas"),
	createImageElement: () => document.createElement("img"),
});

async function loadNet() {
	await faceapi.loadSsdMobilenetv1Model(path.join(__dirname, "../data/weights"));
	await faceapi.loadFaceDetectionModel(path.join(__dirname, "../data/weights"));
}

async function initCamera(width, height) {
	video.width = width;
	video.height = height;

	const video = document.getElementById("cam");
	const stream = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			facingMode: "user",
			width: width,
			height: height,
		},
	});
	video.srcObject = stream;

	return new Promise((resolve) => {
		video.onloadedmetadata = () => {
			resolve(video);
		};
	});
}

async function detectFace() {
	const frame = await faceapi.detectSingleFace(cam, faceapiOptions);
	if (frame) {
		const resizedResult = faceapi.resizeResults(frame, dims);
		overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
		faceapi.draw.drawDetections(overlay, resizedResult);
	} else {
		overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
	}
}

loadNet()
	.then((_) => {
		console.log("Model has loaded");
		return await initCamera(displaySize.width, displaySize.height);
	})
	.then((video) => {
		console.log("Camera was initialized");
		cam = video
		setInterval(detectFace, 0);
	});

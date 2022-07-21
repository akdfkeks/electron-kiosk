const faceapi = require("face-api.js");
const path = require("path");

// Global variables and flags
let cam;
let loopTimer;
let isReady = false;
let isPaused = true;
const displaySize = {
	width: 480,
	height: 360,
};

// Initialize detect option and model
const minConfidence = 0.1;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });

// Basic environment settings
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

// Initialize Camera
async function initCamera(width, height) {
	const video = document.getElementById("cam");
	video.width = width;
	video.height = height;

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

const overlay = document.getElementById("overlay");
const dims = faceapi.matchDimensions(overlay, displaySize, true);

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
		console.log("Network has loaded");
		return initCamera(displaySize.width, displaySize.height);
	})
	.then((video) => {
		console.log("Camera was initialized");
		cam = video;
		isReady = true;
		camController(true);
	});

function camController(flag) {
	if (isReady && isPaused && flag) {
		loopTimer = setInterval(detectFace, 0);
	} else {
		clearInterval(loopTimer);
	}
}

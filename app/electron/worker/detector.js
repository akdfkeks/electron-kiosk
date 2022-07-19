const faceapi = require("face-api.js");
const path = require("path");

// Initialize detect option and model
const minConfidenceFace = 0.5;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidenceFace });

// Global variables and flags
let cam;
let loopTimer;
const displaySize = {
	width: 480,
	height: 360,
};

// Basic environment settings
faceapi.env.monkeyPatch({
	Canvas: HTMLCanvasElement,
	Image: HTMLImageElement,
	ImageData: ImageData,
	Video: HTMLVideoElement,
	createCanvasElement: () => document.createElement("canvas"),
	createImageElement: () => document.createElement("img"),
});

const loadNet = async () => {
	await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "../data/weights"));
	await faceapi.loadFaceDetectionModel(path.join(__dirname, "../data/weights"));
};

// Initialize Camera
const initCamera = async (width, height) => {
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
};

const overlay = document.getElementById("overlay");
const dims = faceapi.matchDimensions(overlay, displaySize, true);

const detectFace = async () => {
	const frame = await faceapi.detectSingleFace(cam, faceapiOptions);
	const resizedResult = faceapi.resizeResults(frame, dims);

	overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
	faceapi.draw.drawDetections(overlay, resizedResult);
};

loadNet()
	.then((_) => {
		console.log("Network has loaded");
		return initCamera(480, 360);
	})
	.then((video) => {
		console.log("Camera was initialized");
		cam = video;
		loopTimer = setInterval(detectFace, 0);
	});

const electron = require("electron");
const faceapi = require("face-api.js");
const ipcRenderer = electron.ipcRenderer;
//import * as faceapi from "face-api.js";

// Initialize detect option and model
const minConfidenceFace = 0.5;
const faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidenceFace });

// Global variables and flags
let cam;
let isRunning = true;
let isReady = false;
let loopTimer;

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
	const detectionNet = faceapi.nets.ssdMobilenetv1;
	await detectionNet.load("../data/weights");
	await faceapi.loadFaceDetectionModel("../data/weights");
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

const detectFace = async () => {
	let result = await faceapi.detectSingleFace(cam, faceapiOptions).withFaceLandmarks().withFaceDescriptor();

	if (!isReady) {
		isReady = true;
	}
	if (typeof result == "undefined") {
	}

	// Test
	console.log(result);
};

loadNet()
	.then((_) => {
		console.log("Network has loaded");
		return initCamera(480, 360);
	})
	.then((video) => {
		console.log("Camera was initialized");
		cam = video;
		loopTimer = setInterval(detectFace, 500);
	});

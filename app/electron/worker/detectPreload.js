const { contextBridge, ipcRenderer } = require("electron");
const faceapi = require("face-api.js");
const path = require("path");

let cam, loopTimer, status;
let overlay, faceapiOptions, dims;
const displaySize = { width: 480, height: 360 }; //
const minConfidence = 0.5;

const DETECTION_COUNT = 5;

contextBridge.exposeInMainWorld("faceapi", {
	init: async (canvas) => {
		overlay = canvas;
		await initVariables();
		await loadNet()
			.then(() => {
				console.log("Model loaded");
				return initCamera(displaySize.width, displaySize.height);
			})
			.then((video) => {
				console.log("Camera initialized");
				cam = video;
			});
		ipcRenderer.on("camServiceController", (flag) => {
			camServiceController(flag);
		});
	},
});

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

async function detectFace() {
	const frame = await faceapi.detectSingleFace(cam, faceapiOptions);
	if (frame) {
		const resizedResult = faceapi.resizeResults(frame, dims);
		overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
		faceapi.draw.drawDetections(overlay, resizedResult);
		return frame.classScore;
	} else {
		clearOverlay();
	}
}
function clearOverlay() {
	overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
}
async function initVariables() {
	faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });
	dims = faceapi.matchDimensions(overlay, displaySize, true);
}

async function camServiceController(flag) {
	const status = new Boolean(flag);

	if (status) {
		try {
			const temp = await detect();
			const result = await analyzeFace(temp);
		} catch (err) {
			console.log(err);
		}
	}
}

async function detect() {
	let result = new Array(DETECTION_COUNT);
	for (let i = 0; i < DETECTION_COUNT; i++) {
		result[i] = await detectFace();
	}
	//console.log(result);
}

async function analyzeFace(result) {
	let avg = 0;
	for (let i = 0; i < DETECTION_COUNT; i++) {
		avg += result[i];
	}
	avg = avg / DETECTION_COUNT;

	if (avg < minConfidence) {
		throw new Error("Error from analyzeFace");
	}
}

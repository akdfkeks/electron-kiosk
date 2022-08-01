const { contextBridge, ipcRenderer } = require("electron");
const getResult = require("./analyzer.js");
const faceapi = require("face-api.js");
const path = require("path");

let cam, video;
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
		console.log("Detection Ready");
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

async function initVariables() {
	faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });
	dims = faceapi.matchDimensions(overlay, displaySize, true);
}
async function loadNet() {
	await faceapi.loadSsdMobilenetv1Model(path.join(__dirname, "../data/weights"));
	await faceapi.loadFaceDetectionModel(path.join(__dirname, "../data/weights"));
}
async function initCamera(width, height) {
	video = document.getElementById("cam");
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
	//const face = await faceapi.detectSingleFace(cam, faceapiOptions);
	const frame = (await faceapi.fetchImage(cam)) || null;
	const detection = (await faceapi.detectSingleFace(frame, faceapiOptions)) || null;
	if (frame && detection) {
		const resizedResult = faceapi.resizeResults(detection, dims);
		clearOverlay();
		faceapi.draw.drawDetections(overlay, resizedResult);
		return { score: detection.classScore, image: frame };
	} else {
		clearOverlay();
	}
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
function clearOverlay() {
	overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
}
async function detect() {
	let result = new Array(DETECTION_COUNT);
	try {
		for (let i = 0; i < DETECTION_COUNT; i++) {
			result[i] = await detectFace();
		}
		const faceClass = await getResult(result);
	} catch (err) {
		console.log(err);
	}
}

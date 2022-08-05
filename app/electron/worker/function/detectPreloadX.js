const { contextBridge, ipcRenderer } = require("electron");
const getResult = require("./analyzer.js");
const path = require("path");

let cam, video;
let overlay, faceapiOptions, dims;
//const camSize = { width: 480, height: 360 }; //
const camSize = { width: 480, height: 360 }; //
const minConfidence = 0.5;
const DETECTION_COUNT = 1;

contextBridge.exposeInMainWorld("faceapi", {
	init: async (canvas) => {
		overlay = canvas;
		await initVariables();
		await loadNet()
			.then(() => {
				console.log("Model loaded");
				return initCamVideo();
			})
			.then((camera) => {
				console.log("Camera initialized");
				cam = camera;
			});
		ipcRenderer.on("camServiceController", (flag) => camServiceController(flag));
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
	dims = faceapi.matchDimensions(overlay, camSize, true);
}
async function loadNet() {
	await faceapi.loadSsdMobilenetv1Model(path.join(__dirname, "../data/weights"));
	await faceapi.loadFaceDetectionModel(path.join(__dirname, "../data/weights"));
}
async function initCamVideo() {
	video = document.getElementById("camVideo");
	video.width = camSize.width;
	video.height = camSize.height;

	const stream = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			facingMode: "user",
			width: camSize.width,
			height: camSize.height,
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
	try {
		const detection = (await faceapi.detectSingleFace(cam, faceapiOptions)) || null;
		if (detection) {
			//const frame = await faceapi.fetchImage(video);
			const resizedResult = faceapi.resizeResults(detection, dims);
			clearOverlay();
			faceapi.draw.drawDetections(overlay, resizedResult);
			return { score: detection.classScore, image: frame };
		} else {
			clearOverlay();
		}
	} catch (e) {
		console.log(e);
	}
}
async function camServiceController(flag) {
	const status = new Boolean(flag);

	if (status) {
		try {
			const temp = await detect();
			//const result = await analyzeFace(temp);
		} catch (err) {
			console.log(err);
		}
	}
}
function clearOverlay() {
	overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
}
async function detect() {
	let data = new Array(DETECTION_COUNT);
	try {
		for (let i = 0; i < DETECTION_COUNT; i++) {
			data[i] = await detectFace();
		}
		const faceClass = await getResult(data);
	} catch (err) {
		console.log(err);
	}
}

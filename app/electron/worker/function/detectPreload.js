const { contextBridge, ipcRenderer } = require("electron");
const { parseBoolean } = require("../../function/parseValue.js");
const faceDetectionModel = require("@tensorflow-models/face-detection");
const tf = require("@tensorflow/tfjs-node");
require("@tensorflow/tfjs-backend-webgl");
tf.setBackend("webgl");
const path = require("path");

let camera, video, tfcam, detector, faceAnalysisModel;
let overlay, overlayContext;
const CAMSIZE = { width: 480, height: 360 }; //
const MODELSIZE = { width: 224, height: 224 }; //
const DETECTION_COUNT = 1;

contextBridge.exposeInMainWorld("preload", {
	init: async () => {
		const model = faceDetectionModel.SupportedModels.MediaPipeFaceDetector;
		initElement();
		detector = await faceDetectionModel.createDetector(model, { runtime: "tfjs" });
		await initVideoWithCam().then((cam) => {
			camera = cam;
			console.log("Camera initialized");
			setInterval(faceTracker, 1000 / 30);
			console.log("Start tracking");
		});

		ipcRenderer.on("faceInfo", (event, flag) => faceAnalyzer(flag));
		console.log("Analysis ready");
	},
});

function initElement() {
	overlay = document.getElementById("overlay");
	video = document.getElementById("videowithcam");

	overlay.width = CAMSIZE.width;
	overlay.height = CAMSIZE.height;
	overlayContext = overlay.getContext("2d");
	overlayContext.translate(CAMSIZE.width, 0);
	overlayContext.scale(-1, 1);

	video.width = CAMSIZE.width;
	video.height = CAMSIZE.height;
	video.style.webkitTransform = "scaleX(-1)";
	video.style.transform = "scaleX(-1)";
}

async function initVideoWithCam() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: "user",
				width: CAMSIZE.width,
				height: CAMSIZE.height,
				frameRate: 30,
			},
		});

		video.srcObject = stream;
		tfcam = await tf.data.webcam(video, { resizeWidth: MODELSIZE.width, resizeHeight: MODELSIZE.height });

		return new Promise((resolve) => {
			video.onloadeddata = () => {
				resolve(video);
			};
		});
	} catch (err) {
		console.log(err);
	}
}

async function faceAnalyzer(flag) {
	console.log(flag);
	const ctlFlag = parseBoolean(flag);
	if (!ctlFlag) throw new Error("Error from faceAnalyzer");

	const img = await tfcam.capture();
	// TODO: Model
	console.log(img);
	img.dispose();
}
async function faceTracker() {
	const prediction = await detector.estimateFaces(video, false);
	if (prediction[0]) {
		const { xMin, xMax, yMin, yMax } = prediction[0].box;
		overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
		overlayContext.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
	} else {
		overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
	}
}

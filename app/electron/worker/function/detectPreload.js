const { contextBridge, ipcRenderer } = require("electron");
const parseBoolean = require("../../function/parseValue.js");
const blazeface = require("@tensorflow-models/blazeface");
const tf = require("@tensorflow/tfjs-node");

const path = require("path");
//const faceapi = require("face-api.js");

let cam, video, tfcam, faceAnalysisModel;
let overlay, overlayContext;
const CAMSIZE = { width: 480, height: 360 }; //
const MODELSIZE = { width: 224, height: 224 }; //
const DETECTION_COUNT = 1;

contextBridge.exposeInMainWorld("faceapi", {
	init: async () => {
		cam = await initVideoWithCam().then(() => console.log("Camera initialized"));
		faceAnalysisModel = await blazeface.load().then(() => console.log("Model loaded"));
		await faceTracker().then(() => console.log("Start tracking"));
		ipcRenderer.on("faceInfo", (flag) => faceAnalyzer(flag));
		console.log("Analysis ready");
	},
});

async function initVideoWithCam() {
	video = document.getElementById("videowithcam");
	overlay = document.getElementById("overlay");

	video.width = CAMSIZE.width;
	video.height = CAMSIZE.height;

	overlay.width = CAMSIZE.width;
	overlay.height = CAMSIZE.height;

	try {
		cam = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: "user",
				width: CAMSIZE.width,
				height: CAMSIZE.height,
			},
		});

		video.srcObject = cam;
		tfcam = await tf.data.webcam(video, { resizeWidth: MODELSIZE.width, resizeHeight: MODELSIZE.height });

		return new Promise((resolve) => {
			video.onloadedmetadata = () => {
				resolve(video);
			};
		});
	} catch (err) {
		console.log(err);
	}
}

async function faceAnalyzer(flag) {
	if (!parseBoolean(flag)) throw new Error("Error from faceAnalyzer");
	const img = await tfcam.capture();
	const result = await faceAnalsisModel.classify(img);

	img.dispose();
}

async function faceTracker() {
	const prediction = await faceAnalysisModel.estimateFace(video, false);
}

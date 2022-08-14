const { contextBridge, ipcRenderer } = require("electron");
const { parseBoolean } = require("./parseValue.js");
const faceDetectionModel = require("@tensorflow-models/face-detection");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
require("@tensorflow/tfjs-backend-webgl");
tf.setBackend("webgl");

class L2 {
	static className = "L2";
	constructor(config) {
		return tf.regularizers.l1l2(config);
	}
}
tf.serialization.registerClass(L2);

let video, tfcam, detector, analysisModel;
let overlay, overlayContext;
let detectionFlag = false;
const FPS = 30;
const CAMSIZE = { width: 480, height: 360 }; //
const MODELSIZE = { width: 224, height: 224 }; //

contextBridge.exposeInMainWorld("preload", {
	init: async () => {
		try {
			const detectionModel = faceDetectionModel.SupportedModels.MediaPipeFaceDetector;
			//analysisModel = await tf.loadLayersModel(path.resolve(__dirname, "../../models/model.json"));
			analysisModel = await tf.loadLayersModel(path.resolve(__dirname, "/../models/model.json"));
			initElement();
			detector = await faceDetectionModel.createDetector(detectionModel, { runtime: "tfjs" });
			await initVideoWithCam().then((cam) => {
				console.log("Camera initialized");
				setInterval(faceTracker, 1000 / FPS);
				console.log("Start tracking");
			});
			ipcRenderer.on("faceInfo", (event, flag) => faceAnalyzer(flag));
			console.log("Analysis ready");
		} catch (err) {
			throw new Error(`Fail to run preload.init() : ${err}`);
		}
	},
});

function initElement() {
	overlay = document.getElementById("overlay");
	video = document.getElementById("videowithcam");

	overlay.width = CAMSIZE.width;
	overlay.height = CAMSIZE.height;
	overlayContext = overlay.getContext("2d");
	overlayContext.strokeStyle = "red";
	overlayContext.lineWidth = 3;
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

async function faceTracker() {
	const location = await detector.estimateFaces(video, false);
	if (location[0]) {
		detectionFlag = true;
		const { xMin, xMax, yMin, yMax } = location[0].box;
		overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
		overlayContext.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
	} else {
		detectionFlag = false;
		overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
	}
}

async function faceAnalyzer(flag) {
	const ctlFlag = parseBoolean(flag);
	if (!ctlFlag) throw new Error("Error from faceAnalyzer");
	if (detectionFlag) {
		const img = await tfcam.capture();
		const probs = analysisModel.predict(img);
		const sorted = true;
		const { values, indices } = tf.topk(probs, topK, sorted);
		console.log(values, indices);
	} else faceAnalyzer();
}

// async function faceAnalyzer(flag) {
// 	console.log(flag);
// 	const ctlFlag = parseBoolean(flag);
// 	if (!ctlFlag) throw new Error("Error from faceAnalyzer");

// 	const img = await tfcam.capture();
// 	// TODO: Model
// 	console.log(img);
// 	img.dispose();
// }

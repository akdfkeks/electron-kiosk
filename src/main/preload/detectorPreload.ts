import { contextBridge, ipcRenderer } from "electron";
import { parseBoolean } from "../function/parseValue.js";
import { SupportedModels, createDetector, FaceDetector } from "@tensorflow-models/face-detection";
import * as tf from "@tensorflow/tfjs-node";
import * as path from "path";
import "@tensorflow/tfjs-backend-webgl";
//import { L1L2Args } from "@tensorflow/tfjs-layers/dist/regularizers.js";
import { WebcamIterator } from "@tensorflow/tfjs-data/dist/iterators/webcam_iterator.js";
import { LayerArgs } from "@tensorflow/tfjs-layers/dist/engine/topology.js";
import { Tensor } from "@tensorflow/tfjs-node";

class L2 extends tf.layers.Layer {
	static className = "L2";
	constructor(config) {
		super(config);
		//return tf.regularizers.l1l2(config);
	}
}

function tfjsInitializer() {
	tf.setBackend("webgl");
	tf.serialization.registerClass(L2);
}

const FPS = 30;
const isDev = process.env.NODE_ENV === "development";
const CAMSIZE = { width: 480, height: 360 }; //
const MODELSIZE = { width: 200, height: 200 }; //
const MODEL_PATH = isDev
	? path.resolve(__dirname, "../../resources/models/model.json")
	: path.resolve(process.env.APP_PATH || __dirname, "./resources/models/model.json");

let analyzer: Analyzer;

contextBridge.exposeInMainWorld("preload", {
	init: async () => {
		tfjsInitializer();

		analyzer = new Analyzer();
		console.log("Analyzer created");

		await analyzer.initDetector();
		console.log("Detector Model loaded");

		await analyzer.initVideofromUserMedia();
		console.log("Camera loaded");

		setIpcChannel(analyzer);
		console.log("Ipc ready");

		setInterval(() => {
			analyzer.faceTracker();
		}, 1000 / FPS);
	},
	foo: () => {},
	bar: () => {},
});

class Analyzer {
	video: HTMLVideoElement;
	overlay: HTMLCanvasElement;
	overlayContext: CanvasRenderingContext2D;

	detectionFlag: boolean;
	detector: FaceDetector;
	analysisModel: tf.LayersModel;

	tfcam: WebcamIterator;

	constructor() {
		this.detectionFlag = false;
		this.video = document.getElementById("videowithcam") as HTMLVideoElement;
		this.overlay = document.getElementById("overlay") as HTMLCanvasElement;
		this.overlayContext = this.overlay.getContext("2d") as CanvasRenderingContext2D;

		this.setElement();
	}

	setElement() {
		this.video.width = CAMSIZE.width;
		this.video.height = CAMSIZE.height;
		this.video.style.webkitTransform = "scaleX(-1)";
		this.video.style.transform = "scaleX(-1)";

		this.overlay.width = CAMSIZE.width;
		this.overlay.height = CAMSIZE.height;
		this.overlayContext.strokeStyle = "red";
		this.overlayContext.lineWidth = 3;
		this.overlayContext.translate(CAMSIZE.width, 0);
		this.overlayContext.scale(-1, 1);
	}

	async initDetector() {
		this.analysisModel = await tf.loadLayersModel(MODEL_PATH);
		this.detector = await createDetector(SupportedModels.MediaPipeFaceDetector, {
			runtime: "tfjs",
		});
	}

	async initVideofromUserMedia() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: "user",
					width: CAMSIZE.width,
					height: CAMSIZE.height,
					frameRate: FPS,
				},
			});
			this.video.srcObject = stream;
			this.tfcam = await tf.data.webcam(this.video, {
				resizeWidth: MODELSIZE.width,
				resizeHeight: MODELSIZE.height,
			});

			return new Promise((resolve) => {
				this.video.onloadeddata = () => {
					resolve(this.video);
				};
			});
		} catch (error) {
			console.log(error);
		}
	}

	async faceTracker() {
		const location = await this.detector.estimateFaces(this.video);
		if (location[0]) {
			const { xMin, xMax, yMin, yMax } = location[0].box;
			this.overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
			this.overlayContext.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
		} else {
			this.overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
		}
	}

	async faceAnalyzer(flag: string) {
		this.detectionFlag = parseBoolean(flag);

		if (this.detectionFlag) {
			const img = await this.tfcam.capture();
			const resizedData = tf.expandDims(img, 0);
			const probs = this.analysisModel.predictOnBatch(resizedData) as Tensor<tf.Rank>;
			const { values, indices } = tf.topk(probs);
			console.log(values, indices);
		} else console.log("Failed");
	}
}

function setIpcChannel(analyzer: Analyzer) {
	ipcRenderer.on("faceInfo", (event, flag: string) => {
		analyzer.faceAnalyzer(flag);
	});
	ipcRenderer.send("detector-loaded");
	console.log("Analysis ready");
}

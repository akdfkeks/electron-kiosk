"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var parseValue_js_1 = require("../function/parseValue.js");
var face_detection_1 = require("@tensorflow-models/face-detection");
var tf = require("@tensorflow/tfjs-node");
var path = require("path");
require("@tensorflow/tfjs-backend-webgl");
var L2 = /** @class */ (function (_super) {
    __extends(L2, _super);
    function L2(config) {
        return _super.call(this, config) || this;
        //return tf.regularizers.l1l2(config);
    }
    L2.className = "L2";
    return L2;
}(tf.layers.Layer));
function tfjsInitializer() {
    tf.setBackend("webgl");
    tf.serialization.registerClass(L2);
}
var FPS = 30;
var isDev = process.env.NODE_ENV === "development";
var CAMSIZE = { width: 480, height: 360 }; //
var MODELSIZE = { width: 200, height: 200 }; //
var MODEL_PATH = isDev
    ? path.resolve(__dirname, "../../resources/models/model.json")
    : path.resolve(process.env.APP_PATH || __dirname, "./resources/models/model.json");
var analyzer;
electron_1.contextBridge.exposeInMainWorld("preload", {
    init: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tfjsInitializer();
                    analyzer = new Analyzer();
                    console.log("Analyzer created");
                    return [4 /*yield*/, analyzer.initDetector()];
                case 1:
                    _a.sent();
                    console.log("Detector Model loaded");
                    return [4 /*yield*/, analyzer.initVideofromUserMedia()];
                case 2:
                    _a.sent();
                    console.log("Camera loaded");
                    setIpcChannel(analyzer);
                    console.log("Ipc ready");
                    setInterval(function () {
                        analyzer.faceTracker();
                    }, 1000 / FPS);
                    return [2 /*return*/];
            }
        });
    }); },
    foo: function () { },
    bar: function () { }
});
var Analyzer = /** @class */ (function () {
    function Analyzer() {
        this.detectionFlag = false;
        this.video = document.getElementById("videowithcam");
        this.overlay = document.getElementById("overlay");
        this.overlayContext = this.overlay.getContext("2d");
        this.setElement();
    }
    Analyzer.prototype.setElement = function () {
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
    };
    Analyzer.prototype.initDetector = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, tf.loadLayersModel(MODEL_PATH)];
                    case 1:
                        _a.analysisModel = _c.sent();
                        _b = this;
                        return [4 /*yield*/, (0, face_detection_1.createDetector)(face_detection_1.SupportedModels.MediaPipeFaceDetector, {
                                runtime: "tfjs"
                            })];
                    case 2:
                        _b.detector = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Analyzer.prototype.initVideofromUserMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stream, _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                                audio: false,
                                video: {
                                    facingMode: "user",
                                    width: CAMSIZE.width,
                                    height: CAMSIZE.height,
                                    frameRate: FPS
                                }
                            })];
                    case 1:
                        stream = _b.sent();
                        this.video.srcObject = stream;
                        _a = this;
                        return [4 /*yield*/, tf.data.webcam(this.video, {
                                resizeWidth: MODELSIZE.width,
                                resizeHeight: MODELSIZE.height
                            })];
                    case 2:
                        _a.tfcam = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.video.onloadeddata = function () {
                                    resolve(_this.video);
                                };
                            })];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Analyzer.prototype.faceTracker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var location, _a, xMin, xMax, yMin, yMax;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.detector.estimateFaces(this.video)];
                    case 1:
                        location = _b.sent();
                        if (location[0]) {
                            _a = location[0].box, xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax;
                            this.overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
                            this.overlayContext.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
                        }
                        else {
                            this.overlayContext.clearRect(0, 0, CAMSIZE.width, CAMSIZE.height);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Analyzer.prototype.faceAnalyzer = function (flag) {
        return __awaiter(this, void 0, void 0, function () {
            var ctlFlag, img, resizedData, probs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctlFlag = (0, parseValue_js_1.parseBoolean)(flag);
                        if (!ctlFlag)
                            throw new Error("Error from faceAnalyzer");
                        if (!this.detectionFlag) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tfcam.capture()];
                    case 1:
                        img = _a.sent();
                        resizedData = tf.expandDims(img, 0);
                        probs = this.analysisModel.predictOnBatch(resizedData);
                        console.log(probs);
                        return [3 /*break*/, 3];
                    case 2:
                        this.faceAnalyzer(true);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Analyzer;
}());
function setIpcChannel(analyzer) {
    electron_1.ipcRenderer.on("faceInfo", function (event, flag) {
        analyzer.faceAnalyzer(flag);
    });
    console.log("Analysis ready");
}

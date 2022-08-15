const { contextBridge, ipcRenderer } = require("electron");
const { parseBoolean } = require("./parseValue.js");
const faceDetectionModel = require("@tensorflow-models/face-detection");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
require("@tensorflow/tfjs-backend-webgl");
tf.setBackend("webgl");

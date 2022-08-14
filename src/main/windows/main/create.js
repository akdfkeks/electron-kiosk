const { BrowserWindow } = require("electron");
const isDev = process.env.NODE_ENV === "development";
const path = require("path");

let mainWindow = null;

module.exports = function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 300,
		height: 300,
		center: true,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: path.join(__dirname, "./function/mainPreload.js"),
		},
	});
	isDev ? mainWindow.loadURL("http://localhost:3000") : mainWindow.loadFile("index.html");
};

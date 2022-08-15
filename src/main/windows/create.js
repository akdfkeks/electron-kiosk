const { BrowserWindow } = require("electron");
const isDev = process.env.NODE_ENV === "development";
const path = require("path");

let mainWindow = null,
	camService = null;

module.exports = function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 834,
		height: 1194,
		center: true,
		resizable: isDev,
		//kiosk: !isDev,
		show: true,
		webPreferences: {
			devTools: true,
			sandbox: false,
			contextIsolation: true,
			preload: path.resolve("./preload/mainPreload.js"),
		},
	});

	if (isDev) mainWindow.loadURL("http://localhost:3000");
	else mainWindow.loadFile("index.html");

	mainWindow.on("close", () => {
		app.quit();
	});

	startCamService();
};

function startCamService() {
	if (camService) return;

	systemPreferences.askForMediaAccess("camera").then((allowed) => {
		if (!allowed) {
			alert("Camera not available");
			app.quit();
		}
	});

	camService = new BrowserWindow({
		width: 480,
		height: 360,
		center: true,
		//resizable: isDev,
		show: true,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: path.resolve("./preload/detectPreload.js"),
		},
	});
	camService.loadFile("index.html", { hash: "detector" });
	camService.on("closed", () => (camService = null));
}

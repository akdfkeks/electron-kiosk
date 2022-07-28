const { app, BrowserWindow, ipcMain, systemPreferences } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

let mainWindow, camWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 834,
		height: 1194,
		center: true,
		//resizable: isDev,
		//kiosk: !isDev,
		show: true,
		webPreferences: {
			devTools: true,
			contextIsolation: true,
			preload: path.join(__dirname, "./function/preload.js"),
		},
	});
	console.log(__dirname);
	if (isDev) mainWindow.loadURL("http://localhost:3000");
	else mainWindow.loadFile("build/index.html");

	ipcMain.on("createCamWindow", () => createCamWindow());
}

function createCamWindow() {
	if (camWindow) return;
	camWindow = new BrowserWindow({
		width: 480,
		height: 420,
		center: true,
		//resizable: isDev,
		//show: isDev,
		webPreferences: {
			devTools: true,
			contextIsolation: true,
			preload: path.join(__dirname, "./worker/detectPreload.js"),
		},
	});
	camWindow.loadURL(`file://${path.join(__dirname, "./worker/detector.html")}`);

	camWindow.on("closed", () => (camWindow = null));
}

app.whenReady().then(() => {
	createMainWindow();
	systemPreferences.askForMediaAccess("camera").then((allowed) => {
		if (!allowed) alert("Camera not available");
	});
});

app.on("window-all-closed", function () {
	app.quit();
});

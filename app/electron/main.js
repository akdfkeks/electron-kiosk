const { app, BrowserWindow, ipcMain, systemPreferences } = require("electron");
const isDev = process.env.NODE_ENV === "development";
const path = require("path");

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

	if (isDev) mainWindow.loadURL("http://localhost:3000");
	else mainWindow.loadFile("build/index.html");
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
	ipcMain.on("createCamWindow", () => createCamWindow());
	ipcMain.on("detectedScore", (...args) => sendDetectedScore(args[0]));
});

app.on("window-all-closed", () => app.quit());

function sendDetectedScore(score) {
	console.log(score);
	mainWindow.webContents.send("detectedScore", score);
}

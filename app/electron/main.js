const { app, BrowserWindow, ipcMain, systemPreferences } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

let mainWindow, camService;

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

function startCamService() {
	if (camService) return;

	systemPreferences.askForMediaAccess("camera").then((allowed) => {
		if (!allowed) alert("Camera not available");
	});

	camService = new BrowserWindow({
		width: 480,
		height: 360,
		center: true,
		//resizable: isDev,
		show: isDev,
		webPreferences: {
			devTools: true,
			contextIsolation: true,
			preload: path.join(__dirname, "./worker/detectPreload.js"),
		},
	});
	camService.loadURL(`file://${path.join(__dirname, "./worker/detector.html")}`);
	camService.on("closed", () => (camService = null));
}

app.whenReady().then(() => {
	createMainWindow();
	startCamService();

	ipcMain.on("detectFace", (flag) => camServiceController(flag));
	ipcMain.on("detectedScore", (event, payload) => {
		console.log(payload);
	});
});

app.on("window-all-closed", () => app.quit());

function camServiceController(flag) {
	if (flag) flag = "true";
	else flag = "false";
	camService.webContents.send("camServiceController", flag);
}

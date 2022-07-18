const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

let mainWindow, camWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 834,
		height: 1194,
		center: true,
		resizable: isDev,
		kiosk: !isDev,
		show: true,
		webPreferences: {
			devTools: isDev,
			preload: path.join(__dirname, "./function/preload.js"),
		},
	});

	mainWindow.webContents.on("did-finish-load", () => {
		mainWindow.show();
	});

	if (isDev) mainWindow.loadURL("http://localhost:3000");
	else mainWindow.loadFile("app/dist/index.html");

	if (isDev) createCamWindow();
}

function createCamWindow() {
	camWindow = new BrowserWindow({
		width: 480,
		height: 360,
		center: false,
		resizable: isDev,
		show: isDev,
		webPreferences: {
			devTools: isDev,
			nodeIntegration: true,
		},
	});
	if (isDev) camWindow.focus();
}

app.whenReady().then(() => {
	createMainWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});
});

app.on("window-all-closed", function () {
	app.quit();
});

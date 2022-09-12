import { app, ipcMain } from "electron";
import {
	createLoadingWindow,
	createMainWindow,
	createDetectorWindow,
} from "./function/createWindow.js";
import { getCameraAccess } from "./function/setup.js";

let loadingWindow, mainWindow, detectorWindow;

app.whenReady().then(async () => {
	loadingWindow = await createLoadingWindow();
	await loadingWindowEventHandler();

	const camIsAvailable = await getCameraAccess();
	if (!camIsAvailable) {
		alert("Camera is not available!");
		app.quit();
	}

	await mainWindowEventHandler();
});

app.on("window-all-closed", () => app.quit());

function detectorController(flag) {
	detectorWindow.webContents.send("faceInfo", flag);
}

async function loadingWindowEventHandler() {
	ipcMain.on("loader", (...msg) => {
		loadingWindow.webContents.send("loader", msg[1]);
	});
}

async function mainWindowEventHandler() {
	mainWindow = await createMainWindow();
	detectorWindow = await createDetectorWindow();

	ipcMain.on("detector-loaded", () => {
		if (loadingWindow) {
			//loadingWindow.close();
		}
		mainWindow.show();
		detectorWindow.show();
	});

	mainWindow.on("close", () => {
		mainWindow = null;
		detectorWindow = null;
		app.quit();
	});

	ipcMain.on("detectFace", (event, ...args) => detectorController(args[0]));
}

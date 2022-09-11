import { app, ipcMain } from "electron";
import { createMainWindow, createDetectorWindow } from "./function/createWindow.js";
import { getCameraAccess } from "./function/setup.js";

let mainWindow, detectorWindow;

app.whenReady().then(async () => {
	const camIsAvailable = await getCameraAccess();

	if (!camIsAvailable) {
		alert("Camera is not available!");
		app.quit();
	}

	mainWindow = await createMainWindow();
	detectorWindow = await createDetectorWindow();

	mainWindow.on("close", () => {
		mainWindow = null;
		detectorWindow = null;
		app.quit();
	});

	ipcMain.on("detectFace", (event, ...args) => detectorController(args[0]));
});

app.on("window-all-closed", () => app.quit());

function detectorController(flag) {
	detectorWindow.webContents.send("faceInfo", flag);
}

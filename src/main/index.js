import { app, ipcMain } from "electron";
import { MainWindow, DetectorWindow } from "./windows/create.js";
import { setUpWindow, getCameraAccess } from "./setup.js";

let mainWindow, detectorWindow;

function makeAppWithSingleInstanceLock(callback) {
	const isPrimaryInstance = app.requestSingleInstanceLock();
	!isPrimaryInstance ? app.quit() : callback();
}

makeAppWithSingleInstanceLock(async () => {
	await app.whenReady();

	const hwStatus = await getCameraAccess();
	if (hwStatus) {
		mainWindow = await setUpWindow(MainWindow);
		detectorWindow = await setUpWindow(DetectorWindow);

		ipcMain.on("detectFace", (event, ...args) => camServiceController(args[0]));
		ipcMain.on("detectedScore", (event, payload) => {
			console.log(payload);
		});
	} else {
		app.quit();
	}
});

function camServiceController(flag) {
	detectorWindow.webContents.send("faceInfo", flag);
}
/*
MainWindow, DetectorWindow : 창을 만들어주는 함수.
setUpWindow : 위의 함수를 전달받아 창을 생성하고, ipc 채널 등에 대한 설정을 함

*/

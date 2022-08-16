import { app } from "electron";
import { MainWindow, DetectorWindow } from "./windows/create.js";
import { setUpWindow, getCameraAccess } from "./setup.js";

function makeAppWithSingleInstanceLock(callback) {
	const isPrimaryInstance = app.requestSingleInstanceLock();
	!isPrimaryInstance ? app.quit() : callback();
}

makeAppWithSingleInstanceLock(async () => {
	await app.whenReady();

	const hwStatus = await getCameraAccess();
	if (hwStatus) {
		await setUpWindow(MainWindow);
		await setUpWindow(DetectorWindow);
	} else {
		app.quit();
	}
});

/*
MainWindow, DetectorWindow : 창을 만들어주는 함수.
setUpWindow : 위의 함수를 전달받아 창을 생성하고, ipc 채널 등에 대한 설정을 함

*/

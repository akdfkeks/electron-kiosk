import { systemPreferences, ipcMain } from "electron";
//import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

const isDev = process.env.NODE_ENV == "development";

export async function setUpWindow(createWindow) {
	// if (isDev) {
	// 	await installExtension(REACT_DEVELOPER_TOOLS, { forceDownload: false });
	// }
	let window = await createWindow();

	return window;
}

export async function getCameraAccess() {
	const result = await systemPreferences.askForMediaAccess("camera");
	if (!result) {
		alert("Camera not available");
	}
	return result;
}

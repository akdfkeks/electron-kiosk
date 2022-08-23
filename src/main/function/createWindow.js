import { BrowserWindow, app } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === "development";
const DEVSERVER = "http://localhost:3000";
const appPath = app.getAppPath();

export async function createMainWindow() {
	const window = new BrowserWindow({
		show: true,
		width: 834,
		height: 1194,
		useContentSize: true,
		center: true,
		resizable: false,
		//kiosk: !isDev,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: path.resolve(appPath, "./preload/mainPreload.js"),
		},
	});

	return loadPage(window, "splash");
}

export async function createDetectorWindow() {
	const window = new BrowserWindow({
		titleBarStyle: "hidden",
		// 얘를 ⬇ false 로 바꾸면 창 안보일거임
		show: true,
		width: 480,
		height: 360,
		// useContentSize: true,
		center: true,
		resizable: false,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: path.resolve(appPath, "./preload/detectorPreload.js"),
		},
	});

	return loadPage(window, "detector");
}

function loadPage(window, entry) {
	if (isDev) {
		const devServer = `${DEVSERVER}#/${entry}`;
		window.loadURL(devServer);
	} else {
		window.loadFile(path.resolve(appPath, "./index.html"), {
			hash: `/${entry}`,
		});
	}
	return window;
}

import { BrowserWindow, app } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const DEVSERVER = "http://localhost:3000";
let appPath = app.getAppPath();

export async function MainWindow() {
	const window = createWindow({
		entry: "splash",
		title: "Electron Kiosk",
		show: true,
		width: 834,
		height: 1194,
		center: true,
		resizable: false,
		//kiosk: !isDev,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: isDev
				? path.resolve(appPath, "./function/mainPreload.js")
				: path.resolve(appPath, "./main/function/mainPreload.js"),
		},
	});
	window.on("close", () => {
		app.quit();
	});

	return window;
}

export async function DetectorWindow() {
	const window = createWindow({
		entry: "detector",
		title: "Detector",
		show: true,
		width: 480,
		height: 360,
		titleBarStyle: "hidden",
		center: true,
		resizable: false,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: isDev
				? path.resolve(appPath, "./function/detectorPreload.js")
				: path.resolve(appPath, "./main/function/detectorPreload.js"),
		},
	});
	window.setName;
	return window;
}

function createWindow({ entry, ...settings }) {
	const window = new BrowserWindow(settings);
	const devServer = `${DEVSERVER}#/${entry}`;

	if (isDev) window.loadURL(devServer);
	else {
		//const appPath = app.getAppPath();
		window.loadFile(path.resolve(appPath, "./renderer", "./index.html"), {
			hash: `/${entry}`,
		});
	}

	return window;
}

//module.exports = { MainWindow, DetectorWindow };

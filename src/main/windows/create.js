import { BrowserWindow, app } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const DEVSERVER = "http://localhost:3000";
let appPath = app.getAppPath();

export async function MainWindow() {
	const window = createWindow({
		entry: "splash",
		title: "Electron Kiosk",
		//titleBarStyle: "hidden",
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
			preload: isDev
				? path.resolve(appPath, "./preload/mainPreload.js")
				: path.resolve(appPath, "./preload/mainPreload.js"),
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
		titleBarStyle: "hidden",
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
			preload: isDev
				? path.resolve(appPath, "./preload/detectorPreload.js")
				: path.resolve(appPath, "./preload/detectorPreload.js"),
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

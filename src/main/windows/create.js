import { BrowserWindow, app } from "electron";
import path from "path";
const isDev = process.env.NODE_ENV === "development";

const DEVSERVER = "http://localhost:3000";

export async function MainWindow() {
	const window = createWindow({
		entry: "splash",
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
			preload: path.resolve(__dirname, "./preload/mainPreload.js"),
			//preload: path.resolve("./preload", "mainPreload.js"),
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
		show: true,
		width: 480,
		height: 360,
		center: true,
		//resizable: isDev,
		webPreferences: {
			sandbox: false,
			devTools: true,
			contextIsolation: true,
			preload: path.resolve(__dirname, "./preload/detectorPreload.js"),

			//preload: path.resolve("./preload", "detectorPreload.js"),
		},
	});

	return window;
}

function createWindow({ entry, ...settings }) {
	const window = new BrowserWindow(settings);
	const devServer = `${DEVSERVER}#/${entry}`;

	if (isDev) window.loadURL(devServer);
	else window.loadFile("index.html", { hash: `/${entry}` });

	return window;
}

//module.exports = { MainWindow, DetectorWindow };

const { app } = require("electron");
const createMainWindow = require("./windows/main/create.js");

app.whenReady().then(() => {
	createMainWindow();
	mainWindow.on("close", () => {
		app.quit();
	});
});

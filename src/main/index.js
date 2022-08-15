const { app } = require("electron");
const createMainWindow = require("./windows/create.js");

app.whenReady().then(() => {
	createMainWindow();
});

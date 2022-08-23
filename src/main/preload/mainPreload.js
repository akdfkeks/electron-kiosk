import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
	send: (channel, data) => {
		let validChannels = ["createCamWindow", "toMain", "detectFace"];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, callback) => {
		let validChannels = ["updateInterface", "detectedScore"];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => callback(args[0]));
		}
	},
});

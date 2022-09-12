import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("loader", {
	getInfo: (callback) => ipcRenderer.on("loader", callback),
});

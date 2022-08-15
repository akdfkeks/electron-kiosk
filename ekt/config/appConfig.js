const { resolve } = require("path");

const {
	devServer: DEVSERVER,
	name: NAME,
	author: AUTHOR,
	version: VERSION,
	displayName: TITLE,
	description: DESCRIPTION,
} = require("../../package.json");

exports.APP_CONFIG = {
	NAME,
	TITLE,
	AUTHOR,
	VERSION,
	DESCRIPTION,
	DEVSERVER,

	DIR: {
		ENTRY: {
			MAIN: resolve(__dirname, "../../src/main/index.js"),
			RENDERER: resolve(__dirname, "../../src/renderer/index.jsx"),
			MAIN_PRELOAD: resolve(__dirname, "../../src/function/mainPreload.js"),
			DETECTOR_PRELOAD: resolve(__dirname, "../../src/function/detectorPreload.js"),
		},

		INDEX_HTML: resolve(__dirname, "../../src/renderer/index.html"),
		RESOURCES: resolve(__dirname, "../../src/resources/"),
		BUILD: resolve(__dirname, "../../build"),
		PKG: resolve(__dirname, "../../dist"),
	},
};

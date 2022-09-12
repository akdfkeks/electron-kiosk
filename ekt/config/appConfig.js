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
			MAIN_PRELOAD: resolve(__dirname, "../../src/main/preload/mainPreload.js"),
			DETECTOR_PRELOAD: resolve(__dirname, "../../src/main/preload/detectorPreload.js"),
		},
		OUTPUT: {
			MAIN: resolve(__dirname, "../../build"),
			FUNCTION: resolve(__dirname, "../../build/function"),
			RESOURCES: resolve(__dirname, "../../build/resources"),
			MODELS: resolve(__dirname, "../../build/resources/models"),
			ASSETS: resolve(__dirname, "../../build/resources/assets"),
		},

		INDEX_HTML: resolve(__dirname, "../../src/renderer/index.html"),
		LOADING_HTML: resolve(__dirname, "../../src/main/function/loading.html"),
		RESOURCES: resolve(__dirname, "../../src/resources/"),
		ASSETS: resolve(__dirname, "../../src/resources/assets/"),
		BUILD: resolve(__dirname, "../../build"),
		MODELS: resolve(__dirname, "../../src/resources/models/"),
		PKG: resolve(__dirname, "../../dist"),
	},
};

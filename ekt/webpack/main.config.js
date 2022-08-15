const { resolve } = require("path");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const base = require("./base.config.js");

const mainConfig = {
	target: "electron-main",

	...base,

	entry: {
		index: resolve(DIR.ENTRY.MAIN),
		mainPreload: resolve(DIR.ENTRY.MAIN_PRELOAD),
		detectorPreload: resolve(DIR.ENTRY.DETECTOR_PRELOAD),
	},
	output: {
		path: resolve(DIR.BUILD),
		filename: "[name].js",
	},
};

module.exports = mainConfig;

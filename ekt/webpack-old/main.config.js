const { resolve } = require("path");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const base = require("./base.config.js");
const nodeExternals = require("webpack-node-externals");

const mainConfig = {
	target: "electron-main",

	...base,

	entry: {
		"main/index": resolve(DIR.ENTRY.MAIN),
		"main/function/mainPreload": resolve(DIR.ENTRY.MAIN_PRELOAD),
		"main/function/detectorPreload": resolve(DIR.ENTRY.DETECTOR_PRELOAD),
	},
	output: {
		path: resolve(DIR.BUILD),
		filename: "[name].js",
	},
	externals: [nodeExternals()],
};

module.exports = mainConfig;

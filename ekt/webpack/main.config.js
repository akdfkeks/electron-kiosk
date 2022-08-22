const { resolve } = require("path");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const { merge } = require("webpack-merge");
const base = require("./base.config.js");
const nodeExternals = require("webpack-node-externals");

const mainConfig = {
	entry: {
		index: resolve(DIR.ENTRY.MAIN),
		"preload/mainPreload": resolve(DIR.ENTRY.MAIN_PRELOAD),
		"preload/detectorPreload": resolve(DIR.ENTRY.DETECTOR_PRELOAD),
	},
	output: {
		filename: "[name].js",
		path: resolve(DIR.OUTPUT.MAIN),
	},
	externals: [nodeExternals()],
};

module.exports = merge(base, mainConfig);

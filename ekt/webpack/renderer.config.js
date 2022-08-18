const base = require("./base.config.js");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const { resolve } = require("path");
const isDev = process.env.NODE_ENV !== "production";

const rendererConfig = {
	entry: {
		index: resolve(DIR.ENTRY.RENDERER),
	},
	output: {
		filename: "[name].js",
		path: resolve(DIR.OUTPUT.RENDERER),
		//publicPath: "./resources/assets",
	},
	module: {
		rules: [
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "./resources/assets/Images/[hash][ext]",
				},
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: resolve(DIR.INDEX_HTML),
			filename: "index.html",
		}),
	],
};

module.exports = merge(base, rendererConfig);

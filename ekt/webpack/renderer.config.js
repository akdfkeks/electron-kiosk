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
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve("swc-loader"),
						options: {
							jsc: {
								transform: {
									react: {
										development: isDev,
										refresh: isDev,
									},
								},
							},
						},
					},
				],
			},
		],
	},
	devServer: {
		port: APP_CONFIG.DEVSERVER.split(":")?.[2],
		historyApiFallback: true,
		compress: true,
		hot: true,
		client: {
			overlay: true,
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: resolve(DIR.INDEX_HTML),
			filename: "index.html",
		}),
		new webpack.DefinePlugin({
			process: JSON.stringify({
				platform: process.platform,
			}),
		}),
	],
};

module.exports = merge(base, rendererConfig);

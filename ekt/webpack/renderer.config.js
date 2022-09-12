const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const base = require("./base.config.js");
const { merge } = require("webpack-merge");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const { resolve } = require("path");
const webpack = require("webpack");
const path = require("path/win32");
const isDev = process.env.NODE_ENV !== "production";

const rendererConfig = {
	entry: {
		renderer: resolve(DIR.ENTRY.RENDERER),
	},
	output: {
		filename: "[name].js",
		path: resolve(DIR.OUTPUT.MAIN),
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
		isDev && new ReactRefreshWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: resolve(DIR.INDEX_HTML),
			filename: "index.html",
			chunks: ["renderer"],
		}),
		new HTMLWebpackPlugin({
			template: resolve(DIR.LOADING_HTML),
			filename: "loading.html",
			chunks: [],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "src/resources/models",
					to: "resources/models",
				},
			],
		}),
		new webpack.DefinePlugin({
			process: JSON.stringify({
				platform: process.platform,
			}),
		}),
	].filter(Boolean),
};

module.exports = merge(base, rendererConfig);

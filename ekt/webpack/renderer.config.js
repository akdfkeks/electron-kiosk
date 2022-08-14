const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const { resolve } = require("path");

const base = require("./base.config.js");
const { APP_CONFIG } = require("../config/appConfig.js");
const { DIR } = APP_CONFIG;
const { isModuleAvailable, isDev } = require("./utils.js");
const isSassAvailable = isModuleAvailable("sass") && isModuleAvailable("sass-loader");

module.exports = {
	target: "web",
	entry: resolve(DIR.ENTRY.RENDERER),

	...base,

	resolve: {
		...base.resolve,
		alias: {
			...base.resolve.alias,
			react: resolve("node_modules", "react"),
		},
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

	output: {
		path: resolve(DIR.BUILD),
		filename: "renderer.js",
	},

	module: {
		rules: [
			...base.module.rules,

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

			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},

			isSassAvailable && {
				test: /\.s(a|c)ss$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { modules: true },
					},
					"sass-loader",
				],
				include: /\.module\.s(a|c)ss$/,
			},

			isSassAvailable && {
				test: /\.s(a|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
				exclude: /\.module\.s(a|c)ss$/,
			},

			{
				test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g|gif)$/,
				use: ["file-loader"],
			},

			{
				test: /\.svg$/,
				issuer: /\.[jt]sx?$/,
				loader: "@svgr/webpack",
			},
		].filter(Boolean),
	},

	plugins: [
		...base.plugins,

		isDev && new ReactRefreshWebpackPlugin(),

		new CopyWebpackPlugin({
			patterns: [
				{
					from: resolve(DIR.RESOURCES),
					to: resolve(DIR.BUILD, "resources"),
				},
			],
		}),

		new webpack.DefinePlugin({
			process: JSON.stringify({
				platform: process.platform,
			}),
		}),

		new HTMLWebpackPlugin({
			template: resolve(DIR.INDEX_HTML),
		}),
	].filter(Boolean),
};

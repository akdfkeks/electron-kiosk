const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";
const { resolve } = require("path");

const base = {
	mode: isDev ? "development" : "production",

	stats: "minimal",

	performance: {
		hints: false,
	},

	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"~": resolve(),
		},
	},
	devtool: isDev ? "eval-source-map" : "source-map",

	optimization: { usedExports: true },

	module: {
		rules: [
			{
				test: /\.(js|ts|tsx|jsx)$/,
				loader: "swc-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [new SimpleProgressWebpackPlugin({ format: "minimal" })],
	stats: {
		errorDetails: true,
	},
};

module.exports = base;

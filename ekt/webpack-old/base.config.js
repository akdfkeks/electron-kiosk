const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";
const { resolve } = require("path");

const base = {
	mode: isDev ? "development" : "production",

	stats: "minimal",

	devtool: isDev? "eval-cheap-source-map" : "source-map",
	
	performance: {
		hints: false,
	},

	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"~": resolve(),
		},
	},

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

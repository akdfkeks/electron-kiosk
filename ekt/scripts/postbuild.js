const { writeFile } = require("fs/promises");
const { resolve } = require("path");
const { BUILD } = require("../config/appConfig.js").APP_CONFIG.DIR;
const packageJSON = require("../../package.json");

async function createPackageJSONDistVersion() {
	const { main, scripts, devDependencies, ...restOfPackageJSON } = packageJSON;
	const packageJSONDistVersion = {
		main: main?.split("/")?.reverse()?.[0] || "index.js",
		...restOfPackageJSON,
	};

	try {
		await writeFile(resolve(BUILD, "package.json"), JSON.stringify(packageJSONDistVersion, null, 2));
	} catch ({ message }) {
		console.log(`Error: ${message}`);
	}
}

createPackageJSONDistVersion();

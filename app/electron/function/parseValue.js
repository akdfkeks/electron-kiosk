module.exports = {
	parseBoolean: function (value) {
		const data = value.toLowerCase();
		if (data === "true") return true;
		else return false;
	},
};

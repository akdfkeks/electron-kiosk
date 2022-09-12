const title = document.getElementById("title");

window.addEventListener("DOMContentLoaded", () => {
	window.loader.getInfo((event, value) => {
		console.log(value);
		title.innerText = value;
	});
});

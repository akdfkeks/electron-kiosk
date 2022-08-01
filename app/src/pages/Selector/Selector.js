import React, { Component, useState } from "react";
import "./Selector.css";

export default function Selector(props) {
	const title = "Selector Page";
	const [mode, setMode] = useState();

	const setOrderMode = (mode) => setMode(mode);

	return (
		<div className="SelectorContainer">
			<button className="ButtonPackage" onClick={() => setOrderMode(MODE.PACKAGE)}>
				포장
			</button>
			<button className="ButtonStore" onClick={() => setOrderMode(MODE.STORE)}>
				매장
			</button>
		</div>
	);
}

const MODE = {
	PACKAGE: 1,
	STORE: 2,
};

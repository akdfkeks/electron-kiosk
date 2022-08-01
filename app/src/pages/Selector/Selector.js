import React, { Component } from "react";
import "./Selector.css";

export default class Selector extends Component {
	constructor(props) {
		super(props);
		this.title = "Selector Page";
		this.state = {
			mode: 0,
		};
	}
	setMode(mode) {
		this.setState({ mode: mode }, () => console.log(this.state.mode));
	}

	render() {
		return (
			<div className="SelectorContainer">
				<button className="ButtonPackage" onClick={() => this.setMode(MODE.PACKAGE)}>
					포장
				</button>
				<button className="ButtonStore" onClick={() => this.setMode(MODE.STORE)}>
					매장
				</button>
			</div>
		);
	}
}

const MODE = {
	PACKAGE: 1,
	STORE: 2,
};

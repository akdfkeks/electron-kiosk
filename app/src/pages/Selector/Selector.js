import React, { Component } from "react";
import "./Selector.css";

export default class Selector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Page B",
		};
	}
	render() {
		return (
			<div className="SelectorContainer">
				<button className="ButtonPackage">포장</button>
				<button className="ButtonStore">매장</button>
			</div>
		);
	}
}

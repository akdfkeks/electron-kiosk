import React, { Component } from "react";

export default class B extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Page B",
		};
	}
	render() {
		return (
			<div style={{ color: "blue" }}>
				<h1>{this.state.title}</h1>
			</div>
		);
	}
}

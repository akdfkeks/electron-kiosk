import React, { Component } from "react";

export default class A extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Page A",
		};
	}
	render() {
		return (
			<div style={{ color: "aqua" }}>
				<h1>{this.state.title}</h1>
			</div>
		);
	}
}

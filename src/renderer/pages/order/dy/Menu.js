import React, { Component } from "react";

export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="menuBox">
				<h1>{this.props.name}</h1>
				<h1>{this.props.price} 원</h1>
				<h1>{this.props.cal} cal</h1>
			</div>
		);
	}
}

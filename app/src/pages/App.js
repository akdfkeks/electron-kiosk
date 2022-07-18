import React, { Component } from "react";
import Temp from "../components/Temp/Temp.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render = () => {
		return (
			<div>
				<Temp />
			</div>
		);
	};
}

import React, { Component } from "react";
import Temp from "./Temp/Temp.js";
import Selector from "./Selector/Selector.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render = () => {
		return (
			<div>
				<div>
					<Temp />
				</div>
				<div>
					<Selector />
				</div>
			</div>
		);
	};
}

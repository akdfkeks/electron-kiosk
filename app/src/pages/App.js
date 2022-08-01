import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Temp from "./Temp/Temp.js";
import Selector from "./Selector/Selector.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<div>
					<Route path="/splash" element={<Splash />} />
					<Route path="/selector" element={<Selector />} />
					<Route path="/order" element={<Order />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/complete" element={<Complete />} />
				</div>
			</HashRouter>
		);
	}
}

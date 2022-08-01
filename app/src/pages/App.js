import React, { Component } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Splash from "./Splash/Splash.js";
import Selector from "./Selector/Selector.js";
import MainFrame from "./MainFrame/MainFrame.js";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<HashRouter>
				<Routes>
					<Route path="/" element={<Splash />} />
					<Route path="/selector" element={<Selector />} />
					{/* <Route path="/order" element={<Order />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/complete" element={<Complete />} /> */}
				</Routes>
			</HashRouter>
		);
	}
}

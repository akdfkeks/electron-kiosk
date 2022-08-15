import React, { Component } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Splash from "./splash/Splash.js";
import Selector from "./selector/Selector.js";
import Order from "./order/Order.js";
import Payment from "./payment/Payment.js";
import Complete from "./complete/Complete.js";
import Detector from "./detector/Detector.js";

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
					<Route path="/order" element={<Order />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/complete" element={<Complete />} />
					<Route path="/detector" element={<Detector />} />
				</Routes>
			</HashRouter>
		);
	}
}

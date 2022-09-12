import React, { Component } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Splash from "./splash/Splash.js";
import Selector from "./selector/Selector.js";
import OrderOld from "./order/Old/OrderOld.js";
import OrderYoung from "./order/Young/OrderYoung.js";
// import OrderChild from "./order/Old/OrderChild.js";
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
      <HashRouter className="routerContainer">
        <Routes>
          <Route path="/splash" element={<Splash />} />
          <Route path="/selector" element={<Selector />} />
          <Route path="/orderold" element={<OrderOld />} />
          <Route path="/orderyoung" element={<OrderYoung />} />
          {/* <Route path="/orderchild" element={<OrderChild />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/detector" element={<Detector />} />
        </Routes>
      </HashRouter>
    );
  }
}

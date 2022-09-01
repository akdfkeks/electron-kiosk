import React, { useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import Menucategory from "./Menucategory";

const OrderYoung = () => {
  return (
    <>
      <div className="order-background">
        <div className="best-menu">추천메뉴</div>
        <div className="best-menu-box">
          <button className="best-menu1"></button>
          <button className="best-menu2"></button>
          <button className="best-menu3"></button>
          <button className="best-menu4"></button>
        </div>
        <hr className="line"></hr>
        <Menucategory />
      </div>
    </>
  );
};

export default OrderYoung;

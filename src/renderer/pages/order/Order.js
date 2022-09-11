import React, { useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import Menucategory from "./Menucategory";

const Order = () => {
  return (
    <>
      <div className="order-background">
        <div className="best-menu">추천메뉴</div>
        <div className="best-menu-box">
          <button className="best-menu1"></button>
          <button className="best-menu2"></button>
          <button className="best-menu3"></button>
          <button className="best-menu4"></button>
          {/* 음 여기 코드 개쓰레기네 좀 더 생각하고 짤것 */}
        </div>
        <hr className="line"></hr>
        <Menucategory />
        <Link to="/selector">매장포장</Link>
      </div>
    </>
  );
};

export default Order;

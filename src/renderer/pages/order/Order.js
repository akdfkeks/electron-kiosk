import React from "react";
import "./Order.css";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <>
      <div className="order-background">
        <div className="category">추천메뉴</div>
        <div className="menu">
          <button className="menu-item1"></button>
          <div className="menu-item2"></div>
          <div className="menu-item3"></div>
          <div className="menu-item4"></div>
          {/* 음 여기 코드 개쓰레기네 좀 더 생각하고 짤것 */}
        </div>
        <Link to="/selector">매장포장</Link>
      </div>
    </>
  );
};

export default Order;

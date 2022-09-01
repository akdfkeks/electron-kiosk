import React from "react";
import "./OrderOld.css";

const OrderOld = () => {
  return (
    <>
      <div className="menutab">
        <button className="best-menu-young">추천메뉴</button>
        <button className="sandwich">샌드위치</button>
        <button className="drinks">음료</button>
        <button className="wrap">랩</button>
      </div>
      <div className="menuboard"></div>
      <div className="payment"></div>
    </>
  );
};

export default OrderOld;

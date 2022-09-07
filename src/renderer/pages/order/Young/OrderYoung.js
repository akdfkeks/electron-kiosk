import React, { useEffect, useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import Menucategory from "./Menucategory";

const orderYoung = () => {
  const menus = useRef([
    {
      // 여기에 추천메뉴들 들어가야함
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `-${current}00%`,
  });
  const menuSize = useRef(menus.current.length);

  const moveSlide = (i) => {
    let nextIndex = current + i;

    if (nextIndex < 0) nextIndex = menuSize.current - 1;
    else if (nextIndex > menuSize.current) nextIndex = 0;

    setCurrent(nextIndex);
  };

  useEffect(() => {
    setStyle({ marginLeft: `-${current}00%` });
  }, [current]);

  return (
    <>
      <div className="bestMenu-title">추천메뉴</div>
      <div className="bestMenu-box">
        <div className="bestMenu-slide">
          <button className="best-menu1"></button>
          <button className="best-menu2"></button>
          <button className="best-menu3"></button>
          <button className="best-menu4"></button>
        </div>
      </div>
      <hr className="line"></hr>
      <Menucategory />
    </>
  );
};

export default orderYoung;

import React, { useState } from "react";
import styled from "styled-components";
import Setmenu from "./Setmenu";
import Sandwich from "./Sandwich";
import Snack from "./Snack";
import Drinks from "./Drinks";
import "./Menucategory.css";

function Menucategory() {
  const menutab = [
    {
      id: 1,
      menuname: "세트메뉴",
    },
    {
      id: 2,
      menuname: "샌드위치",
    },
    {
      id: 3,
      menuname: "과자",
    },
    {
      id: 4,
      menuname: "음료",
    },
  ];

  const [menu, setMenu] = useState(<Setmenu />);

  const onSetmenu = () => {
    setMenu(<Setmenu />);
  };

  const onSandwich = () => {
    setMenu(<Sandwich />);
  };

  const onSnacks = () => {
    setMenu(<Snack />);
  };

  const onDrinks = () => {
    setMenu(<Drinks />);
  };

  return (
    <>
      <button className="btn-setMenu" onClick={onSetmenu}>
        {menutab[0].menuname}
      </button>
      <button className="btn-sandwich" onClick={onSandwich}>
        {menutab[1].menuname}
      </button>
      <button className="btn-snack" onClick={onSnacks}>
        {menutab[2].menuname}
      </button>
      <button className="btn-drinks" onClick={onDrinks}>
        {menutab[3].menuname}
      </button>
      <div className="menuBoard">
        <h3>{menu}</h3>
      </div>
    </>
  );
}

export default Menucategory;

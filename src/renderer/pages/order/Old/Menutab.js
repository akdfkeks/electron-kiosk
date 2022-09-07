import React, { useState } from "react";

function menuCategory() {
  const menutab = [
    {
      id: 1,
      menuname: "추천메뉴",
    },
    {
      id: 2,
      menuname: "샌드위치",
    },
    {
      id: 3,
      menuname: "랩",
    },
    {
      id: 4,
      menuname: "음료",
    },
  ];

  const [menu, setMenu] = useState();

  const onBestmenu = () => {
    setMenu();
  };
  const onSandwich = () => {
    setMenu();
  };
  const onWrap = () => {
    setMenu();
  };
  const onDrinks = () => {
    setMenu();
  };

  return (
    <>
      <div></div>
    </>
  );
}

export default menuCategory;

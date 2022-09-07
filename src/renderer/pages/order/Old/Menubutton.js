import React from "react";

function Menubutton({ color, name }) {
  return <div style={{ color }}>안녕하세용 {name}님.</div>;
}

Menubutton.defaultProps = {
  name: "추천메뉴",
  color: "yellow",
};

export default Menubutton;

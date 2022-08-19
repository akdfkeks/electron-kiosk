import React from "react";
import "./Splash.css";
import { Link } from "react-router-dom";
import logoEX from "./../../../resources/assets/images/logoEX.png";

const Splash = () => {
  return (
    <>
      <Link to="/selector">
        <div className="splashTouch">
          <h3 className="pleaseTouch">[주문하시려면 화면을 터치해주세요]</h3>
          <img className="logo" src={logoEX} alt="logo" />
        </div>
      </Link>
    </>
  );
};

export default Splash;

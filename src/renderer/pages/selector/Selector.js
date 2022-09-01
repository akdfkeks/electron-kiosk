import React from "react";
import "./Selector.css";
import { Link } from "react-router-dom";
import store from "./../../../resources/assets/images/store.png";
import takeout from "./../../../resources/assets/images/takeout.png";

const Selector = () => {
  return (
    <>
      <div className="selector-background">
        <Link to="/splash">
          <img className="store" src={store} alt="store" />
        </Link>
        <Link to="/orderold">
          <img className="take-out1" src={takeout} alt="take-out1" />
        </Link>
        <Link to="/orderyoung">
          <img className="take-out2" src={takeout} alt="take-out2" />
        </Link>
        <Link to="/orderchild">
          <img className="take-out3" src={takeout} alt="take-out3" />
        </Link>
      </div>
    </>
  );
};

export default Selector;

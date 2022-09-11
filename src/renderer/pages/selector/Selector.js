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
        <Link to="/order">
          <img className="take-out" src={takeout} alt="take-out" />
        </Link>
      </div>
    </>
  );
};

export default Selector;

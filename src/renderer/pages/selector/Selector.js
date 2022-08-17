import React from "react";
import "./Selector.css";
import { Link } from "react-router-dom";

const Selector = () => {
  return (
    <>
      <div className="selector-background">
        <Link to="/splash">
          <div className="store">매장</div>
        </Link>
        <Link to="/order">
          <div className="take-out">포장</div>
        </Link>
      </div>
    </>
  );
};

export default Selector;

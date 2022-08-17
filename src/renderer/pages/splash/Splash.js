import React from "react";
import "./Splash.css";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <>
      <Link to="/selector">
        <div className="splashTouch">
          화면을 터치해주세용
          <h3 className="logo">로고다임마</h3>
        </div>
      </Link>
    </>
  );
};

export default Splash;

// splash => selector 로 라우팅시키기. 버튼태그가 아닌 링크..태그로 바꾸거나

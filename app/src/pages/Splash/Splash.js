import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
	const navigate = useNavigate();

	const route = () => {
		let flag = true;
		window.electron.send("detectFace", flag.toString());
		navigate("/selector", {});
		//window.location.hash = "#/selector";
	};

	return (
		<div className="TouchContainer">
			<button className="Touch" onClick={route}>
				아무곳이나 누르세요
			</button>
		</div>
	);
}

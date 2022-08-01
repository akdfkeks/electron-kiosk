import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
	const navigate = useNavigate();

	const route = () => {
		navigate("/selector", {});
		window.electron.send("detectFace", true);
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

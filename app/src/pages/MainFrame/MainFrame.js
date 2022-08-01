import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainFrame() {
	const navigate = useNavigate();

	return (
		<div>
			<header>MainFrame</header>
			<Outlet />
		</div>
	);
}

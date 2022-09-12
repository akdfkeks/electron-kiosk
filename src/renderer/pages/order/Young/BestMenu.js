import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import "./BestMenu.css";
// import rotiesserie from "./rotiesserie.png";
// import mushroom from "./mushroom.png";

const BestMenu = () => {
	const images = useRef([{ src: 5 }, { src: "image link" }, { src: "" }]);

	const [current, setCurrent] = useState(0);
	const [style, setStyle] = useState({
		marginLeft: `-${current}00%`,
	});
	const imgSize = useRef(images.current.length);

	const moveSlide = (i) => {
		let nextIndex = current + i;

		if (nextIndex < 0) nextIndex = imgSize.current - 1;
		else if (nextIndex >= imgSize.current) nextIndex = 0;

		setCurrent(nextIndex);
	};

	useEffect(() => {
		setStyle({ marginLeft: `-${current}00%` });
	}, [current]);

	return (
		<div className="container">
			<div className="slide">
				<div
					className="btn"
					onClick={() => {
						moveSlide(-1);
					}}
				>
					&lt;
				</div>
				<div className="window">
					<div className="flexbox" style={style}>
						{images.current.map((img, i) => (
							<div
								key={i}
								className="img"
								style={{ backgroundImage: `url(${img.src})` }}
							></div>
						))}
					</div>
				</div>
				<div
					className="btn"
					onClick={() => {
						moveSlide(1);
					}}
				>
					&gt;
				</div>
			</div>
			<div className="position">
				{images.current.map((x, i) => (
					<div key={i} className={i === current ? "dot current" : "dot"}></div>
				))}
			</div>
		</div>
	);
};

export default BestMenu;

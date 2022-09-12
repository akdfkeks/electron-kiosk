import React, { useRef, useState, useEffect } from "react";
import MenuContainer from "./MenuContainer.js";
import "../Young/BestMenu.css";

export default function MenuRecommender() {
	const arr = [
		{ id: 1, name: "Menu 1", price: 1000, cal: 1000 },
		{ id: 2, name: "Menu 2", price: 2000, cal: 2000 },
		{ id: 3, name: "Menu 3", price: 3000, cal: 3000 },
		{ id: 4, name: "Menu 4", price: 4000, cal: 4000 },
		{ id: 5, name: "Menu 5", price: 5000, cal: 5000 },
		{ id: 6, name: "Menu 6", price: 6000, cal: 6000 },
		{ id: 7, name: "Menu 7", price: 7000, cal: 7000 },
	];
	let remodel = [];
	for (let i = 0; i < arr.length; i += 2) {
		remodel.push(<MenuContainer className="MenuContainer" menus={arr.slice(i, i + 2)} />);
		//console.log(arr.slice(i, i + 2));
	}
	// 위에 음식 데이터를 2개씩 짝지어서 새로운 배열을 만듬
	// remodel = [[1, 2], [3,4] ...  ]

	const menuList = useRef(remodel);

	const [current, setCurrent] = useState(0);
	const [style, setStyle] = useState({
		marginLeft: `-${current}00%`,
	});
	const menuContainerSize = useRef(menuList.current.length);

	const moveSlide = (i) => {
		let nextIndex = current + i;

		if (nextIndex < 0) nextIndex = menuContainerSize.current - 1;
		else if (nextIndex >= menuContainerSize.current) nextIndex = 0;

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
						{menuList.current.map((container, i) => (
							<div key={i} className="img">
								{container}
							</div>
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
				{menuList.current.map((x, i) => (
					<div key={i} className={i === current ? "dot current" : "dot"}></div>
				))}
			</div>
		</div>
	);
}

/*
최종 반환 형태 : MenuContainer Component 의 배열
MenuContainer : Menu Component 2개로 이루어진 Container Component
그리고, MenuContainer 에 데이터를 두개씩 전달해줄 무언가..


넘기는거 -> 캐러셀 만드는데 하나의 탭 안에 메뉴 두개가 보여야 하는 상황.
점 생기는 기준이 메뉴 갯수였잖아 -> 이거를 이제 2개씩 묶은 컨테이너 기준으로 변경을 해야됨.
묶는 컨테이너 개념이 필요해짐.
*/

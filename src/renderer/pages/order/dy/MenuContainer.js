import Menu from "./Menu.js";

export default function MenuContainer(props) {
	const data = props.menus.map((menu) => (
		<Menu name={menu.name} price={menu.price} cal={menu.cal} />
	));
	console.log(data);
	// ->  얘의 결과는?
	//  [ <Menu />, <Menu /> ]
	return <div>{data}</div>;
}

/*
props 통해서 메뉴 데이터를 두개씩 공급받아


ex) [{name : "Menu", price : 5000, cal : 4000},{name : "Menu", price : 5000, cal : 4000}]
이런식의 데이터가 들어옴.


*/

// 배열 = [men1, men2, men3]
// 배열.map((menu) => menu == 배열[i])

// for(let i = 0; i < 배열.length; i++) {
// 	배열[i] 데이터에 접근할수 있지.
// }
// 배열[0]
// 배열[1]
// 배열[2]

import React from "react";
import MenuRecommender from "../dy/MenuRecommander";
import BestMenu from "./BestMenu";
import Menucategory from "./Menucategory";

function orderYoung() {
	return (
		<>
			{/* <Header />
    추천메뉴 */}
			{/* <BestMenu /> */}
			<MenuRecommender />
			<Menucategory />

			{/* <Footer />
    장바구니에 담길 메뉴 몇가지 + 결제하기 버튼 + */}
		</>
	);
}

export default orderYoung;

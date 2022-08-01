import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

class Splash extends Component {
	constructor(props) {
		super(props);
	}

	route() {
		window.location.hash = "#/selector";
	}

	render() {
		return (
			<div>
				<button className="Touch" onClick={this.route}>
					아무곳이나 누르세요
				</button>
			</div>
		);
	}
}

export default function (props) {
	return <Splash />;
}

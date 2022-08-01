import React, { Component } from "react";
import "./Temp.css";

export default class Temp extends Component {
	constructor(props) {
		super(props);
		this.channel = "createCamWindow";
		this.state = {
			data: null,
		};
	}
	camWindow = () => {
		window.electron.send(this.channel, "Start face extract");
	};

	render = () => {
		(function () {
			window.electron.receive("detectedScore", (score) => this.setState({ data: score }));
		})();
		return (
			<div className="TempContainer">
				<div className="CamButtonContainer">
					<button className="CamButton" onClick={this.camWindow}>
						🔎 Create Face Extractor 🔍 <br />
						<hr />
						Click!
					</button>
				</div>
				<div className="ResponseContainer">
					<h1 className="ResponseText">{this.state.data}</h1>
				</div>
			</div>
		);
	};
}

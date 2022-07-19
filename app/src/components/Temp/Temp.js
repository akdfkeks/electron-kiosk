import React, { Component } from "react";
import "./Temp.css";

export default class Temp extends Component {
	constructor(props) {
		super(props);
		this.channel = "createCamWindow";
		this.state = {
			ipcResponseText: "asdf",
		};
	}
	camWindow = () => {
		window.electron.send(this.channel, "Start face extract");
	};

	render = () => {
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
					<h1 className="ResponseText">{this.state.ipcResponseText}</h1>
				</div>
			</div>
		);
	};
}

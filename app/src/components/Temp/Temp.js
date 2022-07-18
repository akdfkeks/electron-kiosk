import React, { Component } from "react";

export default class Temp extends Component {
	constructor(props) {
		super(props);
		this.channel = "CAM_WINDOW_CTL";
		this.state = {
			ipcResponseText: "asdf",
		};
	}
	camWindow = () => {
		window.api.send(this.channel, "Message from renderer to Main");
	};

	render = () => {
		return (
			<div className="CamContainer">
				<div className="">
					<button className="CamWindowButton" onClick={this.camWindow}>
						Send message to Main Process
					</button>
				</div>
				<div className="ResponseText">
					<h1>{this.state.ipcResponseText}</h1>
				</div>
			</div>
		);
	};
}

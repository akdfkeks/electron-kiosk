import React, { Component } from "react";
import "./Detector.css";

export default class Detector extends Component {
	componentDidMount() {
		try {
			window.preload.init().then(() => {});
		} catch (e) {
			console.log(e);
		}
	}
	render() {
		return (
			<div className="WorkerContainer">
				<div className="VideoContainer">
					<video id="videowithcam" autoPlay muted></video>
					<canvas id="overlay"></canvas>
				</div>
			</div>
		);
	}
}

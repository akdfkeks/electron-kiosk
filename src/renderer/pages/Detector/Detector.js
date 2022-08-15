import React from "react";
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
				<div class="VideoContainer">
					<video id="videowithcam" autoplay muted></video>
					<canvas id="overlay"></canvas>
				</div>
			</div>
		);
	}
}

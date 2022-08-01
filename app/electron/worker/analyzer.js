const tf = require("@tensorflow/tfjs-node");

export default function getResult(data) {
	// 1. h5 파일을 tensorflow.js 모델 파일로 변환 후 import
	// 2. import 한 모델에 data array 요소 {score:Number, image:HTMLImageElement} 전달
	// 3. 결과값 반환받은 후 평균 계산
	// 4. 반환
}

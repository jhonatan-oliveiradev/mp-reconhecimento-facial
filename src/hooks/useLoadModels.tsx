import { useEffect } from "react";
import * as faceapi from "face-api.js";

export default function useLoadModels() {
	useEffect(() => {
		Promise.all([
			faceapi.loadTinyFaceDetectorModel("/models"),
			faceapi.loadFaceLandmarkModel("/models"),
			faceapi.loadFaceExpressionModel("/models")
		]).then(() => {
			console.log("Models loaded");
		});
	}, []);
}

import { useRef, useState } from "react";
import Header from "./components/Header";
import * as faceapi from "face-api.js";
import useLoadModels from "./hooks/useLoadModels";
import WebcamCard from "./components/WebcamCard";
import ResultCard from "./components/ResultCard";

function App() {
	const [expression, setExpression] = useState("");
	const [loading, setLoading] = useState(true);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLoadModels();
	async function handleLoadedMetadata() {
		const videoEl = videoRef.current as HTMLVideoElement;
		const canvasEl = canvasRef.current as HTMLCanvasElement;
		if (!videoEl || !canvasEl) return;

		const detection = await faceapi
			.detectSingleFace(
				videoEl as HTMLVideoElement,
				new faceapi.TinyFaceDetectorOptions()
			)
			.withFaceLandmarks()
			.withFaceExpressions();

		if (detection) {
			const dominantExpression = detection.expressions.asSortedArray()[0];
			setExpression(dominantExpression.expression);

			const dimensions = {
				width: videoEl.offsetWidth,
				height: videoEl.offsetHeight
			};

			faceapi.matchDimensions(canvasEl, dimensions);
			const resizedResults = faceapi.resizeResults(detection, dimensions);
			faceapi.draw.drawDetections(canvasEl, resizedResults);
			faceapi.draw.drawFaceLandmarks(canvasEl, resizedResults);
			faceapi.draw.drawFaceExpressions(canvasEl, resizedResults);

			setLoading(false);
		}

		setTimeout(handleLoadedMetadata, 1000);
	}

	return (
		<main className="container flex flex-col items-center min-h-screen p-10 mx-auto lg:flex-row md:justify-between gap-14 xl:gap-40">
			<Header />
			<section className="flex flex-col flex-1 w-full gap-6">
				<WebcamCard
					videoRef={videoRef}
					canvasRef={canvasRef}
					handleLoadedMetadata={handleLoadedMetadata}
				/>
				<ResultCard expression={expression} loading={loading} />
			</section>
		</main>
	);
}

export default App;

import useWebcam from "../hooks/useWebcam";

export default function WebcamCard({
	videoRef,
	canvasRef,
	handleLoadedMetadata
}: {
	videoRef: React.RefObject<HTMLVideoElement>;
	canvasRef: React.RefObject<HTMLCanvasElement>;
	handleLoadedMetadata: () => void;
}) {
	useWebcam(videoRef);

	return (
		<div className="p-2 bg-white rounded-xl">
			<div className="relative flex items-center justify-center w-full aspect-video">
				<div className="w-full bg-gray-300 rounded-lg aspect-video">
					<div className="relative flex items-center justify-center w-full aspect-video">
						<video
							onLoadedMetadata={handleLoadedMetadata}
							autoPlay
							ref={videoRef}
							className="rounded aspect-video"
						></video>
						<canvas
							ref={canvasRef}
							className="absolute inset-0 w-full h-full"
						></canvas>
					</div>
				</div>
			</div>
		</div>
	);
}

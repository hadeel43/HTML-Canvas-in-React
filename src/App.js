import "./App.css";
import React, {useEffect, useState, useRef} from "react";

function App() {
	const canvasRef = useRef(null);
	const linkRef = useRef(null);
	const [imageUrl, setImageURL] = useState(null);
	const api = "https://api.imgflip.com/get_memes";

	useEffect(() => {
		const fetchData = async () => {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");
			try {
				const response = await fetch(api);
				const json = await response.json();
				json.data.memes.slice(0, 10).map((image, index) => {
					var imageObj = new Image();
					imageObj.src = image.url;
					imageObj.crossOrigin = "*";
					imageObj.onload = function () {
						context.drawImage(imageObj, 200 * index, 0, 200, 200);
						setImageURL(canvas.toDataURL("image/png"));
					};
					return imageObj;
				});
			} catch (error) {
				console.log("error", error);
			}
		};
		fetchData();
	}, []);
	const DownloadCanvas = () => {
		const canvas = canvasRef.current;
		if (canvas) {
			linkRef.current.download = "canvas.png";
			linkRef.current.href = imageUrl;
			linkRef.current.click();
		}
	};
	return (
		<div className="container">
			<canvas
				className="canvas"
				width={1920}
				height={1080}
				ref={canvasRef}
			></canvas>
			<a className="hidden" ref={linkRef} href="/">
				test
			</a>
			<button onClick={DownloadCanvas}>Download</button>
		</div>
	);
}

export default App;

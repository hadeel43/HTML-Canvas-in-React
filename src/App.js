import "./App.css";
import React, {useEffect, useState, useRef} from "react";

function App() {
	const [memes, setMemes] = useState([]);
	const canvasRef = useRef(null);
	const ref = useRef(null);
	useEffect(() => {
		const canvas = canvasRef.current;

		const context = canvas.getContext("2d");
		const api = "https://api.imgflip.com/get_memes";
		const fetchData = async () => {
			try {
				const response = await fetch(api);
				const json = await response.json();

				setMemes(json.data.memes);
				json.data.memes.map((image) => {
					var imageObj = new Image();
					imageObj.src = image.url;
					imageObj.onload = function () {
						context.drawImage(imageObj, 15, 20);
					};
					return imageObj;
				});
				// console.log(typeof ref);
				// context.drawImage(ref, 0, 0);
			} catch (error) {
				console.log("error", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="container">
			<canvas
				className="canvas"
				width={1920}
				height={1080}
				ref={canvasRef}
			></canvas>
			{memes.map((image) => (
				<img
					key={image.id}
					ref={ref}
					alt=""
					src={image.url}
					className="hidden"
				/>
			))}
		</div>
	);
}

export default App;

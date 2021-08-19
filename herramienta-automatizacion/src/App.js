import './App.css';
import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ImagesUploader from './components/ImagesUploader';
import HtmlParser from './components/HtmlParser';


const App = () => {

	const [imagesUploader, setImagesUploader] = useState(false)
	const [htmlParser, setHtmlParser] = useState(false)

	return (
		<div className="App">
			<div className="buttons">
				<button onClick={
					() => {
						setHtmlParser(false)
						setImagesUploader(true)
					}
				}>Upload Images</button>
				<button onClick={
					() => {
						setHtmlParser(true)
						setImagesUploader(false)
					}
				}>Extract HTML</button>
			</div>
			<div className="main">
				{imagesUploader && <ImagesUploader/>}
				{htmlParser  && <HtmlParser/>}
			</div>
		</div>
	);

	
}

export default App;
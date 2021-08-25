import './App.css';
import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ImagesUploader from './components/ImagesUploader/ImagesUploader';
import HtmlParser from './components/HtmlParser/HtmlParser';


const App = () => {

	const [imagesUploader, setImagesUploader] = useState(false)
	const [htmlParser, setHtmlParser] = useState(false)

	return (
		<div className="App">
			<div className="nav">
				<div className="elem" onClick={
					() => {
						setHtmlParser(false)
						setImagesUploader(true)
					}
				}>Upload Images</div>
				<div className="elem" onClick={
					() => {
						setHtmlParser(true)
						setImagesUploader(false)
					}
				}>Extract HTML</div>
			</div>
			<div className="main">
				{imagesUploader && <ImagesUploader/>}
				{htmlParser     && <HtmlParser/>}
			</div>
		</div>
	);

	
}

export default App;
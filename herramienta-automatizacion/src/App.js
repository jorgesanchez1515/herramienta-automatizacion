import React, { useState } from 'react'

// Styles
import './App.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import ImagesUploader from './pages/UploadImagesFirebase/ImagesUploader'
import HtmlParser from './pages/GoogleFromExtract/HtmlParser'

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
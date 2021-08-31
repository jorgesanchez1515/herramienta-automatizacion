import React from 'react'
import { Tab } from 'semantic-ui-react'

// Styles
import './App.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import ImagesUploader from './pages/UploadImagesFirebase/ImagesUploader'
import HtmlParser from './pages/GoogleFromExtract/HtmlParser'

const App = () => {

	const panes = [
		{
			menuItem: 'Upload images',
			render: () => <ImagesUploader/>
		},
		{
			menuItem: 'Extract html',
			render: () => <HtmlParser/>
		}
	]

	const style = {
		padding: "15px",
	}

	const menu = {
		inverted: true,
		secondary: true,
		pointing: true,
		color: "orange",
	}

	return (
		<div className="App">
			<Tab style={style} menu={menu} panes={panes} />
		</div>
	);

	
}

export default App;
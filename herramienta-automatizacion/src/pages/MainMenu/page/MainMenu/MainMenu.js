import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'

// Styles
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import ImagesUploader from '../../../UploadImagesFirebase/ImagesUploader'
import HtmlParser from '../../../GoogleFromExtract/HtmlParser'
import { auth } from '../../../utils/Firebase'

const MainMenu = () => {

	const panes = [
		{
			menuItem: 'Upload images',
			render: () => <ImagesUploader/>
		},
		{
			menuItem: 'Extract html',
			render: () => <HtmlParser/>
		},
		{
			menuItem: 'Logout',
			render: () => <div onLoad={auth.signOut()}></div>
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
		<Tab style={style} menu={menu} panes={panes}/>
	)
}

export default MainMenu
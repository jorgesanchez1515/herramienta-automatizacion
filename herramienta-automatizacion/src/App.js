import React, { useState } from 'react'

// Styles
import './App.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import MainMenu from './pages/MainMenu/page/MainMenu'
import Auth from './pages/Auth/page/Auth/Auth'
import { auth } from './pages/utils/Firebase'

const App = () => {

	const [user, setUser] = useState(null)

	auth.onAuthStateChanged(user => setUser(user))

	return (
		<div className="App">
			{user ? <MainMenu/> : <Auth/>}
		</div>
	)
}

export default App
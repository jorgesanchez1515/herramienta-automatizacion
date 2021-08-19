const { Router } = require('express')
const { v4 }     = require('uuid')
const fetch      = require('node-fetch')

const router  = Router()
const { storage, db } = require("../firebase/index")


router.post('/postImage', async (req, res) => {
	try {
		const image = req.files.image 
		const ref   = req.headers.ref || "noReference/"
		const id    = v4()

		const uploadTask = await storage.ref(ref + id).put(image.data, {contentType: image.mimetype})
		
		const imageURL   = await storage.ref(ref + id).getDownloadURL()

		return res.status(200).json(imageURL)
	}
	catch(error) {
		console.log(error)
		return res.status(500).json({error})
	}
})

router.get('/getHtml', async (req, res) => {
	try {
		const url  = req.headers.url
		const resp = await fetch(url)
		const data = await resp.text()

		return res.status(200).json(data)
	}
	catch(error) {
		console.log(error)
		return res.status(500).json({error})
	}
})


module.exports = router
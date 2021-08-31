import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { List, Button, Grid } from "semantic-ui-react"
import { chunk } from 'lodash';

// Styles
import './ImagesUploader.scss'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import ImageCard  from '../ImageCard/ImageCard'
import MyDropzone from '../MyDropzone/MyDropzone'
import MyProgressBar from '../MyProgressBar/MyProgressBar'
import LoaderAnimation from '../LoaderAnimation/LoaderAnimation'

toast.configure()

const HOST =  process.env.HOST || "http://localhost:8080"

const ImagesUploader = () => {
	
	const [images, setImages]       = useState([])
	const [urls,   setUrls]         = useState([])
	const [progress, setProgress]   = useState(0)
	const [searching, setSearching] = useState(false)

	let uploadedImages = 0

	const uploadImages = () => {
		uploadedImages = 0
		setSearching(true)

		const ref = document.getElementById("reference").value

		const promises = images.map(image => postImage(image, ref))

		Promise.all(promises)
		.then(() => {
			setUrls(images.map(elem => elem.url))
			setImages([])
			setSearching(false)
			setProgress(0)
			toast.info("Files uploaded")
		})
		.catch(err => toast.error(err))
	}


	const postImage = async (image, ref) => {
		
		const data = new FormData()
		data.append('image', image)

		const response = await fetch(HOST + "/postImage", {
			headers: {ref},
			method: "POST",
			body: data
		})

		image.url = await response.json()
		setProgress(100 * ++uploadedImages / images.length)
	}
	

	const deleteImage = (image_id) => {
		setImages(images.filter(elem => elem.id !== image_id))
	}


	const copyToClipboard = () => {
		const arr = []
		
		urls.forEach(elem => {
			arr.push('<div>\n')
			arr.push('\t<img src={"' + elem + '"} alt="boohoo" className="img-responsive"/>\n')
			arr.push('\t<br/>\n')
			arr.push('</div>\n')
		})
		
		navigator.clipboard.writeText(arr.join(''));
		toast.info("Copied html");
	}


	return (
		<div className="ImagesUploader">
			
			<div className="dataInput">
				<MyDropzone setImages={setImages}/>
			</div>


			<input id="reference" type="text" placeholder="reference" className="dataInput"/>


			{images.length !== 0 &&
				<div className="buttons">
					<Button inverted color="orange" onClick={() => uploadImages()}>Upload</Button>
					<Button color="red" onClick={() => setImages([])}>Delete images</Button>
				</div>
			}


			{images.length === 0 && urls.length !== 0 && 
				<Button 
					color="orange" inverted
						
					style={{
						width: "200px",
						transform: 'translate(0px, 50px)',
					}} 
					
					onClick={() => copyToClipboard()}>
						
					Copy html
				</Button>
			}


			<div className="imagesOutput">
				<Grid columns={5}>
					<Grid.Row> {searching &&  <LoaderAnimation/>} </Grid.Row>
					<Grid.Row> {searching && <MyProgressBar progress={progress}/>} </Grid.Row> 

					{chunk(images, 5).map(row => 
						<Grid.Row>
							{row.map(image => 
								<Grid.Column> <ImageCard image={image} deleteImage={deleteImage}/> </Grid.Column>
							)}
						</Grid.Row>
					)}
				</Grid>
			</div>


			<div className="htmlOutput">
				{images.length === 0 && urls.map(elem => 
					<div>
						<pre className="textLine">{'<div>'}</pre>
						<pre className="textLine">{'\t<img src={"' + elem + '"} alt="boohoo" className="img-responsive"/>'}</pre>
						<pre className="textLine">{'\t<br/>'}</pre>
						<pre className="textLine">{'</div>'}</pre>
					</div>
				)}
			</div>
			

		</div>
	);

	
}

export default ImagesUploader;
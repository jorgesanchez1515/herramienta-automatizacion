import './ImagesUploader.css'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { List, Button, Grid } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import ImageCard  from '../ImageCard/ImageCard'
import MyDropzone from '../MyDropzone/MyDropzone'
import { chunk } from 'lodash';

toast.configure()

const HOST =  process.env.HOST || "http://localhost:8080"

const ImagesUploader = () => {
	const [images, setImages] = useState([])
	const [urls,   setUrls]   = useState([])

	const postImage = async (image, ref) => {
		
		const data = new FormData()
		data.append('image', image)

		const response = await fetch(HOST + "/postImage", {
			headers: {ref},
			method: "POST",
			body: data
		})

		image.url = await response.json()
		console.log(image.url)
	}

	const uploadImages = () => {
		const ref = document.getElementById("reference").value

		const promises = images.map(image => postImage(image, ref))

		Promise.all(promises)
		.then(() => {
			setUrls(images.map(elem => elem.url))
			setImages([])
			toast.info("Files uploaded")
		})
		.catch(err => toast.error(err))
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

			<div className="buttons">
				<Button inverted color="orange" onClick={() => uploadImages()}>Upload</Button>
				<Button color="red" onClick={() => setImages([])}>Delete images</Button>
			</div>

			<div className="dataOutput">
				<Grid columns={5}>
					{chunk(images, 5).map(row => 
						<Grid.Row>
							{row.map(image => 
								<Grid.Column>
									<ImageCard image={image} deleteImage={deleteImage}/>
								</Grid.Column>
							)}
						</Grid.Row>
					)}
				</Grid>

				<List className="myList">
					<List.Item>
						{images.length === 0 && urls.length !== 0 && <Button className="center" onClick={() => copyToClipboard()}>Copy html</Button>}
					</List.Item>

					{images.length === 0 && urls.map(elem => 
						<List.Item>
							<pre className="textLine">{'<div>'}</pre>
							<pre className="textLine">{'\t<img src={"' + elem + '"} alt="boohoo" className="img-responsive"/>'}</pre>
							<pre className="textLine">{'\t<br/>'}</pre>
							<pre className="textLine">{'</div>'}</pre>
						</List.Item>
					)}
				</List>

			</div>
		</div>
	);

	
}

export default ImagesUploader;

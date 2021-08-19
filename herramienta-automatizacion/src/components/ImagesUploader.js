import './ImagesUploader.css';
import React, { useState } from 'react';
import MyDropzone from './MyDropzone';
import { toast } from 'react-toastify'
import { List, Button, Grid } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ImageCard from './ImageCard';
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

				{urls.map(elem => 
					<List>
						<List.Item>{'<div>'}</List.Item>
						<List.Item><pre className="noMargin">{'\t<img src={"' + elem + '"} alt="boohoo" className="img-responsive"/>'}</pre></List.Item>
						<List.Item><pre>{'\t<br/>'}</pre></List.Item>
						<List.Item>{'</div>'}</List.Item>
					</List>
				)}
			</div>
		</div>
	);

	
}

export default ImagesUploader;
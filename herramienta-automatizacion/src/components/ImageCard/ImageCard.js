import React from 'react';
import "./ImageCard.css"

const ImageCard = (props) => {

	const { image, deleteImage } = props

	return(
		<div className="card">
			<img 
				className="cardImage" 
				src={image.preview}
				alt="Image not found"
			/>
			<button 
				className="cardButton" 
				onClick={
					() => deleteImage(image.id)
				}
			>Delete</button>
		</div>
	)

}

export default ImageCard
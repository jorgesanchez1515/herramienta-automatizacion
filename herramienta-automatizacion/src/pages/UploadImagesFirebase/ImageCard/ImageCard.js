import React from 'react'

// Styles
import "./ImageCard.scss"

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
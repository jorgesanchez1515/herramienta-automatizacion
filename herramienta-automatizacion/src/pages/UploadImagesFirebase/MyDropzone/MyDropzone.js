import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'

// Styles
import './MyDropzone.scss'
import 'semantic-ui-css/semantic.min.css'

const MyDropzone = (props) => {
	
	const setImages = props.setImages

	const onDrop = useCallback(acceptedFiles => {
		
		acceptedFiles.forEach((file) => {
			file["id"] = uuidv4()
			file["preview"] = URL.createObjectURL(file)
			file["url"] = ""
		})

		acceptedFiles.sort((a, b) => (parseInt(a.name.split("-")[1].split(".")[0]) > parseInt(b.name.split("-")[1].split(".")[0]))? 1 : -1)

		setImages(acceptedFiles)

	}, [])
	  
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) 

	
	return (
		<div className="dropzone" {...getRootProps()}>
		  	<input {...getInputProps()}/>
		  	{
				isDragActive?  
					<p>Drop the files here...</p>  
				:
					<p>Drag and drop some files here, or click to select files</p>
		  	}
		</div>
	)
}

export default MyDropzone
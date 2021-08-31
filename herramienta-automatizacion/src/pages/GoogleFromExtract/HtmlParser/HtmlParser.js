import React, { useState } from 'react';
import { Input, Button, List } from "semantic-ui-react";
import { toast } from 'react-toastify'

// Styles
import './HtmlParser.scss';
import 'semantic-ui-css/semantic.min.css';

toast.configure()

const HOST =  process.env.HOST || "http://localhost:8080"

const HtmlParser = () => {

	const [html, setHTML] = useState("")
	const [url,  setUrl]  = useState("")

	const getHTML = async () => {
		try {
			setHTML("")
			setUrl("")

			// Asks the API REST for the HTML of the google form
			// whose url has been introduced in the input text
			// The url is send in the headers
		
			const myUrl = document.getElementById("input").value

			const resp = await fetch(HOST + "/getHtml", {headers: {url: myUrl}})
			const data = await resp.json()

			if(resp.status === 500) 
				throw {message: "Internal server error"}
			

			const publicLoadData = getPublicLoadData(data)
			
			let description = publicLoadData[0]
			let questions   = publicLoadData[1]
			let title       = publicLoadData[8]

			questions = questions.map(quest => {
				return {
					label:   quest[0],
					legend:  quest[1],
					type:    getType(quest[3]),
					entry:   quest[4][0][0],
					options: quest[4][0][1]
				}
			})

			setUrl(myUrl)
			convertHTML({title, description, questions})
		}	
		catch(e) {
			toast.info("ERROR: " + (e.message || "something went wrong..."))
		}
	}

	const getPublicLoadData = (str) => {
		try {
			const data = str.split('var FB_PUBLIC_LOAD_DATA_ = ')[1].split(';')[0]	
			return JSON.parse(data)[1]
		}
		catch(e) {
			throw {message: "something happened while getting public load data"}
		}
	}

	const getType = (num) => {
		switch(num) {
			case 0:
				return "text"
			case 1:
				return "paragraph"
			case 2:
				return "radio"
			case 3:
				return "dropdown"
			case 4:
				return "checkbox"
			default:
				return "ERROR_TYPE"
		}
	}

	const convertHTML = (obj) => {
		let html = "" 

		html += '<form  onChange={onChange} className="trabajo-l1" id="l1-course-form">\n'


		// Title

		html += '\t<fieldset>\n'
		html += '\t\t<div>\n'
		html += '\t\t\t<h2 className="L1">' + obj.title + '</h2>\n'
		html += '\t\t</div>\n' 
		html += '\t</fieldset>\n'


		// Description

		html += '\t<fieldset>\n'
		html += '\t\t<div className="parrafo-uno">\n'
		html += '\t\t\t<p>' + obj.description + '</p>\n'
		html += '\t\t</div>\n'
		html += '\t</fieldset>\n'
		

		// email

		html += '\t<fieldset>\n'
        html += '\t\t<legend for="" className="leyenda">Email</legend>\n'
		html += '\t\t<div class="form-group">\n'
		html += '\t\t\t<input id="emailAddress" type="email" name="emailAddress" class="form-control" required/>\n'
		html += '\t\t</div>\n'
		html += '\t</fieldset>\n'


		// Questions
		let num = 1

		obj.questions.forEach(elem => {
			
			html += '\t<fieldset>\n'
			html += '\t\t<legend for="' + elem.label + '" className="leyenda">' + num++ + '. ' + elem.legend + '</legend>\n'
			html += '\t\t<div class="form-group">\n'


			// Radio inputs
			if(elem.type === "radio") {
				elem.options.forEach(opt => {
					const optValue = (opt[0] !== "" ? opt[0] : "__other_option__")

					html += '\t\t\t<div class="radio">\n'
					html += '\t\t\t\t<label className="etiqueta">\n' 
					html += '\t\t\t\t\t<input type="radio" name="entry.' + elem.entry + '" value="' + optValue + '" required/>\n'
					html += '\t\t\t\t\t' + opt[0] + '\n'
					html += '\t\t\t\t</label>\n' 
	
					if(opt[0] === "")
						html += '\t\t\t\t<input type="text" name="entry.' + elem.entry + '.other_option_response" placeholder="Other">\n' 
	
					html += '\t\t\t</div>\n'
				})
			}


			// Checkbox inputs
			if(elem.type === "checkbox") {
				elem.options.forEach(opt => {
					const optValue = (opt[0] !== "" ? opt[0] : "__other_option__")
	
					html += '\t\t\t<div class="checkbox">\n'
					html += '\t\t\t\t<label className="etiqueta">\n' 
					html += '\t\t\t\t\t<input type="checkbox" name="entry.' + elem.entry + '" value="' + optValue + '"/>\n'
					html += '\t\t\t\t\t' + opt[0] + '\n'
					html += '\t\t\t\t</label>\n' 
	
					if(opt[0] === "")
						html += '\t\t\t\t<input type="text" name="entry.' + elem.entry + '.other_option_response" placeholder="Other">\n' 

					html += '\t\t\t</div>\n'
				})
			}


			// Dropdown inputs
			if(elem.type === "dropdown") {
				html += '\t\t\t<select name="entry.' + elem.entry + '">\n'
				html += '\t\t\t\t<option disabled hidden selected>Choose an option</option>\n'
				
				elem.options.forEach(opt => {
					html += '\t\t\t\t<option value="' + opt[0] + '" required/>\n'
					html += '\t\t\t\t\t' + opt[0] + '\n'
					html += '\t\t\t\t</option>\n'
				})
	
				html += '\t\t\t</select>\n'
			}


			// Text inputs
			if(elem.type === "text" || elem.type === "paragraph") 
				html += '\t\t\t<input name="entry.' + elem.entry + '" type="text" class="' + elem.type + '"/>\n'


			html += '\t\t</div>\n'
			html += '\t</fieldset>\n'
		})

		html += '\t<input type="hidden" name="fvv" value="1"/>\n'
		html += '\t<input type="hidden" name="fbzx" value="8461977738504272510"/>\n'
		html += '\t<input type="hidden" name="pageHistory" value="0"/>\n'
		html += '\t<div class="center">\n'
		html += '\t\t<Button className="btn-primary-uno" onClick={onSubmit} isLoading={isLoading}>Send</Button>\n'
		html += '\t</div>\n'
		html += '</form>\n'

		setHTML(html)
	}

	const createUrl = (myUrl) => {
		const arr = myUrl.split("/")
		arr[arr.length - 1] = "formResponse"
		return arr.join("/")
	}

	const copyToClipboard = () => {
		navigator.clipboard.writeText(html);
		toast.info("Copied html");
	}

	return (
		<div className="center">
			<div>
				<Button inverted color="orange" onClick={() => getHTML()}>Search</Button>
				<Input id="input" placeholder="url here" icon="search"></Input>
			</div>

			<div className="center">
				<List>
					<List.Item>
						{url && <div className="textLine">{createUrl(url)}<br/><br/><br/></div>}
					</List.Item>

					<List.Item>
						{html && <Button className="center" onClick={() => copyToClipboard()}>Copy html</Button>}
					</List.Item>

					{html.split("\n").map(elem => 
						<List.Item><pre className="textLine">{elem}</pre></List.Item>
					)}
				</List>
			</div>
		</div>
	);
}

export default HtmlParser;

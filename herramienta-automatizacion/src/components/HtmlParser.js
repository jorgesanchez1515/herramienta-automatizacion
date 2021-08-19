import './HtmlParser.css';
import { Input, Button, List } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify'

toast.configure()

const HOST =  process.env.HOST || "http://localhost:8080"

const HtmlParser = () => {

	const [text, setText] = useState("")
	const [html, setHTML] = useState("")

	const getHTML = async () => {	
		// Asks the API REST for the HTML of the google form
		// whose url has been introduced in the input text
		// The url is send in the headers
	
		const url = document.getElementById("input").value
		
		const resp = await fetch(HOST + "/getHtml", {headers: {url}})
		const data = await resp.json()

		setText(data)
		toast.info("Html downloaded")
	}

	const parse = () => {

		const [head, body] = text.split('class="freebirdFormviewerViewItemList"')

		let title = head.split('class="freebirdFormviewerViewHeaderTitle exportFormTitle freebirdCustomFont"')[1]
		title = getValue(title)

		let desctipton = head.split('class="freebirdFormviewerViewHeaderDescription"')[1]
		desctipton = getValue(desctipton)

		let questions  = body.split('class="freebirdFormviewerViewNumberedItemContainer"')
		questions.shift()

		questions = questions.map(elem => {

			let question = elem.split('class="freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont"')[1]
			question = getValue(question)

			let type    = getType(elem)
			let options = []

			if(type.optionsClassName !== "") {
				options = elem.split(type.optionsClassName)
				options.shift()
				options = options.map(elem => getValue(elem))
			}

			return {question, type: type.name, options}
		})

		console.log({title, desctipton, questions})
		convertHTML({title, desctipton, questions})
	}

	const getType = (question) => {
		if(question.includes('class="freebirdFormviewerComponentsQuestionCheckboxRoot"'))
			return {name: "checkbox", optionsClassName: "docssharedWizToggleLabeledLabelText exportLabel freebirdFormviewerComponentsQuestionCheckboxLabel"}
		else if(question.includes('class="freebirdFormviewerComponentsQuestionRadioRoot"'))
			return {name: "radio", optionsClassName: "docssharedWizToggleLabeledLabelText exportLabel freebirdFormviewerComponentsQuestionRadioLabel"}
		else if(question.includes('class="freebirdFormviewerComponentsQuestionSelectRoot"'))
			return {name: "dropdown", optionsClassName: "quantumWizMenuPaperselectContent exportContent"}
		else if(question.includes('class="quantumWizTextinputPaperinputEl freebirdFormviewerComponentsQuestionTextShort'))
			return {name: "text", optionsClassName: ""}		
		else if(question.includes('class="quantumWizTextinputPapertextareaEl modeLight freebirdFormviewerComponentsQuestionTextLong'))
			return {name: "paragraph", optionsClassName: ""}
		else
			return {name: "ERROR_TYPE", optionsClassName: ""}
	}

	const getValue = (str) => {
		// Get element between ">" and "</"
		// extract("<div>example</div>") --- returns ---> "example"

		return str.split("</")[0].split(">")[1]
	}

	const convertHTML = (obj) => {
		let html = "" 

		html += '<form  onChange={onChange} className="trabajo-l1" id="l1-course-form">\n'

		// Title
		html += '\t<fieldset>\n'
		html += '\t\t<div>\n\t\t\t<h2 className="L1">' + obj.title + '</h2>\n\t\t</div>\n' 
		html += '\t</fieldset>\n'

		// Description
		html += '\t<fieldset>\n'
		html += '\t\t<div className="parrafo-uno">\n\t\t\t<p>' + obj.desctipton + '</p>\n\t\t</div>\n'
		html += '\t</fieldset>\n'
		
		// email
		html += '\t<fieldset>\n'
        html += '\t\t<legend for="" className="leyenda">Email</legend>\n'
		html += '\t\t<div class="form-group">\n'
		html += '\t\t\t<input id="emailAddress" type="email" name="emailAddress" class="form-control" required/>\n'
		html += '\t\t</div>\n'
		html += '\t</fieldset>\n'

		// Questions
		let questionNum = 1

		obj.questions.forEach(elem => {
			html += '\t<fieldset>\n'
			html += '\t\t<legend for="' + questionNum + '0000000" className="leyenda">' + elem.question + '</legend>\n'
			html += '\t\t<div class="form-group">\n'

			// Radio and checkboxes elements
			if(elem.type === "radio" || elem.type === "checkbox") {
				elem.options.forEach(opt => {
					html += '\t\t\t<div class="' + elem.type + '">\n'
					html += '\t\t\t\t<label className="etiqueta">\n' 
					html += '\t\t\t\t\t<input type="' + elem.type + '" name="entry.' + questionNum + '" value="' + opt + '"' + (elem.type === "radio"? " required" : "") + '/>\n'
					html += '\t\t\t\t\t' + opt + '\n'
					html += '\t\t\t\t</label>\n' 
					html += '\t\t\t</div>\n'
				})
			}
			
			// dropdown elements
			if(elem.type === "dropdown") {
				html += '\t\t\t<select>\n'
				html += '\t\t\t\t<option disabled hidden selected>' + elem.options.shift() + '</option>\n'
				
				elem.options.forEach(opt => {
					html += '\t\t\t\t<option name="entry.' + questionNum + '" value="' + opt + '" required/>\n'
					html += '\t\t\t\t\t' + opt + '\n'
					html += '\t\t\t\t</option>\n'
				})

				html += '\t\t\t</select>\n'
			}

			// input text
			if(elem.type === "text" || elem.type === "paragraph") {
				html += '\t\t\t<input id="' + questionNum + '" type="text" class="' + elem.type + '"/>\n'
			}

			html += '\t\t</div>\n'
			html += '\t</fieldset>\n'

			questionNum += 1
		});

		html += '\t<input type="hidden" name="fvv" value="1"/>\n'
		html += '\t<input type="hidden" name="fbzx" value="8461977738504272510"/>\n'
		html += '\t<input type="hidden" name="pageHistory" value="0"/>\n'
		html += '\t<div class="center">\n'
		html += '\t\t<Button className="btn-primary-uno" onClick={onSubmit} isLoading={isLoading}>Send</Button>\n'
		html += '\t</div>\n'
		html += '</form>\n'

		console.log(html)
		setHTML(html)
	}

	return (
		<div className="center">
			<div>
				<Button inverted color="orange" onClick={() => getHTML()}>Search</Button>
				<Button primary onClick={() => parse()}>Convert</Button>
				<Input id="input" placeholder="url here" icon="search"></Input>
			</div>

			<div className="center">
				<List>
					{html.split("\n").map(elem => 
						<List.Item className="line"><pre className="noMargin">{elem}</pre></List.Item>
					)}
				</List>
			</div>
		</div>
	);
}

export default HtmlParser;

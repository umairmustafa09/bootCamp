import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './note.css';

export default class Note extends Component {
	state = {
		noteData:
			JSON.parse(localStorage.getItem('Notes')) == null
				? []
				: JSON.parse(localStorage.getItem('Notes'))
	};

	inputData = () => {
		const title = document.getElementById('title').value;
		const body = document.getElementById('body').value;
		const note = {
			title: title,
			body: body,
			Time: new Date()
		};
		this.state.noteData.push(note);
		window.localStorage.setItem('Notes', JSON.stringify(this.state.noteData));
		alert('Note is created');
	};

	render() {
		return (
			<div className="logIn">
				<h1>Create Note</h1>
				<input
					type="text"
					name="title"
					placeholder="Enter a title"
					id="title"
				/>
				<input
					type="text"
					name="body"
					placeholder="Enter a body text"
					id="body"
				/>
				<button onClick={this.inputData} className="button">
					Create Note
				</button>
				<Link to="/">
					<button className="button">Go Back</button>
				</Link>
			</div>
		);
	}
}

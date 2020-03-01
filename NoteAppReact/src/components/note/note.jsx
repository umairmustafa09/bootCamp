import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './note.css';
import NoteService from './../../Services';

export default class Note extends Component {
	state = {
		title: '',
		body: '',
		isEditing: false,
		noteData: NoteService.getNotes
	};

	componentDidMount() {
		const { history } = this.props;
		console.log(history.location);
		if (history.location.state) {
			this.setState({
				title: history.location.state.item.title,
				body: history.location.state.item.body,
				isEditing: true
			});
		}
	}

	inputData = () => {
		const note = {
			title: this.state.title,
			body: this.state.body,
			Time: new Date()
		};
		if (this.state.isEditing) {
			this.state.noteData[this.props.history.location.state.index] = note;
		} else {
			this.state.noteData.push(note);
		}
		NoteService.setNotes = this.state.noteData;
		alert('Note is created');
	};

	render() {
		return (
			<div className="logIn">
				<h1>Create Note</h1>
				<input
					type="text"
					name="title"
					value={this.state.title}
					placeholder="Enter a title"
					id="title"
					onChange={(e) => {
						this.setState({ title: e.target.value });
					}}
				/>
				<input
					type="text"
					name="body"
					value={this.state.body}
					placeholder="Enter a body text"
					id="body"
					onChange={(e) => {
						this.setState({ body: e.target.value });
					}}
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

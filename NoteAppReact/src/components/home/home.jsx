import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import NoteService from './../../Services';
export default class Home extends Component {
	state = {
		notes: NoteService.getNotes,
		sortedbyCreated: [],
		sortedbyAlphabet: [],
		searched: []
	};

	remove = (index) => {
		const nar = this.state.notes.splice(index, 1); //notes after remove.
		this.setState({ notes: nar });
		console.log('nar', nar, 'index', index);
	};

	edit = (index) => {
		this.props.history.push('/update', {
			item: this.state.notes[index],
			index
		});
	};

	sortByCreated = () => {
		this.state.sortedbyCreated = this.state.notes.sort();
		console.table(this.state.sortedbyCreated);
	};

	sortByAlphabet = () => {
		this.state.sortedbyAlphabet = this.state.notes;

		for (let i = 0; i < this.state.sortedbyAlphabet; i++) {
			for (let j = i; j < this.state.sortedbyAlphabet - i - 1; j++) {
				if (
					this.state.sortedbyAlphabet[j].title >
					this.state.sortedbyAlphabet[j + 1].title
				) {
					const temp = this.state.sortedbyAlphabet[j];
					this.state.sortedbyAlphabet[j] = this.state.sortedbyAlphabet[j + 1];
					this.state.sortedbyAlphabet[j + 1] = temp;
				}
			}
		}
		console.table(this.state.sortedbyAlphabet);
	};

	search = (e) => {
		const notes = this.state.notes.filter(
			(note) => note.title == e.target.value
		);
		this.setState({ searched: notes });
	};

	displaySearch = () => {
		return this.state.searched.map((note, i) => {
			return (
				<div key={i}>
					<p>
						{note.title}
						<br />
						{note.body}
						<br />
						<button
							onClick={() => {
								this.edit(i);
							}}
						>
							Edit
						</button>
						<button
							onClick={() => {
								this.remove(i);
							}}
						>
							Delete
						</button>
					</p>
				</div>
			);
		});
	};

	render() {
		return (
			<div>
				<div className="noteContainer">
					{this.state.notes.map((note, i) => (
						<div key={i}>
							<p>
								{note.title} <br />
								{note.body}
								<br />
								<button
									onClick={() => {
										this.edit(i);
									}}
								>
									Edit
								</button>
								<button
									onClick={() => {
										this.remove(i);
									}}
								>
									Delete
								</button>
							</p>
						</div>
					))}
				</div>
				<div className="container">
					<Link to="/note">
						<button>Create Note</button>
					</Link>
				</div>
				<button className="btn" onClick={this.sortByCreated}>
					sortByCreated
				</button>
				<button className="btn" onClick={this.sortByAlphabet}>
					sortByAlphabet
				</button>
				<div className="container">
					<input
						type="text"
						placeholder="Type title to search"
						id="input"
						onChange={this.search}
					/>
				</div>
				<div className="noteContainer">{this.displaySearch()}</div>
			</div>
		);
	}
}

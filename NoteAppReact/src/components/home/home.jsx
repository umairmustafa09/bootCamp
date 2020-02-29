import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component {
  state = {
    notes: JSON.parse(localStorage.getItem('Notes')),
    sortedbyCreated: [],
    sortedbyAlphabet: []
  };

  remove = index => {
    console.log(index);
    this.state.notes.splice(index, 1);
    window.localStorage.setItem('Notes', JSON.stringify(this.state.notes));
    window.location.reload();
  };

  edit = index => {
    let value = window.prompt('Enter Changing in the body');
    this.state.notes[index].body = value;
    window.localStorage.setItem('Notes', JSON.stringify(this.state.notes));
    window.location.reload();
  };

  sortByCreated = () => {
    this.state.sortedbyCreated = this.state.notes.sort();
    console.log(this.state.sortedbyCreated);
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
    console.log(this.state.sortedbyAlphabet);
  };

  render() {
    return (
      <div>
        <div className="noteContainer">
          {this.state.notes.map((note, i) => (
            <div id={i}>
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
      </div>
    );
  }
}

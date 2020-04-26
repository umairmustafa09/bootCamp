import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NotesAction from "../../store/Actions";
import "./index.css";

class Note extends Component {
  state = {
    title: "",
    body: "",
    isEditing: false,
    noteData: this.props.notes || []
  };

  componentDidMount() {
    const { history } = this.props;
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
      const index = this.props.history.location.state.index;
      const data = this.state.noteData;
      data[index] = note;
      this.setState({ noteData: data });
    } else {
      this.state.noteData.push(note);
    }
    this.props.addNote(this.state.noteData);
    alert("Note is created");
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
        <textarea
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

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (notes) => {
      dispatch(NotesAction.Add(notes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);

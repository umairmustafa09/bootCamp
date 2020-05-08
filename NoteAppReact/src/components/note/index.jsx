import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NotesAction from "../../store/Actions/notes";
import isLoggedIn from "../../helper/is_logged_in";
import "./style.css";

class Note extends Component {
  state = {
    title: "",
    body: "",
    userid: "",
    _id: "",
    updatedAt: "",
    isEditing: false,
    noteData: this.props.notes || [],
    user: this.props.user || {},
    noteMsg: ""
  };

  componentDidMount() {
    if (!isLoggedIn()) {
      return this.props.history.push("/login");
    }

    const { history } = this.props;
    if (history.location.state) {
      this.setState({
        _id: history.location.state.item._id,
        title: history.location.state.item.title,
        body: history.location.state.item.body,
        userid: history.location.state.item.userid,
        isEditing: true
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.noteMsg !== state.noteMsg) {
      return {
        noteMsg: props.notes.error
          ? props.notes.error
          : props.notes.message || ""
      };
    }
  }

  inputData = () => {
    const note = {
      _id: this.state._id,
      userid: this.state.userid || this.props.user.data.user._id,
      title: this.state.title,
      body: this.state.body,
      updatedAt: new Date()
    };
    this.state.isEditing
      ? this.props.updateNote(note)
      : this.props.addNote(note);
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
        <Link to="/home">
          <button className="button">Go Back</button>
        </Link>
        <h4 className="noteMsg">{this.state.noteMsg}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.noteReducer.notes,
    user: state.userReducer.obj
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (notes) => {
      dispatch(NotesAction.Add(notes));
    },
    updateNote: (note) => {
      dispatch(NotesAction.Update(note));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);

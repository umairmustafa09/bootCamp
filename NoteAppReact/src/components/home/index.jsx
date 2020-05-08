import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NotesAction from "../../store/Actions/notes";
import "./style.css";

class Home extends Component {
  state = {
    notes: this.props.notes.Notes || [],
    user: this.props.user || {},
    searched: [],
    userName: ""
  };

  remove = (index) => {
    this.state.notes.splice(index, 1);
    const afterDel = this.state.notes;
    this.setState({ notes: afterDel });
  };

  edit = (index) => {
    this.props.history.push("/update", {
      item: this.state.notes[index],
      index
    });
  };

  search = (e) => {
    const notes = this.state.notes.filter((notes) => {
      const regex = new RegExp(e.target.value, "gi");
      return notes.title.match(regex);
    });
    this.setState({ searched: notes });
  };

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.props.getNote(this.props.user.data.user._id);
      this.setState({
        userName: `${user.data.user.firstName} ${user.data.user.lastName}`
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.notes !== state.notes) {
      return {
        notes: props.notes.Notes || []
      };
    }
  }

  renderNotes = () => {
    return this.state.notes.map((note, i) => (
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
    ));
  };

  displaySearch = () => {
    return this.state.searched.map((note, i) => {
      return (
        <div key={i}>
          <p>
            {note.title}
            <br />
            {note.body}
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <p className="userMsg">Happy Noting {this.state.userName}</p>
        <div className="noteContainer">{this.renderNotes()}</div>
        <div className="container">
          <Link to="/note">
            <button>Create Note</button>
          </Link>
        </div>

        <div className="container">
          <input
            type="text"
            placeholder="Filter By title"
            id="input"
            onChange={this.search}
          />
        </div>
        <div className="noteContainer">{this.displaySearch()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNote: (_id) => {
      dispatch(NotesAction.GetUserNotes(_id));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    notes: state.noteReducer.notes,
    user: state.userReducer.obj
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

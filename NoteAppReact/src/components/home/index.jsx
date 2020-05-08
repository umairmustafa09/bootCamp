import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import isLoggedIn from "../../helper/is_logged_in";
import store from "store";
import "./style.css";

class Home extends Component {
  state = {
    notes: this.props.notes.Notes || [],
    user: this.props.user || {},
    searched: [],
    userName: "",
    isSearchEnabel: false
  };

  componentDidMount = () => {
    if (!isLoggedIn()) {
      return this.props.history.push("/login");
    }

    const data = this.props.user.data;
    if (data) {
      this.props.getNote(data.user._id);
      this.setState({
        userName: `${data.user.firstName} ${data.user.lastName}`
      });
    } else {
      store.remove("loggedIn");
      this.props.history.push("/login");
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.notes !== state.notes) {
      return {
        notes: props.notes.Notes || []
      };
    }
  }

  handleLogout = () => {
    store.remove("loggedIn");
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  remove = (index) => {
    const note = this.state.notes.splice(index, 1);
    const afterDel = this.state.notes;
    this.setState({ notes: afterDel });
    this.props.deleteNote(note[0]._id);
  };

  edit = (index) => {
    this.props.history.push("/update", {
      item: this.state.notes[index],
      index
    });
  };

  search = (e) => {
    try {
      const notes = this.state.notes.filter((notes) => {
        const regex = new RegExp(e.target.value, "gi");
        return notes.title.match(regex);
      });
      this.setState({ searched: notes, isSearchEnabel: true });
    } catch (e) {
      return [];
    }
  };

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
      );
    });
  };

  render() {
    return (
      <div>
        <h3 className="userMsg">Happy Noting {this.state.userName}</h3>
        <button className="logout" onClick={this.handleLogout}>
          log out {this.state.userName}
        </button>
        <div className="container">
          <input
            type="text"
            placeholder="Filter By title"
            id="input"
            onChange={this.search}
          />
        </div>
        <div className="container">
          <Link to="/note">
            <button>Create Note</button>
          </Link>
        </div>
        <div className="noteContainer">{this.displaySearch()}</div>
        {this.state.isSearchEnabel ? (
          <div />
        ) : (
          <div className="noteContainer">{this.renderNotes()}</div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNote: (_id) => {
      dispatch(NotesAction.GetUserNotes(_id));
    },
    deleteNote: (_id) => {
      dispatch(NotesAction.Delete(_id));
    },
    logoutUser: () => {
      dispatch(UserAction.Logout());
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

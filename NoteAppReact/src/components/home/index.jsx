import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button, Form, Navbar, InputGroup } from "react-bootstrap";

import NotesAction from "../../store/Actions/notes";
import UserAction from "../../store/Actions/user";
import isLoggedIn from "../../helper/is_logged_in";
import store from "store";
import "../style.css";

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
    this.props.history.push("/Update", {
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
      <Card className="text-left noteContainer" key={i}>
        <Card.Header>
          <h3>{note.title}</h3>
        </Card.Header>
        <Card.Body>
          <Card.Text>{note.body}</Card.Text>
          <Button
            className="move-right_Float"
            variant="info"
            onClick={() => {
              this.remove(i);
            }}
          >
            remove
          </Button>
          <Button
            className="move-right_Float "
            variant="info"
            onClick={() => {
              this.edit(i);
            }}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    ));
  };

  displaySearch = () => {
    return this.state.searched.map((note, i) => {
      return (
        <Card className="text-left noteContainer" key={i}>
          <Card.Header>
            <h3>{note.title}</h3>
          </Card.Header>
          <Card.Body>
            <Card.Text>{note.body}</Card.Text>
            <Button
              className="move-right_Float"
              variant="info"
              onClick={() => {
                this.remove(i);
              }}
            >
              remove
            </Button>
            <Button
              className="move-right_Float"
              variant="info"
              onClick={() => {
                this.edit(i);
              }}
            >
              Edit
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  render() {
    return (
      <div>
        <Navbar className="bg-light justify-content-between">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                User: {this.state.userName}
              </InputGroup.Text>
              <Button
                className="move-left"
                variant="info"
                onClick={this.handleLogout}
              >
                Log out
              </Button>
              <Link to="/Create">
                <Button className="move-left" variant="info">
                  Create Note
                </Button>
              </Link>
            </InputGroup.Prepend>
          </InputGroup>
          <Form.Control
            type="text"
            placeholder="Input title to filter notes"
            id="input"
            onChange={this.search}
          />
        </Navbar>
        <div className="container">
          <h3>{this.state.userName}'s Notes</h3>
        </div>
        <div>{this.displaySearch()}</div>
        {this.state.isSearchEnabel ? <div /> : <div>{this.renderNotes()}</div>}
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

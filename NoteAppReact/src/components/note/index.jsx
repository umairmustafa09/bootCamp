import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button, Form, Alert } from "react-bootstrap";

import NotesAction from "../../store/Actions/notes";
import isLoggedIn from "../../helper/is_logged_in";
import "../style.css";

class Note extends Component {
  state = {
    title: "",
    body: "",
    userid: "",
    email: "",
    _id: "",
    updatedAt: "",
    isEditing: false,
    noteData: this.props.notes || [],
    user: this.props.user || {},
    noteMsg: "",
    currentPath: this.props.history.location.pathname.substr(1)
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
        email: history.location.state.item.email,
        isEditing: true
      });
    }
  }

  invalidRoute = (user) => {
    if (user.data.user.role !== "S") this.props.history.goBack();
  };

  componentDidUpdate = (prevState) => {
    if (prevState.user !== this.props.user) this.invalidRoute(this.props.user);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.noteMsg !== state.noteMsg) {
      return {
        noteMsg: props.notes.error
          ? props.notes.error
          : props.notes.message || ""
      };
    }
    return null;
  }

  inputData = () => {
    const note = {
      _id: this.state._id,
      userid: this.state.userid || this.props.user.data.user._id,
      email: this.state.email || this.props.user.data.user.email,
      title: this.state.title,
      body: this.state.body,
      updatedAt: new Date()
    };
    this.state.isEditing
      ? this.props.updateNote(note)
      : this.props.addNote(note);
  };

  backenMsg = () => {
    if (
      this.state.noteMsg === "Note updated Successfully" ||
      this.state.noteMsg === "Note created Succesfully"
    ) {
      return (
        <Alert className="MsgClass" variant="success">
          {this.state.noteMsg}
        </Alert>
      );
    } else if (this.state.noteMsg) {
      return (
        <Alert className="MsgClass" variant="danger">
          {this.state.noteMsg}
        </Alert>
      );
    } else {
      return (
        <Alert className="MsgClass" variant="info">
          Please {this.state.currentPath} Note
        </Alert>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Note App</h1>
        <Card className="text-left FormClass">
          <Card.Header>
            <h3>{this.state.currentPath} Note</h3>
          </Card.Header>
          <Card.Body>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Enter a title"
              id="title"
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="body"
              value={this.state.body}
              placeholder="Enter a body text"
              id="body"
              onChange={(e) => {
                this.setState({ body: e.target.value });
              }}
            />
            <Link to="/home">
              <Button className="margin-right" variant="info">
                Go Back
              </Button>
            </Link>

            <Button
              className="margin-right"
              variant="info"
              onClick={this.inputData}
            >
              {this.state.currentPath} Note
            </Button>
            {this.backenMsg()}
          </Card.Body>
        </Card>
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

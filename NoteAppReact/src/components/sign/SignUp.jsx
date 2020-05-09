import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button, Form, Alert } from "react-bootstrap";

import UserAction from "../../store/Actions/user";
import "../style.css";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    SignUpMsg: ""
  };

  input = () => {
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    this.props.signup({
      username,
      password,
      email,
      firstName,
      lastName
    });
  };

  navToLogin = () => {
    const user = this.props.SignUpUser;
    if (user) {
      if (user.obj.message === "Successfully Signup. Please login!") {
        this.props.history.goBack();
      }
    }
  };

  componentDidUpdate = () => {
    this.navToLogin();
  };

  static getDerivedStateFromProps(props) {
    return {
      SignUpMsg: props.SignUpUser.obj.message
    };
  }

  render() {
    return (
      <div>
        <h1 className="top-margin">Note App</h1>
        <Card className="text-left FormClass">
          <Card.Header>
            <h3>Create Account</h3>
          </Card.Header>
          <Card.Body>
            <Form.Label>First Nmae</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
            <Form.Label>Last Nmae</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Nmae"
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <Button
              className="margin-right"
              variant="info"
              onClick={this.input}
            >
              Sgin Up
            </Button>
            <Link to="/login">
              <Button className="margin-right" variant="info">
                Go Back
              </Button>
            </Link>
            {this.state.SignUpMsg ? (
              <Alert className="MsgClass" variant="danger">
                {this.state.SignUpMsg}
              </Alert>
            ) : (
              <Alert className="MsgClass" variant="info">
                Plase sign up
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SignUpUser: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (obj) => {
      dispatch(UserAction.Signup(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

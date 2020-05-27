import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button, Form, Alert } from "react-bootstrap";

import UserAction from "../../store/Actions/user";
import isLoggedIn from "../../helper/is_logged_in";
import noteLogo from "../../services/logo/note.png";
import "../style.css";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loginMsg: ""
  };

  input = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login({ email, password });
  };

  navToHome = () => {
    const user = this.props.loginUser;
    if (user.obj) {
      if (user.obj.message === "Successfully Login") {
        user.obj.data.user.role === "S"
          ? this.props.history.push("/home")
          : this.props.history.push("/dashboard");
      }
    }
  };

  componentDidUpdate = () => {
    this.navToHome();
  };

  componentDidMount = () => {
    const data = this.props.loginUser.data;
    if (data) {
      if (isLoggedIn()) {
        return this.props.loginUser.obj.data.user.role === "S"
          ? this.props.history.push("/home")
          : this.props.history.push("/dashboard");
      }
    }
  };

  static getDerivedStateFromProps(props) {
    return {
      loginMsg: props.loginUser.obj.error
        ? props.loginUser.obj.error
        : props.loginUser.obj.message || ""
    };
  }

  backenMsg = () => {
    if (this.state.loginMsg === "Successfully Signup. Please login!") {
      return (
        <Alert className="MsgClass" variant="success">
          {this.state.loginMsg}
        </Alert>
      );
    } else if (this.state.loginMsg) {
      return (
        <Alert className="MsgClass" variant="danger">
          {this.state.loginMsg}
        </Alert>
      );
    } else {
      return (
        <Alert className="MsgClass" variant="info">
          Please login
        </Alert>
      );
    }
  };

  render() {
    return (
      <div>
        <img className="noteLogo" src={noteLogo} alt="emptyLogo" />
        <Card className="text-left FormClass">
          <Card.Header>
            <h3>Login</h3>
          </Card.Header>
          <Card.Body>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
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
              Log in
            </Button>
            <Link to="/signup">
              <Button className="margin-right" variant="info">
                Sign up
              </Button>
            </Link>
            {this.backenMsg()}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch(UserAction.Login(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

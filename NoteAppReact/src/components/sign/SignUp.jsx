import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import UserAction from "../../store/Actions/user";
import "./style.css";

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
      <div className="signInUp">
        <h1>Create Account</h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Nmae"
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last Nmae"
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button onClick={this.input}>Sign up</button>
        <Link to="/login">
          <button>Go Back</button>
        </Link>
        <h4 className="msg">{this.state.SignUpMsg}</h4>
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

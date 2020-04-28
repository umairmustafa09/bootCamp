import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NotesAction from "../../store/Actions/user";
import "./style.css";

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  input = () => {
    const username = this.state.username;
    const password = this.state.password;
    this.props.login({ username, password });
  };

  render() {
    return (
      <div className="signInUp">
        <h1>Log in</h1>
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
        <Link to="/home">
          <button onClick={this.input}>Sign in</button>
        </Link>
        <Link to="/signup">
          <button onClick={this.input}>Create Account</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch(NotesAction.Login(obj));
    }
  };
};

export default connect(null, mapDispatchToProps)(SignIn);

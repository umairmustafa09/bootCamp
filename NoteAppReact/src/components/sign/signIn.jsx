import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import UserAction from "../../store/Actions/user";
import "./style.css";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loginMsg: " "
  };

  input = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login({ email, password });
  };

  navToHome = () => {
    const user = this.props.loginUser;
    if (user) {
      if (user.obj.message === "Successfully Login") {
        this.props.history.push("/home");
      }
    }
  };

  componentDidUpdate = () => {
    this.navToHome();
  };

  static getDerivedStateFromProps(props) {
    return {
      loginMsg: props.loginUser.obj.message
    };
  }

  render() {
    return (
      <div className="signInUp">
        <h1>Log in</h1>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button onClick={this.input}>Sign in</button>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
        <p className="msg">{this.state.loginMsg}</p>
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

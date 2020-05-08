import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import UserAction from "../../store/Actions/user";
import isLoggedIn from "../../helper/is_logged_in";
import store from "store";
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
        store.set("loggedIn", true);
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
    } else {
      store.remove("loggedIn");
      this.props.history.push("/login");
    }
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
        <h4 className="msg">{this.state.loginMsg}</h4>
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

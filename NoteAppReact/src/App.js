import React, { Component } from "react";
import { Provider } from "react-redux";
import UserAction from "./store/Actions/user";

import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./routes";
import LocalStorage from "store";
import Store from "./store";

export default class App extends Component {
  state = {
    isLoading: true,
    user: LocalStorage.get("user")
  };

  componentDidMount = async () => {
    const user = this.state.user;
    if (user) {
      await Store.dispatch(UserAction.AutoLogin(user));
    }
    this.setState({ isLoading: false });
  };
  render() {
    if (!this.state.isLoading)
      return (
        <Provider store={Store}>
          <Routes user={this.state.user} />
        </Provider>
      );
    return <div>Loading !</div>;
  }
}

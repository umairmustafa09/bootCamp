import React, { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./routes";
import store from "./store";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

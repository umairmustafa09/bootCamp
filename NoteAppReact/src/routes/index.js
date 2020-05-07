import React, { Component } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Note from "../components/note";
import Home from "../components/home";
import SignIn from "../components/sign/signIn";
import SignUp from "../components/sign/SignUp";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <center>
            <h1>Note App</h1>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/note" component={Note} />
            <Route exact path="/update" component={Note} />
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </center>
        </div>
      </BrowserRouter>
    );
  }
}

import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

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
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/" component={Home} />
              <Route exact path="/note" component={Note} />
              <Route exact path="/update" component={Note} />
              <Route exact path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </center>
        </div>
      </BrowserRouter>
    );
  }
}

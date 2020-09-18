import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

import Note from "../components/note";
import Home from "../components/home";
import SignIn from "../components/sign/signIn";
import SignUp from "../components/sign/SignUp";
import Dashboard from "../components/dashboard/index";

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <center>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} /> //dashboard for admin main page
              <Route exact path="/home" component={Home} />   // home for user main page
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={SignIn} />
              <Route exact path="/create" component={Note} />
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

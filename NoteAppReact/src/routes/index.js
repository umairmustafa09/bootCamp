import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

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
            <Route exact path="/" component={SignIn} />
            <Route exact path="/Signup" component={SignUp} />
            <Route exact path="/Home" component={Home} />
            <Route path="/note" component={Note} />
            <Route path="/update" component={Note} />
          </center>
        </div>
      </BrowserRouter>
    );
  }
}

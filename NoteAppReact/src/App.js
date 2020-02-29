import React, { Component } from 'react';
import note from './components/note/note';
import { Route, BrowserRouter } from 'react-router-dom';
import home from './components/home/home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <center>
            <h1>Note App</h1>
            <Route exact path="/" component={home} />
            <Route path="/note" component={note} />
          </center>
        </div>
      </BrowserRouter>
    );
  }
}

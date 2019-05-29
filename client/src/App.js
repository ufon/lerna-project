import React, { Component } from "react";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import store, { history } from "./helpers/store";
import PrivateRoute from "./helpers/withAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StreamList from "./pages/StreamList";
import StreamPage from "./pages/StreamPage";

import Profile from "./pages/Profile";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/profile/edit" component={Profile} />
          <Route path="/profile/:username" component={Home} />
          <Route exact path="/" component={Home} />
          <Route path="/streams" component={StreamList} />
          <Route path="/streams/:tag" component={StreamList} />
          <Route path="/stream/:username" component={StreamPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

import React, { Component } from "react";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import store, { history } from "./helpers/store";
import PrivateRoute from "./helpers/withAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

import StreamPage from "./pages/StreamPage";

import Profile from "./pages/Profile";

import MainLayout from "./pages/Layout/Layout";

import "./App.scss";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainLayout>
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/profile/edit" component={Profile} />
            <Route path="/profile/:username" component={Home} />
            <Route exact path="/" component={Home} />
            <Route path="/stream/:slug" component={StreamPage} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
          </MainLayout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

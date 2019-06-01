import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Logout = ({ logout }) => {
  logout();
  return <Redirect to="/" />;
};

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);

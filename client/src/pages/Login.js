import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../actions/auth";

class Login extends Component {
  onHandleLogin = event => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email,
      password
    };

    this.props.login(data);
  };

  render() {
    const { isSuccess } = this.props;
    return (
      <div>
        <h3>Login Page</h3>
        {isSuccess && <Redirect to="/profile" />}
        <form onSubmit={this.onHandleLogin}>
          <div>
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
        Don't have account? <Link to="/register">Register here</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  isSuccess: app.authReducer.login.success
});

const mapDispatchToProps = {
  login: login.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

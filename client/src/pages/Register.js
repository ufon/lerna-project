import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../actions/auth";

class Register extends Component {
  onHandleRegister = event => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;
    let lastname = event.target.lastname.value;
    let firstname = event.target.firstname.value;
    let username = event.target.username.value;

    const data = {
      email,
      password,
      lastname,
      firstname,
      username
    };

    this.props.register(data);
  };

  render() {
    const { isSuccess } = this.props;
    return (
      <div>
        <h3>Register Page</h3>
        {isSuccess && <Redirect to="/login" />}
        <form onSubmit={this.onHandleRegister}>
          <div>
            <label>Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Firstname</label>
            <input type="text" name="firstname" />
          </div>
          <div>
            <label>Lastname</label>
            <input type="test" name="lastname" />
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div>
            <button>Register</button>
          </div>
        </form>
        Already have account? <Link to="/login">Login here</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  isSuccess: app.authReducer.register.success
});

const mapDispatchToProps = {
  register: register.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

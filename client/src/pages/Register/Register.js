import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { register } from "../../actions/auth";

import "./Register.scss";

import { Form, Icon, Input, Button, Layout, Alert } from "antd";

class Register extends Component {
  state = {
    confirmDirty: false
  };

  onHandleRegister = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { email, firstname, lastname, username, password } = values;
        this.props.register({ email, firstname, lastname, username, password });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const {
      isSuccess,
      errorMessage,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Fragment>
        {isSuccess && <Redirect to="/login" />}
        <Layout.Content
          style={{
            padding: "24px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Form onSubmit={this.onHandleRegister} className="login-form">
            {errorMessage && (
              <Alert
                style={{
                  marginBottom: "24px"
                }}
                message={errorMessage.error}
                type="error"
              />
            )}
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input your email!" }]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="email"
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: "inline-block", width: "50%" }}>
                {getFieldDecorator("firstname", {
                  rules: [
                    { required: true, message: "Please input your firstname!" }
                  ]
                })(<Input placeholder="First Name" />)}
              </Form.Item>
              <Form.Item style={{ display: "inline-block", width: "50%" }}>
                {getFieldDecorator("lastname", {
                  rules: [
                    { required: true, message: "Please input your lastname!" }
                  ]
                })(<Input placeholder="Last Name" />)}
              </Form.Item>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password!" },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password placeholder="Password" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirm", {
                rules: [
                  { required: true, message: "Please confirm your Password!" },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  placeholder="Confirm password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Register
              </Button>
              Already have account? <Link to="/login">Log in here!</Link>
            </Form.Item>
          </Form>
        </Layout.Content>
      </Fragment>
    );
  }
}

const WrappedRegister = Form.create({ name: "register" })(Register);

const mapStateToProps = ({ app }) => ({
  isSuccess: app.authReducer.register.success,
  errorMessage: app.authReducer.register.errorMessage
});

const mapDispatchToProps = {
  register: register.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegister);

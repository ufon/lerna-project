import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

import "./Login.scss";

import { Form, Icon, Input, Button, Checkbox, Layout, Alert } from "antd";

class Login extends Component {
  onHandleLogin = event => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        this.props.login({ email, password });
      }
    });
  };

  render() {
    const {
      isSuccess,
      errorMessage,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Fragment>
        {isSuccess && <Redirect to="/profile" />}

        <Layout.Content
          style={{
            padding: "24px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Form onSubmit={this.onHandleLogin} className="login-form">
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
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
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
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </Layout.Content>
      </Fragment>
    );
  }
}

const WrappedLogin = Form.create({ name: "login" })(Login);

const mapStateToProps = ({ app }) => ({
  isSuccess: app.authReducer.login.success,
  errorMessage: app.authReducer.login.errorMessage
});

const mapDispatchToProps = {
  login: login.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLogin);

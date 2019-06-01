import React, { Component } from "react";

import { connect } from "react-redux";

import { getProfile } from "../../actions/auth";

import { Form, Icon, Input, Button, Layout, Alert } from "antd";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const {
      isSuccess,
      errorMessage,
      profile,
      form: { getFieldDecorator }
    } = this.props;
    const { username, stream_key } = profile;

    return (
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
              Update profile
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    );
  }
}

const WrappedProfile = Form.create({ name: "profile" })(Profile);

const mapStateToProps = state => ({
  profile: state.app.authReducer.user.data,
  isSuccess: state.app.authReducer.user.success
});

const mapDispatchToProps = {
  getProfile: getProfile.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProfile);

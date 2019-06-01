import React, { Component } from "react";

import { connect } from "react-redux";

import { getProfile } from "../../actions/auth";

import { Form, Input, Button, Layout, Alert } from "antd";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  onHandleProfile = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { firstname, lastname } = values;
        this.props.updateProfile({ firstname, lastname });
      }
    });
  };

  render() {
    const {
      // isSuccess,
      errorMessage,
      profile,
      form: { getFieldDecorator }
    } = this.props;
    // const { username, stream_key } = profile;

    return (
      <Layout.Content
        style={{
          padding: "24px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Form onSubmit={this.onHandleProfile} className="profile-form">
          {errorMessage && (
            <Alert
              style={{
                marginBottom: "24px"
              }}
              message={errorMessage.error}
              type="error"
            />
          )}
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: "inline-block", width: "50%" }}>
              {getFieldDecorator("firstname", {
                rules: [
                  { required: true, message: "Please input your firstname!" }
                ]
              })(<Input value={profile.firstname} placeholder="First Name" />)}
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "50%" }}>
              {getFieldDecorator("lastname", {
                rules: [
                  { required: true, message: "Please input your lastname!" }
                ]
              })(<Input value={profile.lastname} placeholder="Last Name" />)}
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="profile-form-button"
            >
              Update profile
            </Button>
          </Form.Item>
        </Form>

        <Form onSubmit={this.onHandleRegister} className="stream-form">
          {errorMessage && (
            <Alert
              style={{
                marginBottom: "24px"
              }}
              message={errorMessage.error}
              type="error"
            />
          )}
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: "inline-block", width: "50%" }}>
              {getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your title of your stream!"
                  }
                ]
              })(<Input placeholder="Stream title" />)}
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "50%" }}>
              {getFieldDecorator("lastname", {
                rules: [
                  {
                    required: true,
                    message: "Please input description of your stream!"
                  }
                ]
              })(<Input placeholder="Stream description" />)}
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="stream-form-button"
            >
              Update stream
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

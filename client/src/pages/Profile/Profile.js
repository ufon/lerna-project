import React, { Component } from "react";

import { connect } from "react-redux";

import { Form, Input, Button, Layout, Alert, Tabs } from "antd";
import { getProfile, updateProfile } from "../../actions/auth";
import { updateStream } from "../../actions/stream";
import "./Profile.scss";

const { TabPane } = Tabs;

const { TextArea } = Input;

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
      updateProfile,
      updateStream,
    } = this.props;
    // const { username, stream_key } = profile;

    console.log(profile);

    return (
      <Layout.Content
        style={{
          padding: "24px 0",
          display: "flex",
        }}
      >
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Main info" key="1">
              <p>How to start stream</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Vitae turpis massa sed elementum tempus
                egestas sed. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet.
                Montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Feugiat
                sed lectus vestibulum mattis ullamcorper velit. Adipiscing diam donec adipiscing
                tristique risus nec. Nunc sed blandit libero volutpat sed cras ornare. Vulputate
                sapien nec sagittis aliquam malesuada bibendum arcu. In est ante in nibh mauris
                cursus. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. In hac
                habitasse platea dictumst quisque sagittis purus sit. Feugiat sed lectus vestibulum
                mattis ullamcorper velit sed ullamcorper morbi. Euismod quis viverra nibh cras
                pulvinar mattis nunc sed blandit. Iaculis urna id volutpat lacus. Leo urna molestie
                at elementum eu facilisis sed odio morbi. Eget magna fermentum iaculis eu non. Ut
                etiam sit amet nisl purus. Pharetra pharetra massa massa ultricies mi quis
                hendrerit. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend.
                Aliquet nibh praesent tristique magna. Nascetur ridiculus mus mauris vitae. Arcu
                risus quis varius quam quisque id. Dui accumsan sit amet nulla facilisi.
              </p>
            </TabPane>
            <TabPane tab="Update personal info" key="2">
              <UpdateProfileForm updateProfile={updateProfile} profile={profile} />
            </TabPane>
            <TabPane tab="Update stream info" key="3">
              <UpdateStreamForm updateStream={updateStream} stream={profile.stream} />
            </TabPane>
          </Tabs>
        </div>
      </Layout.Content>
    );
  }
}

const UpdateProfileForm = Form.create({ name: "updateProfile" })(props => {
  const { getFieldDecorator, validateFields } = props.form;
  const { profile, updateProfile } = props;
  console.log(profile);

  const onHandleProfile = event => {
    event.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { firstname, lastname } = values;
        updateProfile({ firstname, lastname });
      }
    });
  };

  return (
    <Form onSubmit={onHandleProfile} className="profile-form">
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item>
          {getFieldDecorator("firstname", {
            initialValue: profile.firstname,
            rules: [{ required: true, message: "Please input your firstname!" }],
          })(<Input placeholder="First Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("lastname", {
            initialValue: profile.lastname,
            rules: [{ required: true, message: "Please input your lastname!" }],
          })(<Input placeholder="Last Name" />)}
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="profile-form-button">
          Update profile
        </Button>
      </Form.Item>
    </Form>
  );
});

const UpdateStreamForm = Form.create({ name: "updateStream" })(props => {
  const { getFieldDecorator, validateFields } = props.form;
  const { stream, updateStream } = props;
  console.log(stream);

  const onHandleStream = event => {
    event.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const { title, description } = values;
        updateStream({ title, description });
      }
    });
  };

  return (
    <Form onSubmit={onHandleStream} className="stream-form">
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item>
          {getFieldDecorator("title", {
            initialValue: stream.title,
            rules: [
              {
                required: true,
                message: "Please input your title of your stream!",
              },
            ],
          })(<Input placeholder="Stream title" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("description", {
            initialValue: stream.description,
            rules: [
              {
                required: true,
                message: "Please input description of your stream!",
              },
            ],
          })(<TextArea rows={4} />)}
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="stream-form-button">
          Update stream
        </Button>
      </Form.Item>
    </Form>
  );
});

const mapStateToProps = state => ({
  profile: state.app.authReducer.user.data,
  isSuccess: state.app.authReducer.user.success,
});

const mapDispatchToProps = {
  getProfile: getProfile.request,
  updateProfile: updateProfile.request,
  updateStream: updateStream.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

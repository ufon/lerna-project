import React, { Component } from "react";

import { connect } from "react-redux";

import { getProfile } from "../actions/auth";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { isSuccess } = this.props;
    const { username, stream_key } = this.props.profile;

    return (
      <div>
        {isSuccess && (
          <div>
            {username}, {stream_key}
          </div>
        )}
      </div>
    );
  }
}

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
)(Profile);

import React, { Component } from "react";
import { connect } from "react-redux";

import { getStreams } from "../actions/stream";

class Home extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    return <div>Home page test pipeline workflow</div>;
  }
}

const mapStateToProps = state => ({
  streams: state.app.streamReducer.data
});

const mapDispatchToProps = {
  getStreams: getStreams.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

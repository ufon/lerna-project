import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getStreams } from "../actions/stream";

class Home extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    return (
      <Fragment>
        <h1>Current streams:</h1>
        <ul>
          {this.props.streams.map(item => (
            <li>{item.title}</li>
          ))}
        </ul>
      </Fragment>
    );
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

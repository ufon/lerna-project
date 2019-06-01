import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row } from "antd";
import { getStreamBySlug } from "../actions/stream";
import shaka from "../../node_modules/shaka-player/dist/shaka-player.ui.js";
import "../../node_modules/shaka-player/dist/controls.css";

import { Typography, Alert } from "antd";

const { Title, Paragraph } = Typography;

class StreamPage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getStream(slug);

    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer(slug);
    } else {
      console.error("Browser not supported!");
    }
  }

  initPlayer(slug) {
    let player = new shaka.Player(this.myRef.current);
    player.isLive(true);
    player.load(`https://lerna.space/dash/${slug}_dash/index.mpd`);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { active, title, description } = this.props.stream;

    return (
      <Fragment>
        <div className="home-wrapper">
          {!active && (
            <Alert
              message="Sorry! This stream currently unavailable"
              type="error"
            />
          )}
          <Row gutter={16}>
            <Title>{title}</Title>
            <video ref={this.myRef} width="100%" controls autoPlay />
            <Paragraph>{description}</Paragraph>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stream: state.app.streamReducer.currentStream.data,
  isSuccess: state.app.streamReducer.currentStream.success
});

const mapDispatchToProps = {
  getStream: getStreamBySlug.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamPage);

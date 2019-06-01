import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Button } from "antd";
import { getStreams } from "../../actions/stream";

import "./Home.scss";

const { Meta } = Card;

class Home extends Component {
  componentDidMount() {
    this.props.getStreams();
  }

  render() {
    return (
      <Fragment>
        <div className="home-wrapper">
          <Row gutter={16}>
            {this.props.streams.map(item => (
              <Col key={item.id} span={12}>
                <Card
                  title={item.title}
                  hoverable
                  actions={[
                    <Button
                      icon="check-circle"
                      style={{ color: item.active ? "green" : "red" }}
                      theme="filled"
                    />,
                    <Button
                      icon="eye"
                      onClick={() =>
                        this.props.history.push(`/stream/${item.slug}`)
                      }
                    />
                  ]}
                >
                  <Meta description={`Stream provided by ${item.slug}`} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.app.streamReducer.streamList.data
});

const mapDispatchToProps = {
  getStreams: getStreams.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

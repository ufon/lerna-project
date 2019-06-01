import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Popover, Menu, Button, Icon } from "antd";

const MainMenu = ({ location, profile }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    selectedKeys={[location.pathname]}
    style={{ lineHeight: "64px", display: "flex" }}
  >
    <Menu.Item key="/">
      <Link to="/">Streams</Link>
    </Menu.Item>
    <Menu.Item key="/about">
      <Link to="/about">About</Link>
    </Menu.Item>

    <Menu.Item style={{ marginLeft: "auto" }}>
      {!profile.username ? (
        <Link to="/login">
          <Button size="large">
            <Icon type="login" />
            Login
          </Button>
        </Link>
      ) : (
        <Popover
          content={
            <Link to="/logout">
              <Button size="large">
                <Icon type="logout" />
                Logout
              </Button>
            </Link>
          }
          trigger="click"
        >
          Hello!, {profile.username}
        </Popover>
      )}
    </Menu.Item>
  </Menu>
);

const ConnetedMenu = withRouter(MainMenu);

const mapStateToProps = state => ({
  profile: state.app.authReducer.user.data
});

export default connect(mapStateToProps)(ConnetedMenu);

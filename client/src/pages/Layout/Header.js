import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu } from "antd";

const MainMenu = ({ location }) => (
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
  </Menu>
);

export default withRouter(MainMenu);

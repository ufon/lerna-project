import React from "react";

import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";
const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;

import { useState, useRef } from "react";
import Flow from "./Components/Flow";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Layout, Space, Input, Button } from "antd";
import "./App.css";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const flowDesignerRef = useRef();

  const handleExportFlowAsJSON = () => {
    if (flowDesignerRef.current) {
      flowDesignerRef.current.exportFlowAsJSON();
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#fff",
          },
        },
      }}
    >
      <Layout style={{ height: "100vh", background: "#f5f5f5" }}>
        <Header
          style={{
            borderBottom: "1px solid #E8E8E8",
            background: "#FFF",
          }}
        >
          <Input placeholder="Workflow Name" style={{ width: 200 }} />
          <Space style={{ float: "right", flexDirection: "row-reverse" }}>
            <Button icon={<ArrowUpOutlined />} />
            <Button
              icon={<ArrowDownOutlined />}
              onClick={handleExportFlowAsJSON}
            />
            <Button icon={<PlusOutlined />} />
          </Space>
        </Header>
        <Content style={{ padding: 35, background: "#f5f5f5" }}>
          <div style={{ width: "100%", height: "100%" }}>
            <Flow ref={flowDesignerRef} />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

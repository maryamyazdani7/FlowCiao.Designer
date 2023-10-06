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
      <Layout style={{ height: "100vh", background: "#fff" }}>
        <Header>
          <Input placeholder="Workflow Name" style={{ width: 200 }} />
          <Space style={{ float: "right", flexDirection: "row-reverse" }}>
            <Button icon={<ArrowUpOutlined />} />
            <Button icon={<ArrowDownOutlined />} />
            <Button icon={<PlusOutlined />} />
          </Space>
        </Header>
        <Content style={{ padding: 35 }}>
          <div style={{width: "100%", height: "100%"}}>
            <Flow />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

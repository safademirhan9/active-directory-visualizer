import { Link } from 'react-router-dom';
import { Layout, Menu, Typography, Space, Card } from 'antd';
import { HomeOutlined, UserOutlined, LaptopOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Title level={2} style={{ color: 'white', margin: '0' }}>
            <HomeOutlined /> Home Page
          </Title>
        </div>
      </Header>
      <Content style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title level={3}>Welcome to the Active Directory Visualization Application!</Title>
          <Paragraph>
            This project is designed to visualize objects within an Active Directory (AD) environment, capture various
            attributes of these objects, and store them in a Neo4j database. It consists of three main components:
          </Paragraph>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title="Users" style={{ width: '100%' }}>
              <Menu mode="vertical">
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to="/users">View Users</Link>
                </Menu.Item>
              </Menu>
            </Card>
            <Card title="Computers" style={{ width: '100%' }}>
              <Menu mode="vertical">
                <Menu.Item key="3" icon={<LaptopOutlined />}>
                  <Link to="/computers">View Computers</Link>
                </Menu.Item>
              </Menu>
            </Card>
            <Card title="Groups" style={{ width: '100%' }}>
              <Menu mode="vertical">
                <Menu.Item key="5" icon={<TeamOutlined />}>
                  <Link to="/groups">View Groups</Link>
                </Menu.Item>
              </Menu>
            </Card>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Safa Demirhan</Footer>
    </Layout>
  );
};

export default Home;

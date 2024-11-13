import { useState } from 'react';
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', 'dashboard', <PieChartOutlined />),
  getItem('Products', 'sub1', <UserOutlined />, [
    getItem('List Product', 'products'),
    getItem('Create Product', 'product/create'),
  ]),
  getItem('Permissions', 'sub2', <UserOutlined />, [
    getItem('List Manager', 'permissions'),
    getItem('Create Manager', 'permission/create'),
  ]),
  getItem('Categories', 'sub3', <FileOutlined />, [
    getItem('List Categories', 'categories'),
    getItem('Create Category', 'category/create'),
  ]),
];
export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="w-[100vw] h-[100vh]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <div className="h-5" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items.map(item => ({
            ...item,
            label: <p>{item.label}</p>,
            children: item.children
              ? item.children.map(subItem => ({
                  ...subItem,
                  label: (
                    <Link to={`/admin/${subItem.key}`}>{subItem.label}</Link>
                  ),
                }))
              : null,
          }))}
        />
      </Sider>
      <Layout>
        <Header className="flex justify-end items-center p-0 px-4">
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
              <UserOutlined />
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

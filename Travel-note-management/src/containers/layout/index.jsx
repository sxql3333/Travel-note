import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
    BookOutlined,
  UserOutlined,
  CloudTwoTone
    
} from '@ant-design/icons';
import { Layout, Menu, Button, theme,Avatar,Popover } from 'antd';
const { Header, Sider, Content } = Layout;
import Home from "../home"
import {  useNavigate} from 'react-router-dom'
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1'); // 默认选中第一个菜单项
  const {
    token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  const handleMenuClick = (e) => {
        setSelectedMenuKey(e.key);
    };
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
  const handleConfirm = () => {
    navigate('/login');
    console.log('点击确定，执行退出操作');
    setOpen(false); // 关闭Popover
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
    return (
    <Layout  style={{minHeight: '97vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" style={{fontSize: '24px',  color: '#ffffff',margin: '12px 0 24px', textAlign: 'center'}} >
            <span className='titleplat'><CloudTwoTone />平台</span>
          </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<BookOutlined />}>
            游记列表
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            用户管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
        style={{
            padding:"12px",
            background: colorBgContainer,
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
                    />
            <Popover
                content={<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={() => setOpen(false)} size='small'>取消</Button>
                    <Button type="primary" onClick={handleConfirm} size='small'>确定</Button>
                  </div>}
                title="确定要退出吗？"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
         <Avatar
            style={{
                backgroundColor: '#1677ff',
            }}
            icon={<UserOutlined />}
            />
    </Popover>
         
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selectedMenuKey === '1' ? (
            <Home />
          ) : (
            <div>用户管理内容</div>
          )}
        </Content>
      </Layout>
    </Layout> 
   
  );
};
export default App;
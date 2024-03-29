import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
import { AppstoreOutline, MessageFill, TeamFill } from 'antd-mobile-icons';
import NavFooter from '../../components/nav-footer';
import { Button, Input, Space, Avatar, List, Card } from 'antd';
import store from '../../redux/store';
import login from '../login';
import register from '../register';
import { SearchOutlined } from '@ant-design/icons';

export default function Home() {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/login">登录</Link>
        </Button>
        <Button>
          <Link to="/register">注册</Link>
        </Button>
        <Button type="primary" style={{ marginLeft: '10px' }}>
          新建
        </Button>
      </div>
      <Search
        placeholder="输入搜索文本"
        enterButton={
          <Space>
            <SearchOutlined />
            搜索
          </Space>
        }
        size="large"
        onSearch={onSearch}
      />
      <div style={{ marginTop: '20px' }}>
        <Card
          style={{
            width: '100%',
          }}
        >
          {' '}
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            // footer={
            //   <div>
            //     <b>ant design</b> footer part
            //   </div>
            // }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
                {item.content}
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}

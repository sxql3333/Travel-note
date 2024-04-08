import React, { useState, useEffect } from 'react';
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
import { SearchOutlined } from '@ant-design/icons';
import { getAllData as fetchData } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import approvalImg from '../../../assets/approval.png';
import rejectImg from '../../../assets/reject.png';
import waitImg from '../../../assets/wait.png';

export default function Home() {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [noteData, setnoteData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData().then((resData) => {
      setnoteData(resData.data); // 更新 noteData
      console.log("返回数据", resData.data);
    })
  }, []);  //空的依赖数组传给useEffect,表示挂载后只执行一次

  useEffect(() => {
    console.log("noteData 变化了", noteData);
    // 在这里使用 noteData 进行组件渲染或其他操作
  }, [noteData]);


  // const data = Array.from({ length: 23 }).map((_, i) => ({
  //   href: 'https://ant.design',
  //   title: `ant design part ${i}`,
  //   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  //   description:
  //     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //   content:
  //     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  // }));

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
      </div>
      <Card>
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
      </Card>

      <div style={{ marginTop: '20px' }}>
        {/* <Card
          style={{
            width: '100%',
          }}
        >
          {' '}
          <List
            itemLayout="vertical"
            size="large"
            columns={3}
            // gutter={[16, 16]}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={noteData}
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
        </Card> */}
                <Card
          style={{
            width: '100%',
          }}
        >
          {' '}
          <List
            itemLayout="vertical"
            size="large"
            columns={3}
            // gutter={[16, 16]}
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={noteData}
            renderItem={(item) => (
              // <List.Item
              //   key={item.title}
              //   extra={
              //     <div>
              //     <img
              //       width={272}
              //       alt="logo"
              //       src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              //     />
              //     <Button type="primary">通过</Button>
              //     <Button type="primary">拒绝</Button>
              //     <Button type="primary">删除</Button>
              //   </div>
              //   }
              // >
              //   <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
              //   {item.content}
              // </List.Item>
              <List.Item
                key={item.title}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  width={150}
                  height={90}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  style={{ marginRight: 16 }}
                />
                <div style={{ flex: 1 }}>
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.content}
                  />
                </div>
                <div style={{ marginRight: 30 }}>
                  {item.is_approved === 1 && (
                    <img
                      width={100}
                      alt="approval"
                      src={approvalImg}
                    />
                  )}
                  {item.is_approved === 0 && (
                    <img
                      width={100}
                      alt="rejection"
                      src={rejectImg}
                    />
                  )}
                  {item.is_approved === 2 && (
                    <img
                      width={100}
                      alt="deletion"
                      src={waitImg}
                    />
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button type="primary" style={{ marginBottom: 8 ,backgroundColor:'#8ADAB2'}}>通过</Button>
                  <Button type="primary" style={{ marginBottom: 8 , backgroundColor:'#F7C566'}}>拒绝</Button>
                  <Button type="primary" style={{ backgroundColor:'#F2613F'}}>删除</Button>
                </div>
              </List.Item>

            )}
          />
        </Card>
      </div>
    </div>
  );
}

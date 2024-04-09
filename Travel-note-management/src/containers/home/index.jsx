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
import { getAllData as fetchData, getSearchResult } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import approvalImg from '../../../assets/approval.png';
import rejectImg from '../../../assets/reject.png';
import waitImg from '../../../assets/wait.png';

export default function Home() {
  const { Search } = Input;
  const [noteData, setnoteData] = useState([]);
  const dispatch = useDispatch();
  const onSearch = (value) => {
    console.log("进入搜索逻辑");
    console.log(value);
    getSearchResult(value).then((resData) => {
      setnoteData(resData.data); // 更新 noteData
      console.log("返回数据", resData.data);
    });
  };

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

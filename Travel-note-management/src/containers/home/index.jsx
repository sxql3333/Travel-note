import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
const { Option } = Select;
import { AppstoreOutline, MessageFill, TeamFill } from 'antd-mobile-icons';
import NavFooter from '../../components/nav-footer';
import { Button, Input, Space, Avatar, List, Card,Row,Col,Select, Table, Tag,DatePicker,Drawer,Form, } from 'antd';
import store from '../../redux/store';
import { SearchOutlined } from '@ant-design/icons';
import { getAllData as fetchData, getSearchResult } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import approvalImg from '../../../assets/approval.png';
import rejectImg from '../../../assets/reject.png';
import waitImg from '../../../assets/wait.png';
import { reqexamin } from '@/api';
export default function Home() {
  const [open, setOpen] = useState(false);
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
  const [rowDataForReview, setRowDataForReview] = useState(null);
  const [examinStatus, setexaminStatus] = useState();
  const showDrawer = (rowData) => {

    console.log("rowData", rowData);
    setRowDataForReview(rowData);
    setOpen(true);
  };
 
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("rowDataForReview", rowDataForReview);
  }, [rowDataForReview, noteData,examinStatus]); 
  
  useEffect(() => {
    fetchData().then((resData) => {
      setnoteData(resData.data); // 更新 noteData
      console.log("返回数据", resData.data);
    })
  }, []);  
  const columns = [
    {
      title: '作者',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: '发布时间',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '游记标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (_, { image }) => {
        return (
          <img
          width={150}
          height={90}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
        );
      }
    },
    {
      title: '游记内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '游记状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let alt = '';
        let src = '';
        if (status === 0) {
          alt = "rejection"
          src = rejectImg
        } else if (status === 1) {
          alt = "approval"
          src = approvalImg
        } else if (status === 2) {
          alt = "deletion"
          src = waitImg
        }
        return (
          <img width={80} src={src} alt={alt} />
        );
         

      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>查看详情</Button>
          <Button onClick={() => showDrawer(record)}>审核</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      title: 'John Brown',
      image:'',
      content: 32,
      status: 0,
      username: 'John Brown',
    },
    {
      key: '2',
      image:'',
      title: 'Jim Green',
      content: 42,
      status: 1,
      username: 'Jim Green',
    },
    {
      key: '3',
      image:'',
      title: 'Joe Black',
      content: 32,
      status: 2,
      username: 'Joe Black',
    },
  ];
  const onChange = (date) => {
    setexaminStatus(date);
    console.log(date);
  };
  const onConfirm = async() => {
    try {
      const res = await reqexamin(examinStatus);
      console.log("res", res);
    } catch(e) {
      console.log(e);
    }
    
    
  };
  
  

  return (
    <div >
      {/* <div
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
      </div> */}
      <Card>
        <Row gutter={24} style={{alignItems: 'center'}}>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
            <Select style={{ width: '100%' }}>
            <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Col>
        </Row>
        
      </Card>

      {/* <div style={{ marginTop: '20px' }}> */}
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
        </Card>  */}
               
      {/* </div> */}
      <Table columns={columns} dataSource={data} bordered pagination/>
      <Drawer
        title="审核"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onConfirm} type="primary">
              确定
            </Button>
          </Space>
        }
      >
        

          <Row gutter={16}>
            <Col span={12}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p>作者：</p>
                <p >{rowDataForReview?.username}</p>
                </div>
            </Col>
            <Col span={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>发布时间：</p>
               <p >{rowDataForReview?.time}</p>
                  </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p>游记标题：</p>
                <p>{rowDataForReview?.title}</p>
             </div>
                
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p>游记图片：</p>
                {/* <p>{rowDataForReview?.images}</p> */}
                <img
                  width={150}
                  height={90}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              </div>
                
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{display:'flex',alignItems:'center'}}>
                <p>游记内容：</p>
                <p>{rowDataForReview?.content}</p>
              </div>  
            </Col>
        </Row>
        <Form >
          <Row>
            <Col span={12}>
                <Form.Item
                  name="owner"
                  label="审核："
                  rules={[
                    {
                      required: true,
                      message: '请选择',
                    },
                  ]}
                >
                  <Select placeholder="请选择" onChange={onChange}>
                    <Option value="pass">通过</Option>
                    <Option value="reject">拒绝</Option>
                    <Option value="delete">删除</Option>
                  </Select>
                </Form.Item>
              </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

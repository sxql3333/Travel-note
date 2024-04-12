import React, { useState, useEffect,useRef } from 'react';
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
import { Button, Input, Space, Avatar, List, Card,Row,Col,Select, Table, Tag,DatePicker,Drawer,Form, message,Modal} from 'antd';
import store from '../../redux/store';
import { SearchOutlined } from '@ant-design/icons';
import { getAllData as fetchData, getSearchResult } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import approvalImg from '../../../assets/approval.png';
import rejectImg from '../../../assets/reject.png';
import waitImg from '../../../assets/wait.png';
import { checkDiary,deleteDiary } from '@/api';
export default function Home() {
  const [form] = Form.useForm();
  const [reason,setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [reasonVisible,setReasonVisible] =useState(false);
  const { Search } = Input;
  const [noteData, setnoteData] = useState([]);
  const onSearch = (value) => {
    console.log("进入搜索逻辑");
    console.log(value);
    getSearchResult(value).then((resData) => {
      setnoteData(resData.data); // 更新 noteData
      console.log("返回数据", resData.data);
    });
  };
  const [selectedValue, setSelectedValue] = useState('');
  const [rowDataForReview, setRowDataForReview] = useState(null);
  const [examinStatus, setexaminStatus] = useState();
  // const [filteredData, setFilteredData] = useState(noteData);
  const showDrawer = (rowData) => {

    console.log("rowData", rowData);
    setRowDataForReview(rowData);
    setOpen(true);
  };
  const handleDelete = (rowData) => {
    console.log("rowDatassss", rowData);
    setRowDataForReview(rowData);
    setIsModalOpen(true);
  }
  const onClose = () => {
    form.resetFields();
    setOpen(false);
    
  };
  useEffect(() => {
    console.log("rowDataForReview", rowDataForReview);
  }, [rowDataForReview, noteData,examinStatus]); 
  const getList = () => {
    fetchData().then((resData) => {
      setnoteData(resData.data); // 更新 noteData
      console.log("返回数据", resData.data);
    });
  }
  useEffect(() => {
    getList();
  }, []);  
  const columns = [
    {
      title: '作者',
      key: 'name',
      dataIndex: 'name',
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
            // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            src={image[0]}
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
      dataIndex: 'is_approved',
      key: 'is_approved',
      render: (_, { is_approved }) => {
        let alt = '';
        let src = '';
        if (is_approved === 0) {
          alt = "rejection"
          src = rejectImg
        } else if (is_approved === 1) {
          alt = "approval"
          src = approvalImg
        } else if (is_approved === 2) {
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
          {/* <Button>查看详情</Button> */}
          <Button onClick={() => showDrawer(record)}>审核</Button>
          <Button onClick={() => handleDelete(record)}>删除</Button>
        </Space>
      ),
    },
  ];
  const onChange = (date) => {
    console.log("data", date,);
    if (date === '0') {
      setReasonVisible(true);
    } else {
      setReasonVisible(false);
    }
    setexaminStatus(date);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = async () => {
    try {
      console.log("id",rowDataForReview._id)
      const res = await deleteDiary({ id: rowDataForReview._id });
      console.log("res", res);
      if (res.data.code === 200) {
        console.log("删除成功");
        message.success("删除成功");
        setIsModalOpen(false);
        getList();
        onClose();
      } else {
        message.error("删除失败");
      }
    } catch {
      message.error("删除失败");
    }
    
  };
  const onChangeReason = (reason) => {
    setReason(reason.target.value);
  };
  // let [filteredData,setFilteredData] = useState([]);
  const [filteredData, setFilteredData] = useState([...noteData])
  // let filteredData = noteData.filter(item => item.is_deleted !== 0);
  const onConfirm = async () => {
    console.log("examinStatus", examinStatus);
    console.log("reason222222", reason);
    console.log("rowDataForReview._id",rowDataForReview._id)
    if(examinStatus === '0' && reason === '') {
      message.warning("请输入拒绝原因");
      return;
    }
    try {
      const id = rowDataForReview._id
      const res = await checkDiary({ id, examinStatus, reason});
      if (res.code = 200) {
        message.success("审核成功");
        onClose();
        getList();
      } else {
        message.error("审核失败");
      }
    } catch(e) {
      console.log(e);
    } 
  };
  
const handleSelectChange = (value) => {
  setSelectedValue(value);
  let newData;
  if (value === "") {
    setShowFilteredData(false);
  }else  {
    newData = noteData.filter(item => item.is_deleted !== 0 &&item.is_approved === Number(value));
    setShowFilteredData(true); 
  } 
  setFilteredData([...newData]);
  };
  const [showFilteredData, setShowFilteredData] = useState(false);
  const onReset = () => {
    setSelectedValue("");
    const newData = noteData.filter(item => item.is_deleted !== 0);
    setFilteredData([...newData]);
  };
  const getDataSource = () => {
    const data = noteData.filter(item => item.is_deleted !== Number(selectedValue));
    return showFilteredData ? filteredData : data;
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
          <Col span={5}>
          <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="请选择游记状态"
              optionFilterProp="children"
              value={selectedValue} 
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={handleSelectChange} 
          options={[
            {
              value: '0',
              label: '已拒绝',
            },
            {
              value: '1',
              label: '已通过',
            },
            {
              value: '2',
              label: '待审核',
            },
          ]}
            />
            
            {/* <Select style={{ width: '100%' }}>
              <Select.Option key={} value={}>
                所有
              </Select.Option>
            </Select> */}
          </Col>
          <Col span={2}>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={onReset}>重置</Button>
          </Col>
        </Row>
        
      </Card>

     
      <Table columns={columns} dataSource={getDataSource()} bordered pagination />
     
      <Modal open={isModalOpen} onCancel={handleCancel} okText="确认"
        cancelText="取消" onOk={handleConfirm} >
        <p>你确定要删除吗?</p>
      </Modal>
      
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
                <p >{rowDataForReview?.name}</p>
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
              {rowDataForReview?.image.map((imageUrl, index) => (
                <img
                  key={index}
                  width={150}
                  height={90}
                  alt={`image_${index}`}
                  src={imageUrl}
                  style={{ marginLeft: 10 }}
                />))}
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
        <Form form={form}>
          <Row>
            <Col span={12}>
                <Form.Item
                  name="examine"
                  label="审核："
                  rules={[
                    {
                      required: true,
                      message: '请选择',
                    },
                  ]}
                >
                  <Select placeholder="请选择" onChange={onChange}>
                    <Option value="0">拒绝</Option>
                    <Option value="1">通过</Option>
                  </Select>
                </Form.Item>
              </Col>
          </Row>
          <Row>
            <Col span={24}>
              {reasonVisible && (<Form.Item
                name="reason"
                label="原因："
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              >
                <Input placeholder="请输入" value={reason} onChange={onChangeReason}/>
              </Form.Item>
              )}
              </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

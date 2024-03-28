import React, { useState } from 'react';
import { Form, Input, Button, message, Radio, Collapse } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { reqLogin, reqRegister } from '../../api';
import register from '../register'
import home from '../home';

const LoginForm = () => {
  // const [loading, setLoading] = useState(false);

  // const onFinish = (values) => {
  //   setLoading(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     setLoading(false);
  //     if (values.username === 'admin' && values.password === 'password') {
  //       message.success('Login successful');
  //     } else {
  //       message.error('Login failed');
  //     }
  //   }, 2000);
  // };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState(1);
  const setUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const setPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const navigate = useNavigate(); // 获取路由历史对象

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // 定义登录事件函数
const handleLogin = async () => {
  try {
    // 构建用户信息对象
    const user = {
      name: username,
      password: password,
      auth: value
    };
    console.log(user);
    // 发送登录请求
    const response = await reqLogin(user);
    console.log(response);
    // 处理登录请求的响应结果
    if (response.status === 200) {
      // 登录成功
      message.success('登录成功');
      // 跳转到首页
      navigate('/home');
    } 
  } catch (error) {
    // 处理登录请求的错误
    console.error('登录失败:', error);
  }
};

  return (
    <div className="bg">
      <div id="login">
        <div className="title">
          <span>Login</span>
        </div>
        {/* <Form name="loginForm" onFinish={onFinish}> */}
        <Form name="loginForm">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { pattern: /^[a-zA-Z0-9]{1,10}$/, message: 'Username must be 1-10 alphanumeric characters' },
            ]}
          >
            <Input prefix={<UserOutlined />} value={username} onChange={setUsernameChange} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { pattern: /^\S{6,15}$/, message: 'Password must be 6-15 non-space characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} value={password} onChange={setPasswordChange} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>审核人员</Radio>
              <Radio value={2}>管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" htmlType="submit" loading={loading} className="btn1"> */}
            <Button type="primary" htmlType="submit" className="btn1" onClick={handleLogin}>
              登录
            </Button>
            <Button type="primary" className="btn2" >
              <Link to="/register">注册</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

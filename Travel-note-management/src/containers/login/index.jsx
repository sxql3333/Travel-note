import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { pattern: /^\S{6,15}$/, message: 'Password must be 6-15 non-space characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            {/* <Button type="primary" htmlType="submit" loading={loading} className="btn1"> */}
            <Button type="primary" htmlType="submit" className="btn1">
              Login
            </Button>
            <Button type="primary" className="btn2">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

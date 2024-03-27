import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'

const RegisterForm = () => {
  // const [loading, setLoading] = useState(false);

  // const onFinish = (values) => {
  //   setLoading(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     setLoading(false);
  //     if (values.password === values.repassword) {
  //       // Register logic
  //       message.success('Registration successful');
  //     } else {
  //       message.error('Passwords do not match');
  //     }
  //   }, 2000);
  // };

  const validateConfirmPassword = (_, value) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('Passwords do not match');
    }
    return Promise.resolve();
  };


  return (
      <div className="bg">
        <div id="register" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {/* <Form onFinish={onFinish}> */}
          <Form>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
  
            <Form.Item>
              <Button className='btn' type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                注册
              </Button>
              <Link to="/login">返回登录</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
  );
};

export default RegisterForm;
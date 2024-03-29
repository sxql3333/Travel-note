import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import './index.css'
import { connect } from 'react-redux'; // 添加 Redux 的 connect
import { handleRegistration } from './actions'; // 导入 handleRegister action creator

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState(1);
  // const history = useHistory(); // 获取路由历史对象
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

const handleRegister = async() => {
  console.log("进入注册函数");
    // 构建用户信息对象
    const user = {
      name: username,
      password: password,
    };
    console.log(user);
    handleRegistration(user);
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
              <Input value={username}  onChange={handleUsernameChange} placeholder="用户名" />
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password value={password} onChange={handlePasswordChange} placeholder="密码" />
            </Form.Item>
  
            <Form.Item>
              <Button className='btn' type="primary" htmlType="submit" style={{ marginRight: '10px' }} onClick={handleRegister}>
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
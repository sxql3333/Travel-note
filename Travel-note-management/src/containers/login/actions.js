import {
  LOGIN_SUCCESS,
} from './actionTypes'
import { reqLogin } from "../../api"
import { message } from 'antd';
import store from '../../redux/store'

const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, data: user })
// import {  useNavigate} from 'react-router-dom'
// 登录处理函数
export const handleLogin = (user) => {
  // console.log("actions里面的handleLogin", user);
  // const navigate = useNavigate();
  const { username, password , auth} = user
  if (!username) {
    message.error('用户名不能为空')
    return
  }

  if (!password) {
    message.error('密码不能为空')
    return
  }
  try {
    return reqLogin({ username, password, auth }).then((response) => {
      if (response.status === 200) {
        message.success('登录成功');
        // navigate('/home');
        store.dispatch(loginSuccess(response.data)); // 使用 store.dispatch 触发 action
        return response.data;
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
  }
};


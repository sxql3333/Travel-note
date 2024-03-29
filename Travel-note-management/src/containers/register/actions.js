import {
  REGISTER_SUCCESS,
} from './actionTypes'
import { reqRegister } from "../../api"
import { message } from 'antd';
import store from '../../redux/store'
import { useDispatch } from 'react-redux';

const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, data: user })
//注册处理函数
export const handleRegistration = (user) => {
  console.log("actions里面的handleRegistration", user);
  const { name, password } = user
  if (!name) {
    message.error('用户名不能为空')
    return
  }
  if (!password) {
    message.error('密码不能为空')
    return
  }
  try {
    return reqRegister({ name, password }).then((response) => {
      if (response.status === 200) {
        message.success('注册成功');
        store.dispatch(registerSuccess(response.data));
        return response.data;
      }
    });
  } catch (error) {
    console.error('注册失败:', error);
  }
}
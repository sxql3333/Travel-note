import {
  GET_ALLDATA,
} from './actionTypes'
import { reqAllData } from "../../api"
import { message } from 'antd';
import store from '../../redux/store'

// const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, data: user })

// 获取所有数据
export const getAllData = () => {
  // console.log("actions里面的handleLogin", user);
  try {
    return reqAllData().then((response) => {
      if (response.status === 200) {
        message.success('成功获取所有数据');
        console.log("成功获取所有数据");
        console.log(response.data);
        // store.dispatch(loginSuccess(response.data)); // 使用 store.dispatch 触发 action
        return response.data;
      }
    });
  } catch (error) {
    console.error('获取失败:', error);
  }
};


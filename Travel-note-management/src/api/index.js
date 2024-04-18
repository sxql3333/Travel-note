import request from './request'
// 请求注册
export const reqRegister = (user) => request('/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => request('/login', user, 'POST')
// 获取所有游记数据
export const reqAllData = () => request('/getAllData', 'GET')
// 根据关键字进行搜索
export const reqSearch = (text) => request('app/getDataByName', { searchText: text }, 'POST')
//审核
export const checkDiary = (status) => request('/checkDiary', status, 'POST')
// 逻辑删除游记
export const  deleteDiary = (id) => request('/deleteDiary', id, 'POST')
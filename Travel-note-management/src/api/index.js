import request from './request'
// 请求注册
export const reqRegister = (user) => request('/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => request('/login', user, 'POST')
// 获取所有游记数据
export const reqAllData = () => request('/getAllData', 'GET')
//审核通过
export const reqexamin = (status) => request('/examine', status, 'POST')
// 根据关键字进行搜索
export const reqSearch = (text) => request('/getDataByName', { searchText: text }, 'POST')
import request from './request'
// 请求注册
export const reqRegister = (user) => request('/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => request('/login', user, 'POST')
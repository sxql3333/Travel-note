import ajax from './ajax'
// 请求注册
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => ajax('/login', user, 'POST')
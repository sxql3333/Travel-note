import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

export default function request(url = '', data = {}, type = 'GET') {
  if (type === 'GET') {
    // 准备 url query 参数数据
    let dataStr = '';
    Object.keys(data).forEach((key) => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    // 发送 get 请求
    return instance.get(url);
  } else {
    // 发送 post 请求
    return instance.post(url, data);
  }
}

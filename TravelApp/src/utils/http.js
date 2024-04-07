import axios from 'axios';

const baseURL = "http://localhost:5000"; 
//创建一个全局的axios实例
const httpClient = axios.create({ baseURL, timeout: 10000 });

// 封装GET请求
export const get = (url, data) => {
    return httpClient.get(url, data);
  };
  
  // 封装POST请求
  export const post = (url, data = {}) => {
    return httpClient.post(url, data);
  };
  
  // 封装PUT请求
  export const put = (url, data = {}) => {
    return httpClient.put(url, data);
  };
  
  // 封装DELETE请求
  export const deleteMethod = (url, config = {}) => {
    return httpClient.delete(url, config);
  };
  
  // 封装其他HTTP请求方法，如PUT、DELETE等，根据需要添加
  
  export default httpClient;
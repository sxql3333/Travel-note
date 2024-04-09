import axios from 'axios';
import { getUserToken,formatToken } from './auth';
const baseURL = "http://localhost:5000"; 
//创建一个全局的axios实例
const httpClient = axios.create({
  baseURL, timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
const getFullUrl = (baseUrl, url) => {
  return url?.startsWith('http') ? url : baseUrl + (url?.startsWith('/') ? '' : '/') + url;
};
const showRequestLog = config => {
  console.log('> [' + config?.method + '] >>>>>===== REQUEST START =====>>>>>');
  console.log('> [' + config?.method + '] url=', getFullUrl(config?.baseURL, config?.url));
  console.log('> [' + config?.method + '] headers=', config?.headers);
  if (config?.method === 'post') {
    console.log('> [' + config?.method + '] data=', JSON.stringify(config?.data, null, 0));
  } else {
    console.log(
      '> [' + config?.method + '] params=',
      JSON.stringify(config?.method === 'post' ? config?.data : config?.params, null, 0),
    );
  }

  console.log('> [' + config?.method + '] >>>>>===== REQUEST END =====>>>>>\n');
  console.log('\n');
};
/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
const apiWhiteList = ['/oauth2/token','/app/login','/app/register'];
// 请求拦截器，可以在请求发送前进行一些操作
httpClient.interceptors.request.use(
  async config => {
    // 不需要token，直接返回
    if (apiWhiteList.some(v => config.url.indexOf(v) > -1)) {
      showRequestLog(config);
      return config;
    }
    const data = await getUserToken();
    if (data) {
      config.headers.Authorization = formatToken(data);
    }
    showRequestLog(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// 响应拦截器，可以在接收到响应后进行一些操作
httpClient.interceptors.response.use(
  response => {
    console.log('> [' + response?.config?.method + '] >>>>>===== RESPONSE SUCCESS START =====>>>>>');
    console.log(
      '> [' + response?.config?.method + '] url=',
      getFullUrl(response?.config?.baseURL, response?.config?.url),
    );
    console.log('> [' + response?.config?.method + '] status=', response?.status);
    console.log('> [' + response?.config?.method + '] data=', JSON.stringify(response?.data, null, 0));
    console.log('> [' + response?.config?.method + '] <<<<<===== RESPONSE SUCCESS END =====<<<<<');
    console.log('\n');
    if (response?.data?.code === 202 || response?.data?.code === 200) {
      return response?.data;
    }
    if (response?.data?.code) {
      return Promise.reject(new Error(response?.data?.message));
    }
    return response?.data;
  },
  async error => {
    //region 打印错误日志
    console.log('> [' + error?.config?.method + '] >>>>>===== RESPONSE ERROR START =====>>>>>');
    console.log('> [' + error?.config?.method + '] url=', getFullUrl(error?.config?.baseURL, error?.config?.url));
    console.log('> [' + error?.config?.method + '] error=', JSON.stringify(error, null, 0));
    console.log('> [' + error?.config?.method + '] response=', JSON.stringify(error.response, null, 0));
    console.log('> [' + error?.config?.method + '] <<<<<===== RESPONSE ERROR END =====<<<<<');
    console.log('\n');
    //endregion

    // int ACCESS_REJECTED = 40001;       // 访问被拒绝  需要去登录
    // int ACCESS_TOKEN_EXPIRED = 40002;  // token过期 如果有access_token 则换取token  如果没有 access_token 直接去登录 如果获取access_token也需要去登录
    // int ACCESS_FORBIDDEN = 40003;      // 访问拒绝，没有权限
    if (error?.response?.data?.code === 40001) {
      // 跳转登录页
      RootNavigation.navigate('Login');
    } else if (error?.response?.data?.code === 40002) {
      // 保存失败的请求
      retryRequests.push(httpClient(error.response.config));
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { access_token, refresh_token } = await refreshToken();
          retryOriginalRequest(access_token);
          setUserToken(access_token, refresh_token).then();
        } finally {
          isRefreshing = false;
        }
      }
    }

    const message = error?.response?.data?.message;
    const newError = message?.length ? new Error(message) : error;
    return Promise.reject(newError);
  },
);
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
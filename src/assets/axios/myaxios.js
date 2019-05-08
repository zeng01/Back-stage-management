// 导入axios
import axios from 'axios'
// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (sessionStorage.getItem('token')) {
        // config.headers.Authorization = sessionStorage.getItem('token');
      }
   
      return config;
    },
    error => {
      return Promise.reject(error);
    });

export default axios
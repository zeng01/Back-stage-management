// 抽取axios插件
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use((config)=> {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
  }, (error)=> {
    // 对请求错误做些什么
    sessionStorage.removeItem('token')
    this.$message.error('请求错误');
    this.$router.push('login')
    return Promise.reject(error);
  });

// 抽取网络对象
const request={
    //登录
    login(params){
        return axios.post('login',params)
    },
    // 用户列表
    getUsers(params){
        return axios.get('users',{
            params,
            // headers: {'Authorization': sessionStorage.getItem('token')}
        })
    }
}

// 暴露 install方法

export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}
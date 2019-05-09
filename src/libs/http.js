// 导入vue
import Vue from 'vue'

// 抽取axios插件
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.meta.status == 200 || response.data.meta.status ==201) {
        Vue.prototype.$message.success(response.data.meta.msg);
    }else{
        new Vue().$message.error(response.data.meta.msg);
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
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
    },
    addUsers(params){
        return axios.post('users',params)
    },
    // 修改用户状态
    updateStatus(params){
        return axios.put(`users/${params.uId}/state/${params.type}`)
    },
    // 删除用户
    deleteUsers(id){
        return axios.delete(`users/${id}`)
    },
    // 编辑用户
    editUser(params){
        return axios.put(`users/${params.id}`,{
            email:params.email,
            mobile:params.mobile
        })
    },
    // 查看用户
    userInfo(id){
        return axios.get(`users/${id}`)
    }
}

// 暴露 install方法

export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}
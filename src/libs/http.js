// 抽取axios插件
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
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
            headers: {'Authorization': sessionStorage.getItem('token')}
        })
    }
}

// 暴露 install方法

export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}
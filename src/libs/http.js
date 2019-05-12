// 导入vue
import Vue from 'vue'
// 导入router
import router from '../router'
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
        sessionStorage.removeItem('token');
        router.push('/login');
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
    },
    //查看用户角色
    getRoles(){
        return axios.get('roles')
    },

    // 分配角色
    updateRoles(params){
        return axios.put(`users/${params.id}/role`,{
            rid:params.rid,
        })
    },
    // 添加角色
    addRoles(params){
        return axios.post('roles',params)
    },
    // 根据id查看角色
    getRolesById(id){
        return axios.get(`roles/${id}`)
    },

    // 编辑角色
    updateRoles(params){
        return axios.put(`roles/${params.roleId}`,{
            roleName:params.roleName,
            roleDesc:params.roleDesc
        })
    },

    // 删除角色
    deleteRoles(id){
        return axios.delete(`roles/${id}`)
    },

    // 获取权限列表list
    getRights(){
        return axios.get(`rights/list`)
    },
    // 获取权限列表tree
    getRightsTree(){
        return axios.get(`rights/tree`)
    },
    // 获取数据报表
    getReport(){
        return axios.get('reports/type/1')
    },
    // 订单列表
    getOrder(params){
        return axios.get('orders',{params})
    },
    // 删除指定权限
    delRight(params){
        return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    },
    // 角色授权
    setRight(params){
        return axios.post(`roles/${params.roleId}/rights`,{
            rids:params.rids
        })
    },
    // 左侧菜单权限
    getMenus(){
        return axios.get(`menus`)
    }
}

// 暴露 install方法

export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}
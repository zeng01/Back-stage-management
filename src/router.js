// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 使用vue-router
Vue.use(VueRouter)

// 导入组件
import login from './components/login.vue'
// 写规则
const routes=[
    {path:'/login',component:login},
    {path:'/',redirect: '/login'}
]

// 创建 router 实例，
const router = new VueRouter({
    routes 
  })

// 暴露router
export default router
// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// 使用vue-router
Vue.use(VueRouter)

// 导入组件
import login from './components/login.vue'
import index from './components/index.vue'
import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'
import params from './components/params.vue'
import categories from './components/categories.vue'
import order from './components/order.vue'
import report from './components/report.vue'

// 写规则
const routes=[
    {path:'/login',component:login},
    
    {
        path:'/',component:index,
        children:[
            {path:'',redirect: 'users'},
            {path:'users',component:users},
            {path:'roles',component:roles},
            {path:'rights',component:rights},
            {path:'goods',component:goods},
            {path:'params',component:params},
            {path:'categories',component:categories},
            {path:'order',component:order},
            {path:'report',component:report},
        ]
    },
]



// 创建 router 实例，
const router = new VueRouter({
    routes 
  })

  // 导航守卫
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = sessionStorage.getItem('token');
   
      if (token === 'null' || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  });

// 暴露router
export default router
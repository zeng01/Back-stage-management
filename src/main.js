import Vue from 'vue'
import App from './App.vue'

// 导入element-ul
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import myAxios from './assets/axios/myaxios.js'
Vue.prototype.$axios=myAxios

// 导入抽取的网络请求
import request from './libs/http'
Vue.use(request)

Vue.config.productionTip = false

// 导入router
import router from './router'
new Vue({
  render: h => h(App),
  // 挂载到vue实例
  router
}).$mount('#app')

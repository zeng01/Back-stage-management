// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// use一下
Vue.use(Vuex)

// 创建vuex实例
const store = new Vuex.Store({
    state: {
        // 菜单列表
        menuList: []
    },
    mutations: {
        getMenuList(state,newMenuList) {
            // console.log(newMenuList);
            
            // 生成新的数据赋值给菜单
            state.menuList=newMenuList
        }
    }
})

// 暴露store
export default store
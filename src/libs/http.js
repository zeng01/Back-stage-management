// 抽取axios插件
import axios from 'axios'

// 抽取网络对象
const request={
    sayHi(){
        console.log('holle');
        
    }
}

// 暴露 install方法

export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}
import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/commomStyle.css" 
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router'
import store from './store'
import "amfe-flexible";//px转rem
import "@/components/vant-prompt.js" 

import axios from "@/assets/script/axios-config.js"; //请求拦截
Vue.prototype.$axios = axios;

// flag = true 庄家， false 玩家
var flag = true,
    parameter = {}
if(flag){
    parameter = {
        "text": {
            "uId": "221",
            "uN": "18779239915",
            "ts": "1574415580984",
            "s": "iQqEBhfa7X2hvUsWHTbMy1NXo+ax6laBHnv0VQEFVtLYseZoFGcSjfMxUMckLMINd1zuVPtUjl5UBBszhr1MNaS+rVGXbwKQK2Bx3AiW/2JSoiT21bdEs8xosfIbQdM8pkhyPpnh+9RlSaWo4y6R5rDJZpZwgnfZw6YiyIXe3Z0="
        }
    }
}else{
    parameter = {
        "text": {
            "uId": "220",
            "uN": "15340521851",
            "ts": "1574822121949",
            "s": "MiwAhBr1PmHvW4j67I9BnuNQqBDg+zFje6+KHSwnpqscP5q6EK8UKeKqHFYsNQN0hwtxAnqN1Se6SsRWpC6Uk6tMxpI0FlJAGbkdNbLK/XQ8LaAE1MvObunQj/GpvCDYGeeeXL4HQ+b3nCN14KrnGLw+kcOvyR7j/p9ZeIf880w="
        }
    }
}

import { Interface } from '@/assets/script/api/Interface.js'
// 验真及app授权
Vue.prototype.$axios({
    ...Interface.usercheckReal,
    data: parameter
})
.then((response)=>{
    Vue.prototype.$axios({
        ...Interface.oauth2access_token,
        data: {
            grant_type: 'client_credentials'
        },
        headers: {
            Authorization: response.data.Basic
        }
    }) 
    .then((res)=>{
        sessionStorage.setItem('token', res.access_token)
    })
    .catch((err)=>{
        window.console.log(err, 'APP端获取授权认证');
    })
})
.catch((err)=>{
    window.console.log(err, window.console.log("验真失败!"));
})

// 图片地址拼接
import ip from '@/assets/script/api/ip.js'
Vue.filter('imgurl',(val)=>{
    return ip + '/public/uploads/' + val;
})

import requestObj from '@/assets/script/common.js';//通用请求
Vue.prototype.$request = requestObj.request;

import clipboard from 'clipboard';//复制
Vue.prototype.clipboard = clipboard;

router.afterEach(() => {
    (document.documentElement.scrollTop = 0) && (document.body.scrollTop = 0);
})

// 引入全局组件
import "@/assets/script/globalComponents.js"

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

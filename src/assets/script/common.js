/**
 * @description 通用方法
 * @author linian
 */
import axios from "axios";
import Vue from "vue";
import qs from 'querystring'

// 通用请求
const request = (params, callback, error, toast) => {
    // const bus = Vue.prototype.$eventBus;
    let tokenVal = sessionStorage.getItem("token");
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    let type = params.type.toLowerCase();
    
    if (tokenVal) {
        headers.Authorization = 'Bearer ' + tokenVal;
    }
    var obj = {
        method: type,
        url: params.url,
        headers: headers
    };
    if (type == "get") {
        obj.url = obj.url + '?' + qs.stringify( params.data)
    } else if (type == "post") {
        obj.data = params.data;
    }
    axios(obj)
        .then(res => {
            callback && callback(res);
            // if (toast == 1) {
            //     Vue.prototype.JT_toast(bus.$t(res.msg));
            // } else if (toast == 2) {
            //     Vue.prototype.JM_toast(bus.$t(res.msg), 1);
            // }
        })
        .catch(err => {
            error && error(err)
            window.console.warn(err);
            // if (toast === 4) return
            // const msg = err.msg || err
            // Vue.prototype.JT_toast(bus.$t(msg));
        });
};
export default { request };
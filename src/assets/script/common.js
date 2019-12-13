/**
 * @description 通用方法
 * @author linian
 */
import axios from "axios";
import Vue from "vue";
import qs from 'querystring'

// 通用请求
const request = (params, callback, error) => {
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
        obj.url = obj.url + '?' + qs.stringify(params.data)
    } else if (type == "post") {
        obj.data = params.data;
    }
    axios(obj)
        .then(res => {
            callback && callback(res);
        })
        .catch(err => {
            error && error(err)
            window.console.warn(err);
            const msg = err.message
            Vue.prototype.JT_toast(msg);
        });
};
export default { request };
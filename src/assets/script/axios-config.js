/**
 * @desc 配置全局请求拦截
 * @data 2019/6/21
 */

import axios from "axios";
import qs from "qs";

if (!localStorage) {
    window.console.error("此浏览器不支持本地存储，请切换高版本浏览器或最新Chrome");
}

// 拦截请求
axios.interceptors.request.use(
    config => {
        if (config.method === "post") {
            let isFileUpdata = config.headers["Content-Type"] && config.headers["Content-Type"].includes("multipart/form-data;");
            if (!isFileUpdata && config.data !== "string") {
                config.data = qs.stringify(config.data);
            }
        }
        if (config.method === "get") {
            config.params = config.data;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// 拦截响应
axios.interceptors.response.use(
    response => {
        let res = response.data;
        res.message = res.msg || res.message;
        let status = Number(res.code);
        switch (status) {
            case 0: //成功
                return res;  
            case 1: //错误
                return Promise.reject(res);
            default:
                return res;
        }
    },
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    window.console.error("接口不存在");
            }
        }
        err.msg = err.message;
        return Promise.reject(err);
    }
);
export default axios;

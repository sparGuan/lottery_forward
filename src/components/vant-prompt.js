import Vue from "vue";
import { Toast, Dialog } from "vant";

Vue.prototype.JT_toast = message => {
    Toast({ message: message, duration: 2000, icon: "" });
};
Vue.prototype.JM_toast = (message, type) => {
    if (type) {
        Toast.success(message);
    } else {
        Toast.fail(message);
    }
};

Vue.prototype.JM_dialog = (options = {}) => {
    options.title = options.title || "hello";
    options.message = options.msg;
    options.cancelButtonText = options.cancel || "取消";
    options.confirmButtonColor = options.confirmColor || "#fe445e";
    return Dialog.confirm(options);
};

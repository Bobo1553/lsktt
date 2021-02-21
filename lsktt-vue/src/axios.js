import axios from "axios";
import Element from 'element-ui';

axios.defaults.baseURL = "http://localhost:8081";

axios.interceptors.request.use(config => {
    return config;
});

axios.interceptors.response.use(response => {
        let res = response.data;

        console.log("-------------------");
        console.log(res);
        console.log("-------------------");

        if (res.code === 200) {
            return response;
        } else {
            Element.Message.error("这是一条错误消息", {duration: 1000});
            return Promise.reject(res.msg)
        }
    },
    error => {
        console.log(error);
        Element.Message.error(error.message, {duration: 1000});
        return Promise.reject(error);

    });
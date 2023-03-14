// 二次封装axios
import axios from "axios";
import store from '../store/index'

axios.defaults.baseURL = "";

axios.interceptors.request.use(
  (config) => {
    // 改变vuex中的isLoading状态数据，当为true，loading显示
    store.state.load.isLoading = true;

    return config;
  },

  (error) => {
    return Promise.error(error);
  }
);

// 响应拦截器

axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据

    // 否则的话抛出错误

    if (response.status === 200) {
      //loading隐藏

      store.state.load.isLoading = false;

      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },

  /* (error) => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  } */
);

export default axios;

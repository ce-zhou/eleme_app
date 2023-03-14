import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// 引入amfe-flexible
import "amfe-flexible";
// 引入所有axios请求
import api from "./api/ajax";
// 引入mitt,相当于全局事件总线
import mitt from "mitt";
import "./assets/main.css";
// 引入vuex中的store
import store from "./store";
// 引入图片懒加载自定义指令
import lazy from "./plugins/lazy";

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';

/* // 引入vue-socket.io
import VueSocketIO from "vue-socket.io";

import {registerSockets, destroySockets} from './plugins/socket' */
import { io } from "socket.io-client";

const app = createApp(App);
app.config.globalProperties.$http = api;
// 将mitt注册为全局可用
const bus = mitt();
app.config.globalProperties.$bus = bus;

const socket = io("http://localhost:3000");
app.config.globalProperties.$socket = socket;

app.use(createPinia());
app.use(router);
app.use(store);
app.use(lazy);
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});
app.use(VMdPreview);

app.mount("#app");

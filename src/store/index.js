import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import site from "./site";
import login from "./login";
import cart from './cart';
import service from "./service";
import load from './load'

export default createStore({
  modules: {
    site,
    login,
    cart,
    service,
    load
  },
  //配置
  plugins: [
    createPersistedState(),
    
  ],
});

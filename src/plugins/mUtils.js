// 常用的js方法
// 获取localStorage
export const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

// 存储localStorage
export const setStore = (name, context) => {
  if (!name) return;
  if (typeof context !== "string") {
    context = JSON.stringify(context);
  }
  return window.localStorage.setItem(name, context);
};

// 删除localStorage
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

// 处理图片
export const getImgPath = (path)=> {
  //传递过来的图片地址需要处理后才能正常使用
  let suffix;
      if (!path) {
        return "//elm.cangdu.org/img/default.jpg";
      }
      if (path.indexOf("jpeg") !== -1) {
        suffix = ".jpeg";
      } else {
        suffix = ".png";
      }
      let url =
        "/" +
        path.substr(0, 1) +
        "/" +
        path.substr(1, 2) +
        "/" +
        path.substr(3) +
        suffix;
      return "https://fuss10.elemecdn.com" + url;
}

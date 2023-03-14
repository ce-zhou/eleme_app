// 图片懒加载
export default function (app) {
  app.directive("lazy", {
    mounted(el) {
      let oldSrc = el.dataset.src;
      let observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 图片到达可视区时isIntersecting为true
          el.src = oldSrc;
          observer.unobserve(el); // 只需要监听一次即可，第二次滑动到可视区域时候不在监听
        }
      });
      // 开始观察
      observer.observe(el)
    },
  });
}

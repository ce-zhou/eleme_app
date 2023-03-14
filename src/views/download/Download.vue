<template>
  <Header headTitle="下载"></Header>
  <div class="main">
    <section class="dowload_container">
      <img src="../../images/elmlogo.jpeg" class="logo_img" />
      <p>下载饿了么APP</p>
      <div class="determine" @click="downLoad">下载</div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import Header from "../../components/header/Header.vue";
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

const download = reactive({
  system: null,
});

let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (isAndroid) {
  download.system = "Android";
} else if (isIOS) {
  download.system = "IOS";
} else {
  download.system = "pc";
}

// 点击登录
function downLoad() {
  if (download.system == "IOS") {
    showDialog({
        message: "IOS用户请前往AppStore下载",
        theme: "round-button",
      }).then(() => {
        // on close
      });
  } else {
    try {
      let elemIF = document.createElement("iframe");
      elemIF.src = "http://cangdu.org/files/elm.apk";
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    } catch (e) {
      showDialog({
        message: "下载失败",
        theme: "round-button",
      }).then(() => {
        // on close
      });
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  padding: 80px 30px 0;
  background-color: #fff;
  text-align: center;
}
.dowload_container {
  margin-top: 50px;
  img {
    width: 180px;
    border-radius: 40px;
  }
  p {
    color: #666;
    font-size: 38px;
    margin-bottom: 46px;
  }
  .determine {
    width: 100%;
    height: 84px;
    line-height: 84px;
    background-color: #4cd964;
    border-radius: 10px;
    color: #fff;
    font-size: 32px;
  }
}
</style>
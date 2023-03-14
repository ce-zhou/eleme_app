<template>
  <div id="footerBox">
    <div class="guide_item" @click="gotoAddress('/home')">
      <van-icon class="icon_style" color="#119fff" name="wap-home-o" />
      <span>首页</span>
    </div>
    <div  class="guide_item" @click="gotoAddress('/search')">
      <van-icon class="icon_style" name="shopping-cart-o"  />
      <span>搜索</span>
    </div>
    <div class="guide_item" @click="gotoAddress('/order')">
      <van-icon class="icon_style" name="balance-list-o"  />
      <span>订单</span>
    </div>
    <div class="guide_item" @click="gotoAddress('/mine')">
      <van-icon class="icon_style" name="user-o" />
      <span>我的</span>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
let color = ''
// 点击图标，跳转地址
function gotoAddress(path) {
  router.push(path)
}
</script>

<style lang="less" scoped>
#footerBox {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #fff;
  border-top: 0.5px solid #ccc;
  font-size: 16px;
  z-index: 2;
}
.guide_item {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    span {
      margin-top: 2px
    }
}
.icon_style {
  font-size: 34px;
}
.icon_style:hover {
  color:#119fff;
}
</style>
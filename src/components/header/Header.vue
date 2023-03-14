<template>
  <div class="header_box">
    <van-icon class="icon_left" name="arrow-left" @click="goBack"/>
    <span>{{props.headTitle}}</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['headTitle'])
function goBack() {
  router.back()
}
</script>

<style lang="less" scoped>
.header_box {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    background-color: #ffd101;
    font-size: 34px;
    color: #fff;
    text-align: center;
    line-height: 80px;
    z-index: 2;
    .icon_left {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
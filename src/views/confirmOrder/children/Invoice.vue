<template>
  <Header headTitle="选择发票"></Header>
  <div class="container">
    <div class="top">
      <span>不需要开发票</span>
      <van-switch v-model="checked" @change="reflect"/>
    </div>
    <van-button round block type="primary" native-type="submit" class="determine" @click="confrimInvoice">
      确定
    </van-button>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

const checked = ref(true);
const router = useRouter();
const store = useStore();
const invoice = reactive({
    radio: true
})

function reflect(value) {
    invoice.radio = value
}

function confrimInvoice() {
    store.commit('cart/confirmInvoice', invoice.radio)
    router.back()
}
</script>

<style lang="less" scoped>
.container {
  padding: 90px 10px 0;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  span {
    font: 36px Helvetica Neue, Tahoma, Arial;
  }
}
</style>
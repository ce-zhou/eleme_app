<template>
  <Header headTitle="兑换红包"></Header>
  <div class="main">
    <form class="exchange_code">
      <input
        type="text"
        placeholder="请输入兑换码"
        v-model="change.exchangeCode"
        class="exchange_input"
      />
      <section class="input_container">
        <input
          type="text"
          placeholder="验证码"
          maxlength="4"
          v-model="change.codeNumber"
        />
        <div class="img_change_img">
          <img v-show="change.captchaCodeImg" :src="change.captchaCodeImg" />
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清?</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <van-button
      class="determine"
      round
      block
      native-type="submit"
      @click="exchange"
      :class="{ active: status }"
    >
      兑换
    </van-button>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { reactive, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

const store = useStore();
const { proxy } = getCurrentInstance();
const login = proxy.$http.login;
const benefit = proxy.$http.benefit;
const change = reactive({
  exchangeCode: "", // 兑换码
  captchaCodeImg: "", // 验证码图片
  codeNumber: "", // 验证码
});
const userInfo = store.state.login.userInfo;

// 验证兑换码和验证码
const status = computed(() => {
  let status =
    /^\d+$/gi.test(change.exchangeCode) && /^\w{4}$/gi.test(change.codeNumber);
  return status;
});

// 获取图片验证码
async function getCaptchas() {
  const { data: res } = await login.getCaptchas();
  change.captchaCodeImg = res.code;
}
getCaptchas();

// 换一张验证码
function getCaptchaCode() {
  getCaptchas();
}

// 兑换红包
async function exchange() {
  if (status.value) {
    const { data: res } = await benefit.exChangeHongbao(
      userInfo.user_id,
      change.exchangeCode,
      change.codeNumber
    );
    if (res.message) {
      showDialog({
        message: res.message,
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
  padding: 120px 24px;
}
.exchange_input {
  width: 100%;
  border: 0;
  background-color: #fff;
  padding: 28px 18px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 32px;
}
section {
  display: flex;
  input {
    width: 412px;
    border: 0;
    border-radius: 6px;
    padding: 28px 18px;
    margin: 0 10px 30px 0;
    font-size: 32px;
  }
  .img_change_img {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 103px;
    width: 276px;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px;
    img {
      width: 164px;
      height: 70px;
    }
  }
}
.determine {
  color: #fff;
  font-size: 32px;
  background-color: #ccc;
}
.active {
  background-color: #4cd964;
}
</style>
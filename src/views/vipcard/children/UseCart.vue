<template>
  <Header headTitle="兑换会员"></Header>
  <div class="main">
    <p class="buy_for">
      成功兑换后将关联到当前帐号:
      <span>{{ userInfo.username }}</span>
    </p>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="useCart.cartNumber"
          name="卡号"
          placeholder="请输入10位卡号"
        />
        <van-field
          v-model="useCart.passWord"
          type="password"
          name="卡密"
          placeholder="请输入6位卡密"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block 
        class="determine" native-type="submit" :class="{could_pay: couldPay}"
        @click="confrimPay">
          兑换
        </van-button>
      </div>
    </van-form>
    <footer class="binding">
      <h3>——温馨提示——</h3>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：<b>30次</b>减免配送费。</p>
      <p>季卡：<b>90次</b>减免配送费。</p>
      <p>年卡：<b>360</b>次减免配送费。</p>
      <p>
        ＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）
      </p>
    </footer>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { useStore } from "vuex";
import { reactive, computed, getCurrentInstance } from "vue";
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

const store = useStore();
const {proxy} = getCurrentInstance()
const vip = proxy.$http.vipCart
const userInfo = store.state.login.userInfo;
const useCart = reactive({
  cartNumber: '',
  passWord: '',
})

// 校验卡号和卡密
const couldPay = computed(()=> {
  let couldPay = /^\d{10}$/.test(useCart.cartNumber) && /^\d{6}$/.test(useCart.passWord)
  return couldPay
})

// 当验证通过后，向后端提交
async function confrimPay() {
  if (couldPay.value) {
    const {data: res} = await vip.vipCart(userInfo.id, useCart.cartNumber, useCart.passWord)
    // console.log(res);
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
  padding: 80px 10px 20px;
}
.buy_for {
  height: 94px;
  line-height: 94px;
  padding-left: 20px;
  color: #666;
  font-size: 28px;
  span {
    color: #333;
    font-weight: 700;
    margin-left: 10px;
  }
}
.binding{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  color: #AAA;
  font-size: 30px;
  h3 {
    margin-bottom: 20px;
  }
  p {
    font-size: 22px;
    margin-bottom: 20px;
  }
}
.determine {
  color: #fff;
  background-color: #CCC;
}
.could_pay {
  background-color: #4cd964;
}
</style>
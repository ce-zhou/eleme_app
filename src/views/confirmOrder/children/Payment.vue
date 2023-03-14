<template>
  <Header headTitle="在线支付"></Header>
  <div class="main">
    <div class="top">
      <header class="time_last">支付剩余时间</header>
      <van-count-down
        class="time"
        @finish="timeFinish"
        :time="time"
        format="HH:mm:ss"
      />
    </div>
    <div class="middle">选择支付方式</div>
    <div class="bottom">
      <section class="pay_item">
        <div class="pay_icon_contaienr">
          <svg class="icon zhifubao" aria-hidden="true">
            <use xlink:href="#icon-zhifubao"></use>
          </svg>
          <span>支付宝</span>
        </div>
        <van-radio-group @change="radioChange" v-model="checked">
          <van-radio name="1"></van-radio>
        </van-radio-group>
      </section>
      <section class="pay_item pay_weixin">
        <div class="pay_icon_contaienr">
          <svg class="icon zhifubao" aria-hidden="true">
            <use xlink:href="#icon-weixin"></use>
          </svg>
          <span>微信</span>
        </div>
        <van-radio-group v-model="checked">
          <van-radio name="2"></van-radio>
        </van-radio-group>
      </section>
    </div>
    <div class="btn_container">
      <button class="determine" @click="confrimPay">确认支付</button>
    </div>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { reactive, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { showDialog } from "vant";
import "vant/es/dialog/style";

const store = useStore();
const router = useRouter();
const time = ref(1 * 15 * 60 * 1000);
const checked = ref("1");
const orderMessage = store.state.cart.orderMessage;
const userInfo = store.state.login.userInfo;
const shopId = store.state.cart.shopId;
const { proxy } = getCurrentInstance();
const order = proxy.$http.order;
const pay = reactive({
  payWay: 1, // 付款方式
  payDetail: null, //付款信息详情
});

// 清空购物车
store.commit('cart/clearCart')
//  重新发送订单验证码
async function reSend() {
  const { data: res } = await order.payRequest(
    orderMessage.status,
    userInfo.user_id
  );
  pay.payDetail = res;
  if (pay.payDetail.message) {
    showDialog({
      message: pay.payDetail.message,
      theme: "round-button",
    }).then(() => {
      // on close
    });
  }
}
reSend();
// 倒计时结束后触发
function timeFinish() {
  showDialog({
    message: "支付超时",
    theme: "round-button",
  }).then(() => {
    // on close
  });
}
function radioChange(value) {
  pay.payWay = value;
}

// 确认支付
function confrimPay() {
    showDialog({
    message: "当前环境无法支付，请打开官方APP进行付款",
    theme: "round-button",
  }).then(() => {
    // on close
    router.push('/order')
  });
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.top {
  height: 240px;
  padding: 30px;
  background-color: #fff;
  text-align: center;
  .time_last {
    margin: 30px 0;
    color: #666;
    font-size: 30px;
  }
  .time {
    font-size: 70px;
  }
}
.middle {
  height: 84px;
  line-height: 84px;
  color: #666;
  font-size: 32px;
}
.bottom {
  background-color: #fff;
  padding: 20px;
  .pay_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .zhifubao {
      width: 80px;
      height: 80px;
      vertical-align: middle;
    }
    span {
      color: #666;
      font-size: 32px;
      margin-left: 20px;
    }
  }
  .pay_weixin {
    margin-top: 30px;
  }
}
.btn_container {
  display: flex;
  justify-content: end;
}
.determine {
  border: 0;
  margin-top: 20px;
  padding: 10px 40px;
  border-radius: 10px;
  background-color: #4cd964;
  color: #fff;
  font-size: 36px;
}
</style>
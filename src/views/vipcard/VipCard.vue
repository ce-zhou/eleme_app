<template>
  <Header headTitle="会员中心"></Header>
  <div class="main">
    <div class="buy_for">
      为账户
      <span>{{ userInfo.username }}</span>
      购买会员
    </div>
    <div class="vip_prerogative">
      <section class="header_style">
        <span>会员特权</span>
        <div class="header_right">
          <img src="../../images/description.png" alt="" />
          <span>会员说明</span>
        </div>
      </section>
      <section class="vip_detail">
        <img src="../../images/sheng.jpeg" alt="" />
        <div class="vip_detail_right">
          <h4>减免配送费</h4>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </section>
      <section class="vip_detail">
        <img src="../../images/jifen.jpeg" alt="" />
        <div class="vip_detail_right">
          <h4>减免配送费</h4>
          <p>每月减免30单，每日可减免3单，每单最高减4元</p>
          <p>蜂鸟专送专享</p>
        </div>
      </section>
    </div>
    <div class="apply_vip">
      <header>
        <span>开通会员</span>
      </header>
      <section class="apply_vip_buy">
        <div class="apply_vip_buy_left">
          <span>1个月</span>
          <span> ¥20</span>
        </div>
        <div class="apply_vip_buy_right" @click="buyCart">购买</div>
      </section>
    </div>
    <router-link to="/vipcard/useCart" class="common_style">
      <span class="header_left">兑换会员</span>
      <section class="header_right">
        <span>使用卡号卡密</span>
        <van-icon name="arrow" class="icon_right" />
      </section>
    </router-link>
    <router-link to="/vipcard/invoiceRecord" class="common_style">
      <span class="header_left">购买记录</span>
      <section class="header_right">
        <span>开发票</span>
        <van-icon name="arrow" class="icon_right" />
      </section>
    </router-link>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const userInfo = store.state.login.userInfo;

function buyCart() {
    router.push('/confirmOrder/payment')
}
</script>

<style lang="less" scoped>
.main {
  padding: 80px 10px 20px;
}
.buy_for {
  height: 92px;
  line-height: 92px;
  padding-left: 20px;
  color: #666;
  font-size: 28px;
  span {
    color: #333;
    font-weight: 700;
  }
}
.vip_prerogative {
  background-color: #fff;
  padding: 0 20px;
}
.header_style {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #eee;
  span {
    color: #333;
    font-size: 32px;
  }
  .header_right {
    img {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-right: 10px;
    }
    span {
      color: #3190e8;
      font-size: 26px;
    }
  }
}
.vip_detail {
  display: flex;
  align-items: center;
  padding: 37px 0;
  border-bottom: 1px solid #eee;
  img {
    width: 75px;
    height: 84px;
    margin-right: 20px;
  }
  h4 {
    font-size: 32px;
  }
  p {
    color: #999;
    font-size: 24px;
  }
}
.apply_vip {
  margin-top: 20px;
  background-color: #fff;
  padding: 0 20px;
  header {
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    font-size: 32px;
  }
}
.apply_vip_buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  font-size: 32px;
  .apply_vip_buy_right {
    padding: 10px 30px;
    border: 1px solid #f60;
    border-radius: 10px;
    color: #f60;
    font-size: 28px;
  }
  span {
    &:nth-child(2) {
      color: #f60;
      font-weight: 700;
    }
  }
}
.common_style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-top: 20px;
  padding: 0 20px;
  .header_left {
    padding: 30px 0;
    color: #333;
    font-size: 32px;
  }
  .icon_right,
  span {
    color: #999;
    font-size: 28px;
  }
}
</style>
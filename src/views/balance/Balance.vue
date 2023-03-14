<template>
  <Header headTitle="我的余额"></Header>
  <div class="main">
    <div class="balanceBox">
      <div class="content_header">
        <span class="content_title_style">当前余额</span>
        <section>
          <img src="../../images/description.png" alt="" />
          <span class="yue">余额说明</span>
        </section>
      </div>
      <p class="content_num">
        <span>0.00</span>
        <span>元</span>
      </p>
      <van-button round block color="#CCC" native-type="submit">
        提现
      </van-button>
    </div>
    <div>
        <span class="deal_detail">交易明细</span>
    </div>
    <div class="no_log">
        <img src="../../images/no-log.png" alt="">
        <p>暂无明细记录</p>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.balanceBox {
  width: 100%;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  .content_header {
    display: flex;
    justify-content: space-between;
    .content_title_style {
      color: #666;
      font-size: 26px;
    }
    img {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .yue {
      color: #3190e8;
      font-size: 26px;
    }
  }
  .content_num {
    font-size: 84px;
    margin-bottom: 45px;
    span {
      &:nth-child(2) {
        font-size: 32px;
        margin-left: 15px;
      }
    }
  }
}
.deal_detail {
    height: 92px;
    line-height: 92px;
    color: #999;
    font-size: 28px;
    padding: 20px;
}
.no_log {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    img {
        width: 375px;
        margin-bottom: 24px;
    }
    p {
        color: #666;
        font-size: 32px;
    }
}
</style>
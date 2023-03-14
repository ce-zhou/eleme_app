<template>
  <Header headTitle="我的积分"></Header>
  <div class="main">
    <div class="balanceBox">
      <div class="content_header">
        <span class="content_title_style">当前积分</span>
        <section>
          <img src="../../images/description.png" alt="" />
          <span class="yue">积分说明</span>
        </section>
      </div>
      <p class="content_num">
        <span>0</span>
        <span>分</span>
      </p>
      <van-button
        round
        block
        color="#fe6d47"
        native-type="submit"
        @click="usePoint"
      >
        积分兑换商品
      </van-button>
    </div>
    <div>
      <span class="deal_detail">最近30天积分纪录</span>
    </div>
    <div class="no_log">
      <img src="../../images/no-log.png" alt="" />
      <p>最近30天无积分纪录</p>
      <p class="two">快去下单赚取大量积分吧</p>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { showDialog } from "vant";
import "vant/es/dialog/style";

function usePoint() {
  showDialog({
    message: "快去下单赚取大量积分吧",
    theme: "round-button",
  }).then(() => {
    // on close
  });
}
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
    margin-bottom: 35px;
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
  .two {
    color: #999;
    font-size: 24px;
    margin-top: 24px;
  }
}
</style>
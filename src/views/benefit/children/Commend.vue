<template>
  <Header headTitle="推荐有奖"></Header>
  <div class="main">
    <section class="activity_banner">
      <img src="../../../images/activity.png" alt="" />
    </section>
    <section class="invite_firend">
      <div class="invite_firend_style">
        <img src="../../../images/weixin.png" @click="fenxiang" />
        <p>邀请微信好友</p>
      </div>
      <div class="invite_firend_style">
        <img src="../../../images/qq.png" @click="fenxiang" />
        <p>邀请QQ好友</p>
      </div>
      <div class="invite_firend_style">
        <img src="../../../images/fenxiang.png" @click="fenxiang" />
        <p>面对面邀请</p>
      </div>
    </section>
    <section class="invite_num">
      <div class="invite_num_style">
        <p>累计收益</p>
        <p><span>0</span>元</p>
      </div>
      <div class="invite_num_style invite_people">
        <p>成功邀请</p>
        <p><span>0</span>人</p>
      </div>
    </section>
    <p class="income_detail">-收益明细-</p>
    <section class="incom_tips">
      <img src="../../../images/qianbao.png" />
      <p>还不赶紧去邀请好友</p>
    </section>
  </div>
</template>

<script setup>
import HeaderVue from "../../../components/header/Header.vue";
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

function fenxiang() {
    showDialog({
        message: '请在饿了么APP中打开',
        theme: "round-button",
      }).then(() => {
        // on close
      });
}
</script>

<style lang="less" scoped>
.main {
  padding: 80px 0 30px 0;
}
.activity_banner {
  img {
    width: 100%;
    height: 380px;
  }
}
.invite_firend {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 46px 0;
  font-size: 24px;
  img {
    width: 117px;
  }
}
.invite_num {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  .invite_num_style {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      color: #666;
      font-size: 24px;
    }
    span {
      color: #ff5633;
      font-size: 38px;
      font-weight: 700;
    }
  }
  .invite_people {
    span {
      color: #666;
    }
  }
}
.income_detail {
  margin-top: 46px;
  text-align: center;
  color: #666;
  font-size: 24px;
}
.incom_tips {
  margin: 46px 0;
  text-align: center;
  img {
    width: 60px;
  }
  p {
    color: #999;
    font-size: 24px;
  }
}
</style>
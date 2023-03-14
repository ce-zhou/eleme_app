<template>
  <Header :headTitle="mine.profiletitle"></Header>
  <div class="main">
    <router-link
      class="top"
      :to="userInfo && userInfo.user_id ? '/mine/info' : '/mine/login'"
    >
      <img
        :src="mine.imgBaseUrl + mine.avatar"
        class="privateImage"
        v-if="userInfo && userInfo.user_id"
      />
      <svg v-else class="icon avatar" aria-hidden="true">
        <use xlink:href="#icon-touxiang"></use>
      </svg>
      <section>
        <div class="login">{{ mine.username }}</div>
        <div>
          <svg class="icon phone" aria-hidden="true">
            <use xlink:href="#icon-shouji"></use>
          </svg>
          <span class="bind">暂无绑定手机号</span>
        </div>
      </section>
      <van-icon class="mine_icon" name="arrow" />
    </router-link>
    <div class="middle">
      <router-link to="/balance" class="mid_first total_top">
        <div class="my_balance">
          {{ parseInt(mine.balance).toFixed(2) }}
          <b>元</b>
        </div>
        <span class="mid_bottom">我的余额</span>
      </router-link>
      <router-link to="/benefit" class="mid_second total_top">
        <div class="my_count">
          {{ mine.count }}
          <b>个</b>
        </div>
        <span class="mid_bottom">我的优惠</span>
      </router-link>
      <router-link to="/points" class="mid_third total_top">
        <div class="my_points">
          {{ mine.pointNumber }}
          <b>分</b>
        </div>
        <span class="mid_bottom">我的积分</span>
      </router-link>
    </div>
    <div class="bottom_one bottom">
      <!-- 我的订单 -->
      <router-link to="/order" class="my_order">
        <svg class="icon dingdan" aria-hidden="true">
          <use xlink:href="#icon-xingzhuanggongnengtubiao-"></use>
        </svg>
        <span>我的订单</span>
        <van-icon class="icon_left" name="arrow" />
      </router-link>
      <!-- 积分商城 -->
      <a href='https://home.m.duiba.com.cn/#/chome/index' class="my_order">
        <svg class="icon dingdan" aria-hidden="true">
          <use xlink:href="#icon-gouwu"></use>
        </svg>
        <span>积分商城</span>
        <van-icon class="icon_left" name="arrow" />
      </a>
      <!-- 饿了么会员卡 -->
      <router-link to="/vipcard" class="my_order">
        <svg class="icon dingdan" aria-hidden="true">
          <use xlink:href="#icon-huiyuan"></use>
        </svg>
        <span>饿了么会员卡</span>
        <van-icon class="icon_left" name="arrow" />
      </router-link>
    </div>
    <div class="bottom_two bottom">
      <!-- 服务中心 -->
      <router-link to="/service" class="my_order">
        <svg class="icon dingdan" aria-hidden="true">
          <use xlink:href="#icon-tesefuwu"></use>
        </svg>
        <span>服务中心</span>
        <van-icon class="icon_left" name="arrow" />
      </router-link>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import Footer from "../../components/footer/Footer.vue";
import { useStore } from "vuex";
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const mine = reactive({
  profiletitle: "我的",
  balance: 0, //我的余额
  count: 0, //优惠券个数
  pointNumber: 0,
  // 登陆的用户名
  username: "登录/注册",
  avatar: "", //头像地址
  imgBaseUrl: "https://elm.cangdu.org/img/",
});
const userInfo = computed(() => store.state.login.userInfo);

function initData() {
  if (userInfo && userInfo.value.user_id) {
    mine.username = userInfo.value.username;
    mine.avatar = userInfo.value.avatar;
    mine.balance = userInfo.value.balance;
    mine.count = userInfo.value.gift_amount;
    mine.pointNumber = userInfo.value.point;
  } else {
    mine.username = "登录/注册";
  }
}

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.main {
  padding: 80px 10px;
}
.top {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 20px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  color: #333;
}
.login {
  font-size: 36px;
  font-weight: 700;
}
.privateImage {
  border-radius: 50%;
}
.privateImage,
.avatar {
  width: 115px;
  height: 115px;
  margin-right: 10px;
}
.phone {
  width: 36px;
  height: 40px;
  vertical-align: middle;
}
.bind {
  font-size: 26px;
}
.mine_icon {
  position: absolute;
  right: 10px;
  font-size: 30px;
  font-weight: 700;
}
.middle {
  display: flex;
  margin-top: 10px;
  background-color: #fff;
  .total_top {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    &:nth-child(-n + 2) {
      border-right: 1px solid #eee;
    }
  }
  .my_balance {
    color: #f90;
  }
  .my_count {
    color: #ff5f3e;
  }
  .my_points {
    color: #6ac20b;
  }

  .my_balance,
  .my_count,
  .my_points {
    font: 700 56px Helvetica Neue, Tahoma;
    b {
      color: #333;
      font: 26px Helvetica Neue, Tahoma, Arial;
    }
  }
  .mid_bottom {
    color: #666;
    font: 28px Helvetica Neue, Tahoma, Arial;
    padding: 20px 0;
  }
}
.bottom {
  margin-top: 10px;
  background-color: #fff;
  .my_order {
    display: flex;
    position: relative;
    padding: 20px;
    .dingdan {
      width: 50px;
      height: 50px;
    }
    span {
      padding-left: 10px;
      color: #333;
      font: 32px Helvetica Neue, Tahoma, Arial;
    }
    .icon_left {
      position: absolute;
      right: 0;
      color: #333;
      font-size: 30px;
      line-height: 48px;
    }
  }
}
</style>
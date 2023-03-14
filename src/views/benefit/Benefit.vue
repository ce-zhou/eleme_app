<template>
  <Header headTitle="我的优惠"></Header>
  <div class="main">
    <van-tabs v-model:active="benefit.active">
      <van-tab title="红包">
        <div class="container">
          <div class="hongbao_title">
            <section>
              有
              <span>{{ benefit.hongbaoList.length }}</span>
              个红包即将到期
            </section>
            <section @click="benefit.show = true">
              <img src="../../images/description.png" alt="" />
              <span class="hongbao_detail">红包说明</span>
              <van-overlay :show="benefit.show" @click="benefit.show = false">
                <div class="wrapper" @click.stop>
                  <div class="block">
                    <span class="block_hongbao">红包说明</span>
                    <div>
                      <HbDescription></HbDescription>
                    </div>
                  </div>
                </div>
              </van-overlay>
            </section>
          </div>
          <div>
            <ul class="hongbao_list_ul">
              <li
                class="hongbao_list_li"
                v-for="item in benefit.hongbaoList"
                :key="item.id"
              >
                <section class="list_item">
                  <div class="list_container">
                    <div class="list_item_left">
                      <span>¥</span>
                      <span>{{ String(item.amount).split(".")[0] }}</span>
                      <span>.</span>
                      <span>{{ String(item.amount).split(".")[1] || 0 }}</span>
                      <p>{{ item.description_map.sum_condition }}</p>
                    </div>
                    <div class="list_item_right">
                      <h4>{{ item.name }}</h4>
                      <p>{{ item.description_map.validity_periods }}</p>
                      <p>{{ item.description_map.phone }}</p>
                    </div>
                  </div>
                  <div class="time_left">
                    {{ item.description_map.validity_delta }}
                  </div>
                </section>
                <footer v-if="item.limit_map">
                  <p>{{ item.limit_map.restaurant_flavor_ids }}</p>
                </footer>
              </li>
            </ul>
            <router-link to="/benefit/hbHistory" class="history_hongbao">
              <span class="check_history">查看历史红包</span>
              <van-icon name="arrow" class="icon_history" />
            </router-link>
          </div>
          <div class="footer">
            <router-link to="/benefit/exchange" class="hongbao_style"
              >兑换红包</router-link
            >
            <router-link to="/benefit/commend" class="hongbao_style"
              >推荐有奖</router-link
            >
          </div>
        </div>
      </van-tab>
      <van-tab title="商家代金卷">
        <div class="container1">
          <section class="hongbao_description voucher_header">
            <img src="../../images/description.png" />
            <router-link to="/benefit/coupon" class="hongbao_detail">
              商家代金券说明
            </router-link>
          </section>
          <section class="unable_use">
            <img src="../../images/voucher.png" height="170" width="300" />
            <p>无法使用代金券</p>
            <p class="fei">非客户端或客户端版本过低</p>
            <router-link to="/download" class="download_app">
              下载或升级客户端
            </router-link>
          </section>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import Header from "../../components/header/Header.vue";
import HbDescription from "./children/HbDescription.vue";
import { useStore } from "vuex";

const store = useStore();
const { proxy } = getCurrentInstance();
const bene = proxy.$http.benefit;
const benefit = reactive({
  active: 0,
  show: false,
  // 红包数量列表
  hongbaoList: [],
});
const userInfo = store.state.login.userInfo;

// 初始化红包列表
async function getHongbaoNum() {
  if (userInfo) {
    const { data: res } = await bene.getHongbaoNum(userInfo.user_id);
    console.log(res);
    benefit.hongbaoList = res;
  }
}
getHongbaoNum();
</script>

<style lang="less" scoped>
.main {
  padding: 80px 0 100px 0;
}
.container {
  padding: 0 32px;
  text-align: center;
}
.hongbao_title {
  display: flex;
  justify-content: space-between;
  height: 94px;
  line-height: 94px;
  section {
    color: #666;
    font-size: 24px;
    span {
      color: #ff5340;
    }
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
      vertical-align: middle;
    }
    .hongbao_detail {
      color: #3190ea;
    }
  }
}
.hongbao_list_li {
  //   justify-content: space-between;
  background: #fff url(../../images/hongbao.png) repeat-x;
  margin-bottom: 20px;
  border-radius: 15px;
  .list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 194px;
    padding: 0 24px;
    .list_container {
      display: flex;
    }
    .list_item_left {
      padding-right: 58px;
      border-right: 1px solid #eee;
    }
    .list_item_right {
      padding-left: 40px;
    }
    span {
      color: #ff5340;
      font: 700 36px Helvetica Neue, Tahoma, Arial;
      &:nth-child(2) {
        font-size: 70px;
        font-weight: 400;
      }
      &:nth-child(4) {
        font-size: 38px;
      }
    }
    p {
      color: #999;
      font: 18px Helvetica Neue, Tahoma, Arial;
    }
    h4 {
      color: #666;
      font-size: 32px;
      margin-bottom: 5px;
    }
    .time_left {
      color: #ff5340;
      font-size: 35px;
    }
  }
  footer {
    height: 60px;
    line-height: 60px;
    background-color: #f9f9f9;
    padding: 0 24px;
    p {
      color: #999;
      font-size: 18px;
    }
  }
}
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: #fff;
  .hongbao_style {
    color: #555;
    font-size: 32px;
  }
}
.icon_history,
.check_history {
  color: #999;
  font-size: 24px;
  margin-right: 10px;
}
.container1 {
  position: relative;
  padding: 20px 24px 0;
  text-align: center;
  .hongbao_description {
    position: absolute;
    right: 24px;
  }
  img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .hongbao_detail {
    color: #3190ea;
  }
  .unable_use {
    margin-top: 185px;
    img {
      width: 280px;
      height: 160px;
    }
    p {
      margin-top: 12px;
      color: #666;
      font-size: 32px;
    }
    .fei {
      color: #999;
      font-size: 26px;
      margin-bottom: 20px;
    }
    .download_app {
      padding: 14px;
      border-radius: 10px;
      color: #fff;
      font-size: 30px;
      background-color: #56d176;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 30px;
  padding: 0 20px;
  overflow-y: scroll;
  text-align: left;
  .block_hongbao {
    color: #333;
    font-size: 34px;
    font-weight: 600;
  }
}
</style>
<template>
  <Header headTitle="历史红包"></Header>
  <div class="main">
    <ul>
      <li
        class="hongbao_list_li"
        v-for="item in history.expiredList"
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
          <svg class="icon icon_guoqi" aria-hidden="true">
            <use xlink:href="#icon-yiguoqi"></use>
          </svg>
        </section>
        <footer v-if="item.limit_map">
          <p>{{ item.limit_map.restaurant_flavor_ids }}</p>
        </footer>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { useStore } from "vuex";
import { getCurrentInstance, reactive } from "vue";

const store = useStore();
const { proxy } = getCurrentInstance();
const benefit = proxy.$http.benefit;
const userInfo = store.state.login.userInfo;
const history = reactive({
  expiredList: [], // 历史红包
});

// 获取历史红包
async function getHistoryHb() {
  const { data: res } = await benefit.getHistoryHb(userInfo.user_id);
  history.expiredList = res;
}
getHistoryHb();
</script>

<style lang="less" scoped>
.main {
  padding: 120px 20px 20px;
}
.hongbao_list_li {
  //   justify-content: space-between;
  background: #fff url(../../../images/expired.png) repeat-x;
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
      color: #ccc;
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
    .icon_guoqi {
        width: 130px;
        height: 130px;
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
</style>
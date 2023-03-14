<template>
  <Header headTitle="订单详情"></Header>
  <div class="main">
    <div class="top">
      <img :src="detail.imgBaseUrl + orderDetail.restaurant_image_url" alt="" />
      <div>{{ orderDetail.status_bar.title }}</div>
      <router-link
        :to="{
          path: '/shop',
          query: { geohash, id: orderDetail.restaurant_id },
        }"
        class="order_again"
        >再来一单</router-link
      >
    </div>
    <div class="bottom">
      <router-link
        class="food_list_header"
        :to="{
          path: '/shop',
          query: { geohash, id: orderDetail.restaurant_id },
        }"
      >
        <div class="shop_name">
          <img
            :src="detail.imgBaseUrl + orderDetail.restaurant_image_url"
            alt=""
          />
          <span>{{ orderDetail.restaurant_name }}</span>
        </div>
        <van-icon name="arrow" class="icon_left" />
      </router-link>
      <ul class="food_list_ul">
        <li
          v-for="(item, index) in orderDetail.basket.group[0]"
          :key="index"
          class="food_list_li"
        >
          <p>{{ item.name }}</p>
          <div>
            <span>X{{ item.quantity }}</span>
            <span class="quantity_price">¥{{ item.price }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import Header from "../../../components/header/Header.vue";
import { useStore } from "vuex";

const store = useStore();
const detail = reactive({
  imgBaseUrl: "https://elm.cangdu.org/img/",
});
const orderDetail = store.state.cart.orderDetail;
const geohash = store.state.site.geohash;
console.log(orderDetail);
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 32px;
  img {
    width: 145px;
    height: 145px;
    border-radius: 50%;
  }
  div {
    margin-top: 18px;
    font: 700 42px Helvetica Neue, Tahoma, Arial;
  }
  .order_again {
    padding: 6px 10px;
    border: 1px solid #3190e8;
    border-radius: 10px;
    margin-top: 24px;
    color: #3190e8;
    font-size: 28px;
  }
}
.bottom {
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
  .food_list_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .shop_name {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    span {
      color: #333;
      font: 700 36px Helvetica Neue, Tahoma, Arial;
    }
    .icon_left {
      color: #333;
      font-size: 30px;
    }
  }
  .food_list_ul {
    padding: 10px 0;
    .food_list_li {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      p {
        color: #666;
        font-size: 28px;
      }
      span {
        color: #CCC;
        font-size: 28px;
      }
      .quantity_price {
        color: #666;
        margin-left: 10px;
      }
    }
  }
}
</style>
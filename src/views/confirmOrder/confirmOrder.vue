<template>
  <Header headTitle="确认订单"></Header>
  <div class="main">
    <div class="top">
      <svg class="icon dingwei" aria-hidden="true">
        <use xlink:href="#icon-dingwei1"></use>
      </svg>
      <div class="order">
        <div class="order_top">
          <span class="name">{{ order.chooseAddress.name }}</span>
          <span>{{ order.chooseAddress.sex == 1 ? "先生" : "女士" }}</span>
          <span>{{ order.chooseAddress.phone }}</span>
        </div>
        <div class="order_bottom">
          <span class="gongsi" v-if="order.chooseAddress.tag">{{
            order.chooseAddress.tag
          }}</span>
          <span>{{ order.chooseAddress.address_detail }}</span>
        </div>
      </div>
      <van-icon name="arrow" class="icon_arrow" />
    </div>
    <div class="middle">
      <p class="deliver_text">送达时间</p>
      <section class="deliver_time">
        <p class="delivery_reach_time">
          尽快送达 | 预计 {{ order.checkoutData.delivery_reach_time }}
        </p>
        <span
          class="deliver_bird"
          v-if="
            order.checkoutData.cart
              ? order.checkoutData.cart.is_deliver_by_fengniao
              : false
          "
          >蜂鸟专送</span
        >
      </section>
    </div>
    <div class="middle1">
      <div class="middle1_top" @click="show = true">
        <span>支付方式</span>
        <section class="more_type">
          <span>在线支付</span>
          <van-icon name="arrow" class="icon_arrow" />
        </section>
        <van-action-sheet
          v-model:show="show"
          description="支付方式"
          close-on-click-overlay
        >
          <ul class="action-sheet">
            <li v-for="item in order.checkoutData.payments" :key="item.id">
              <span
                >{{ item.name }}
                <span v-if="!item.is_online_payment">{{
                  item.description
                }}</span>
              </span>
              <van-radio-group v-model="checked">
                <van-radio class="radio" name="1"></van-radio>
              </van-radio-group>
            </li>
          </ul>
        </van-action-sheet>
      </div>
      <div class="middle2_top">
        <span>红包</span>
        <span>暂时只在饿了么 APP 中支持</span>
      </div>
    </div>
    <div class="middle2">
      <header
        v-if="
          order.checkoutData.cart
            ? order.checkoutData.cart.restaurant_info
            : false
        "
      >
        <img
          :src="
            order.imgBaseUrl +
            order.checkoutData.cart.restaurant_info.image_path
          "
        />
        <span>{{ order.checkoutData.cart.restaurant_info.name }}</span>
      </header>
      <ul
        class="food_list_ul"
        v-if="order.checkoutData.cart ? order.checkoutData.cart.groups : false"
      >
        <li
          v-for="item in order.checkoutData.cart.groups[0]"
          :key="item.id"
          class="food_item_style"
        >
          <p class="food_name ellipsis">{{ item.name }}</p>
          <div class="num_price">
            <span class="quantity">x {{ item.quantity }}</span>
            <span>¥{{ item.price }}</span>
          </div>
        </li>
      </ul>
      <div
        class="food_item_style"
        v-if="order.checkoutData.cart ? order.checkoutData.cart.extra : false"
      >
        <p class="food_name ellipsis">
          {{ order.checkoutData.cart.extra[0].name }}
        </p>
        <div class="num_price">
          <span></span>
          <span>¥ {{ order.checkoutData.cart.extra[0].price }}</span>
        </div>
      </div>
      <div class="food_item_style">
        <p class="food_name ellipsis">配送费</p>
        <div class="num_price" v-if="order.checkoutData.cart">
          <span></span>
          <span>¥ {{ order.checkoutData.cart.deliver_amount || 0 }}</span>
        </div>
      </div>
      <div class="food_item_style" v-if="order.checkoutData.cart">
        <p class="food_name ellipsis">
          订单 ¥{{ order.checkoutData.cart.total }}
        </p>
        <div class="num_price">
          <span class="payment"
            >待支付 ¥{{ order.checkoutData.cart.total }}</span
          >
        </div>
      </div>
    </div>
    <div class="bottom" v-if="order.checkoutData.cart">
      <router-link
        :to="{
          path: '/confirmOrder/remark',
          query: {
            id: order.checkoutData.cart.id,
            sig: order.checkoutData.sig,
          },
        }"
        class="food_item_style"
      >
        <span class="food_name">订单备注</span>
        <section class="num_price">
          <span>口味、偏好等</span>
          <van-icon name="arrow" />
        </section>
      </router-link>
      <router-link
        v-if="order.checkoutData.invoice"
        :to="
          order.checkoutData.invoice.is_available ? '/confirmOrder/invoice' : ''
        "
        class="food_item_style"
      >
        <span class="food_name">发票抬头</span>
        <div class="num_price">
          <span v-if="order.checkoutData.invoice">
            {{ order.checkoutData.invoice.status_text }}
            <van-icon name="arrow" />
          </span>
        </div>
      </router-link>
    </div>
  </div>
  <van-action-bar>
    <div class="action-bar">
      <span>待支付</span>
      <span class="pay" v-if="order.checkoutData.cart"
        >¥{{ order.checkoutData.cart.total }}</span
      >
    </div>
    <van-action-bar-button
      @click="confrimOrder"
      type="warning"
      text="立即购买"
    />
  </van-action-bar>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { useStore } from "vuex";
import { getCurrentInstance, reactive, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

const store = useStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
const ord = proxy.$http.order;
const userInfo = store.state.login.userInfo;
const orderList = store.state.cart.cartList;
const remarkText = store.state.cart.remarkText;
const inputText = store.state.cart.inputText
const order = reactive({
  geohash: "", //geohash位置信息
  shopId: "", //商店id值
  chooseAddress: {},
  checkoutData: {},
  imgBaseUrl: "https://elm.cangdu.org/img/",
});
order.geohash = route.query.geohash;
order.shopId = route.query.shopId;
// store.commit('cart/reduceCart')
const show = ref(false);
const checked = ref("1");

store.commit('cart/saveShopId', order.shopId)
const remarkList = computed(()=> {
  let str = '';
  if (remarkText) {
    Object.values(remarkText).forEach(item=> {
      str += item[1] + ','
    })
  }
  if (inputText) {
    return str + inputText
  } else {
    return str.substr(0, str.lastIndexOf(','))
  }
})
// 检验订单是否满足条件
async function checkOut() {
  let newArray = [];
  orderList.forEach((item) => {
    item.attrs = [];
    item.extra = {};
    newArray.push(item);
  });
  const { data: res } = await ord.checkOut(
    order.geohash,
    [newArray],
    order.shopId
  );
  order.checkoutData = res;
}

// 获取地址 第一个地址为默认选择地址
async function getAddress() {
  if (userInfo && userInfo.user_id) {
    const { data: res } = await pos.getAddress(userInfo.user_id);
    order.chooseAddress = res[0];
  }
}
getAddress();

// 确认购买
async function confrimOrder() {
  //用户未登录时弹出提示框
  if (!(userInfo && userInfo.user_id)) {
    showDialog({
      message: "请登录",
      theme: "round-button",
    }).then(() => {
      // on close
    });
  } else if (!order.chooseAddress) {
    showDialog({
      message: "请添加一个收货地址",
      theme: "round-button",
    }).then(() => {
      // on close
    });
  } else {// 保存订单
    store.commit('cart/saveOrder', {
      user_id: userInfo.user_id,
      cart_id: order.checkoutData.cart.id,
      address_id: order.chooseAddress.id,
      description: remarkList.value,
      entities: order.checkoutData.cart.groups,
      geohash: order.geohash,
      sig: order.checkoutData.sig,
    })
    const {data: res} = await ord.placeOrders(userInfo.user_id, order.checkoutData.cart.id, order.chooseAddress.id, remarkList.value, order.checkoutData.cart.groups, order.geohash, order.checkoutData.sig)
    let orderRes = res
    if (orderRes.need_validation) {
      router.push('/confirmOrder/userValidation')
    } else {
      store.commit('cart/orderSuccess', orderRes)
      router.push('/confirmOrder/payment')
    }
  }
}

onMounted(() => {
  checkOut();
});
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 120px;
}
.top {
  display: flex;
  position: relative;
  height: 164px;
  align-items: center;
  padding: 0 20px;
  background: #fff url(../../images/address_bottom.png) left bottom repeat-x;
  .dingwei {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .order_top {
    .name {
      font: 700 38px Helvetica Neue, Tahoma, Arial;
      margin-right: 8px;
    }
    span {
      font-size: 30px;
      margin-right: 8px;
    }
  }
  .order_bottom {
    .gongsi {
      background-color: #4cd964;
      padding: 5px;
      margin-right: 8px;
      border-radius: 7px;
      color: #fff;
      font: 24px Helvetica Neue, Tahoma, Arial;
    }
    span {
      color: #777;
      font: 26px Helvetica Neue, Tahoma, Arial;
    }
  }
  .icon_arrow {
    position: absolute;
    right: 20px;
    font-size: 30px;
  }
}
.middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 164px;
  background-color: #fff;
  margin-top: 20px;
  padding: 0 32px;
  border-left: 10px solid #3190e8;
  .deliver_text {
    font: 700 38px Helvetica Neue, Tahoma, Arial;
  }
  .deliver_time {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .delivery_reach_time {
      margin-bottom: 20px;
      color: #3190e8;
      font: 34px Helvetica Neue, Tahoma, Arial;
    }
    .deliver_bird {
      background-color: #3190e8;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
      font: 24px Helvetica Neue, Tahoma, Arial;
    }
  }
}
.middle1 {
  margin-top: 20px;
  padding: 0 32px;
  background-color: #fff;
  .middle1_top {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    border-bottom: 1px solid #ddd;
    span {
      color: #666;
      font-size: 32px;
    }
    .more_type {
      span {
        color: #aaa;
        font-size: 28px;
      }
    }
  }
  .middle2_top {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    span {
      color: #aaa;
      font-size: 28px;
    }
  }
}

.bottom,
.middle2 {
  margin-top: 20px;
  padding: 0 32px;
  background-color: #fff;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    border-bottom: 1px solid #ddd;
    img {
      width: 58px;
      height: 58px;
    }
    span {
      font-size: 38px;
    }
  }
  .food_item_style {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    .food_name {
      color: #666;
      font-size: 30px;
    }
    .num_price {
      font-size: 28px;
      .quantity {
        color: #f60;
        margin-right: 20px;
      }
      span {
        color: #666;
      }
      .payment {
        color: #f60;
      }
    }
  }
}
.action-bar {
  font-size: 36px;
  margin-left: 30px;
  .pay {
    color: #f60;
    margin: 0 20px;
  }
}
.action-sheet {
  height: 300px;
  li {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    span {
      font-size: 26px !important;
    }
  }
}
</style>
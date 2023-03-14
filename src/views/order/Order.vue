<template>
  <Header headTitle="订单列表"></Header>
  <div class="main">
    <van-pull-refresh v-model="list.refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="list.loading"
        :finished="list.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="order_list_ul">
          <li
            class="order_list_li"
            v-for="item in list.orderList"
            :key="item.id"
          >
            <div class="order_list_top" @click="showDetail(item)">
              <div class="order_list_top_left">
                <img
                  :src="list.imgBaseUrl + item.restaurant_image_url"
                  alt=""
                />
                <div>
                  <section>
                    <span class="xiaoguo">{{ item.restaurant_name }}</span>
                    <van-icon class="left" name="arrow" />
                  </section>
                  <section>
                    <span>{{ item.formatted_created_at }}</span>
                  </section>
                </div>
              </div>
              <div class="order_status">{{ item.status_bar.title }}</div>
            </div>
            <div class="middle">
              <p class="order_name ellipsis">
                {{ item.basket.group[0][0].name
                }}{{
                  item.basket.group[0].length > 1
                    ? " 等" + item.basket.group[0].length + "件商品"
                    : ""
                }}
              </p>
              <p class="order_amount">¥{{ item.total_amount.toFixed(2) }}</p>
            </div>
            <div class="bottom">
              <router-link
                :to="{
                  path: '/shop',
                  query: { geohash, id: item.restaurant_id },
                }"
                class="buy_again"
                >再来一单</router-link
              >
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import Footer from "../../components/footer/Footer.vue";
import { getCurrentInstance, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const order = proxy.$http.order;
const userInfo = store.state.login.userInfo;
const geohash = store.state.site.geohash;
const list = reactive({
  orderList: [], //订单列表
  offset: 0,
  imgBaseUrl: "https://elm.cangdu.org/img/",
  loading: false, // 上拉加载
  finished: false, // 数据请求完成
  refreshing: false, // 下拉刷新
});

// 初始化获取订单列表
async function getOrderList() {
  const { data: res } = await order.getOrderList(userInfo.user_id, list.offset);
  console.log(res);
  list.orderList = res;
}
getOrderList();
// 加载更多
const onLoad = () => {
  setTimeout(async () => {
    if (list.refreshing) {
      list.offset = 0
      getOrderList();
      list.refreshing = false;
    }

    list.offset += 10
    const { data: res } = await order.getOrderList(userInfo.user_id, list.offset)
    list.orderList = [...list.orderList, ...res]
    list.loading = false;

    if (res.length < 10) {
      list.finished = true;
    }
  }, 1000);
};

// 下拉刷新
const onRefresh = () => {
      // 将 loading 设置为 true，表示处于加载状态
      list.loading = true;
      onLoad()
};

function showDetail(item) {
  store.commit("cart/saveOrderDetail", item);
  router.push("/order/orderDetail");
}
// 将全部订单数据存储到vuex中
onMounted(() => {
  
  setTimeout(()=> {
    let orderList = list.orderList
    store.commit('cart/saveAllOrder', orderList)
  },1000)
  
})
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px;
}
.order_list_li {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 10px;
  .order_list_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .order_list_top_left {
      display: flex;
    }
    img {
      width: 95px;
      height: 95px;
      margin-right: 20px;
    }
    .xiaoguo {
      color: #333;
      font-size: 36px;
    }
    .left {
      font-size: 30px;
    }
    span {
      color: #999;
      font-size: 26px;
    }
    .order_status {
      font-size: 28px;
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #eee;
    .order_name {
      color: #666;
      font-size: 28px;
    }
    .order_amount {
      color: #f60;
      font-size: 28px;
    }
  }
  .bottom {
    display: flex;
    justify-content: end;
    margin-top: 20px;
    .buy_again {
      padding: 5px;
      border: 1px solid #3190e8;
      border-radius: 10px;
      color: #3190e8;
      font-size: 26px;
    }
  }
}
</style>
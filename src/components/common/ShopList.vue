<template>
  <ul v-if="shopMes.shopMessage">
    <li v-for="item in shopMes.shopMessage" :key="item.id" class="shop_box" @click="goShop(item.id)">
      <div>
        <img
          v-lazy
          @error="imgError"
          :data-src="shopMes.imgBaseUrl + item.image_path"
          src="../../images/loading.gif"
          @error.once="e => { e.target.src = defaultImage }"
          class="shop_img"
        />
      </div>
      <div class="shop_right">
        <header class="shop_detail_header">
          <h4 class="shop_title">
            {{ item.name }}
          </h4>
          <ul class="shop_detail_ul">
            <li v-for="item in item.supports" :key="item.id" class="supports">
              {{ item.icon_name }}
            </li>
          </ul>
        </header>
        <h5 class="rating_order_num top_distance">
          <section class="rating_order_num_left">
              <van-rate
                class="rating"
                v-model="item.rating"
                readonly
                allow-half
                gutter="0"
                color="#ff9a0d"
              />
              <span class="rating_num">{{ item.rating }}</span>
              <section class="order_section">
                月售{{ item.recent_order_num }}单
              </section>
          </section>
          <section class="rating_order_num_right">
            <span class="delivery_left" v-if="item.delivery_mode">{{
              item.delivery_mode.text
            }}</span>
            <span class="delivery_right">准时达</span>
          </section>
        </h5>
        <h5 class="fee_distance top_distance">
          <p class="fee">
            ¥{{ item.float_minimum_order_amount }}起送
            <span class="segmentation">/</span>
            {{ item.piecewise_agent_fee.tips }}
          </p>
          <p class="distance_time">
            <span class="distance">{{ item.distance }} / </span>
            <span class="order_time">{{ item.order_lead_time }}</span>
          </p>
        </h5>
      </div>
    </li>
  </ul>
  <div class="loading" v-else>
    <img src="../../images/load.gif" alt="">
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, reactive, defineProps, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import defaultImage from '../../images/error.jpeg'

const { proxy } = getCurrentInstance();
const shop = proxy.$http.shop;
const store = useStore();
const router = useRouter()
const prop = defineProps(['geohash', 'restaurantCategoryId', 'restaurantCategoryIds',
'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'])
const latitude = computed(() => store.state.site.latitude);
const longitude = computed(() => store.state.site.longitude);

const shopMes = reactive({
  shopMessage: [],
  imgBaseUrl: "https://elm.cangdu.org/img/",
});
onMounted(() => {
  shopList();
});

// 点击进入商店页面
function goShop(id) {
  router.push({
    path: '/shop',
    query: {
      geohash: prop.geohash,
      id,
    }
  })
}

async function shopList() {
  const { data: res } = await shop.shopList(latitude, longitude, prop.restaurantCategoryId);
  shopMes.shopMessage = res;
}

// 父级传来的数据发生变化时，触发
async function listenPropChange() {
  const {data: res} = await shop.shopList(latitude, longitude,'', prop.restaurantCategoryIds, prop.sortByType, prop.deliveryMode, prop.supportIds)
  shopMes.shopMessage = res
}

// 监视数据变化
watch(()=> prop.restaurantCategoryIds, ()=> {
  listenPropChange()
})
watch(()=> prop.sortByType, ()=> {
  listenPropChange()
})
watch(()=> prop.confirmSelect, ()=> {
  listenPropChange()
})
</script>

<style lang="less" scoped>
.shop_box {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.loading {
  img {
    width: 100px;
  }
}
.shop_img {
  width: 130px;
  height: 130px;
  margin-right: 20px;
}
.shop_right {
  flex: auto;
  .shop_detail_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shop_title {
      color: #333;
      font-size: 28px;
      font-weight: 700;
      &::before {
        content: "品牌";
        display: inline-block;
        background-color: #ffd930;
        border-radius: 4px;
        padding: 0 5px;
        margin-right: 5px;
        font-size: 22px;
        font-weight: 600;
      }
    }
    .shop_detail_ul {
      display: flex;
      font-size: 20px;
      color: #999;
      .supports {
        padding-left: 5px;
      }
    }
  }
  .rating_order_num {
    display: flex;
    justify-content: space-between;
    .rating_order_num_left {
      display: flex;
      justify-content: flex-start;
      .rating_num {
        margin: 0 5px;
        font-size: 18px;
        color: #ff6000;
      }
      .order_section {
        font-size: 16px;
        color: #666;
      }
    }
    .rating_order_num_right {
      .delivery_left,
      .delivery_right {
        padding: 3px;
        border-radius: 3px;
        font-size: 14px;
      }
      .delivery_left {
        background-color: #3190e8;
        color: #fff;
      }
      .delivery_right {
        margin-left: 3px;
        border: 1px solid #a4cef5;
        color: #3190e8;
      }
    }
  }
  .fee_distance {
    display: flex;
    justify-content: space-between;
    .fee {
      font-size: 20px;
      color: #666;
    }
    .distance,
    .order_time {
      font-size: 18px;
    }
    .distance {
      color: #999;
    }
    .order_time {
      color: #319eee;
    }
  }
}
.top_distance {
  margin-top: 20px;
}
</style>
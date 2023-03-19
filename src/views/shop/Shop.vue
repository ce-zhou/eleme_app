<template >
  <div v-if="shop.loading">
    <div class="container">
    <div class="top">
      <div class="shop_container">
        <div class="left">
          <img :src="shop.imgBaseUrl + shop.shopDetailData.image_path" alt="" />
          <section>
            <p class="name">{{ shop.shopDetailData.name }}</p>
            <p class="description_text">
              商家配送／{{
                shop.shopDetailData.float_minimum_order_amount
              }}分钟送达／配送费¥{{ shop.shopDetailData.float_delivery_fee }}
            </p>
            <p class="description_promotion ellipsis">
              公告：{{ shop.shopDetailData.promotion_info }}
            </p>
          </section>
        </div>
        <div calss="right"><van-icon name="arrow" class="icon_right" /></div>
      </div>
      <div class="text_container">
        <span class="shangpin" @click="shop.shangpin = true">商品</span>
        <span class="pingjia" @click="shop.shangpin = false">评价</span>
      </div>
    </div>
    <div class="bottom" v-if="shop.shangpin">
      <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
        <ul>
          <li
            v-for="(item, index) in shop.menuList"
            :key="index"
            class="menu_left_li"
            @click="chooseMenu(index)"
          >
            <img :src="getImgPath(item.icon_url)" v-if="item.icon_url" />
            <span>{{ item.name }}</span>
            <!-- <span>{{ categoryNum[index] }}</span> -->
          </li>
        </ul>
      </section>
      <section class="menu_right" ref="menuFoodList">
        <ul>
          <li v-if="shop.menuList[shop.menuIndex]">
            <header class="menu_detail_header">
              <section class="menu_detail_header_left">
                <strong class="menu_item_title">{{
                  shop.menuList[shop.menuIndex].name
                }}</strong>
                <span class="menu_item_description">{{
                  shop.menuList[shop.menuIndex].description
                }}</span>
              </section>
            </header>
            <section
              v-for="(foods, foodindex) in shop.menuList[shop.menuIndex].foods"
              :key="foodindex"
              class="menu_detail_list"
            >
              <div tag="div" class="menu_detail_link">
                <section class="menu_food_img">
                  <img
                    v-lazy
                    :data-src="shop.imgBaseUrl + foods.image_path"
                    src="../../images/loading.gif"
                    @error.once="
                      (e) => {
                        e.target.src = defaultImage;
                      }
                    "
                  />
                </section>
                <section class="menu_food_description">
                  <h3 class="food_description_head">{{ foods.name }}</h3>
                  <p class="food_description_content">
                    {{ foods.description }}
                  </p>
                  <p class="food_description_sale_rating">
                    <span>月售{{ foods.month_sales }}份 </span>
                    <span>好评率{{ foods.satisfy_rate }}%</span>
                  </p>
                  <p v-if="foods.activity">
                    <span
                      class="food_activity"
                      :style="{
                        color: '#' + foods.activity.image_text_color,
                        borderColor: '#' + foods.activity.icon_color,
                      }"
                      >{{ foods.activity.image_text }}</span
                    >
                  </p>
                </section>
              </div>
              <footer class="menu_detail_footer">
                <section class="food_price">
                  <span>¥</span>
                  <span>{{ foods.specfoods[0].price }}</span>
                  <span class="qi">起</span>
                </section>
                <van-stepper
                  min="0"
                  default-value="0"
                  theme="round"
                  button-size="22"
                  disable-input
                  @plus="
                    addNum(
                      foods.category_id,
                      foods.item_id,
                      foods.specfoods[0].food_id,
                      foods.name,
                      foods.specfoods[0].price,
                      foods.specfoods[0].specs,
                      foods.specfoods[0].packing_fee,
                      foods.specfoods[0].sku_id,
                      foods.specfoods[0].stock
                    )
                  "
                  @minus="decreaseNum(foods.specfoods[0].price)"
                />
              </footer>
            </section>
          </li>
        </ul>
      </section>
    </div>
    <div class="ping_bottom" v-if="!shop.shangpin">
      <div class="context_top">
        <p class="common pingfen">
          {{ shop.ratingScoresData.food_score.toFixed(1) }}
        </p>
        <div class="common shop_pingfen">
          <p>商家评分</p>
          <van-rate
            v-model="shop.ratingScoresData.food_score"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="common service">
          <p>服务</p>
          <span>{{ shop.ratingScoresData.service_score.toFixed(1) }}</span>
        </div>
        <div class="common kouwei">
          <p>口味</p>
          <span>{{ shop.ratingScoresData.overall_score.toFixed(1) }}</span>
        </div>
        <div class="common manyi">
          <p>配送满意度</p>
          <span
            >{{
              (shop.ratingScoresData.compare_rating * 100).toFixed(1)
            }}%</span
          >
        </div>
      </div>
      <div class="context_bottom">
        <ul class="tag">
          <li v-for="(item, index) in shop.ratingTagsList" :key="index">
            <span
              :class="{ all: item.name == '全部', cha: item.name == '不满意' }"
              >{{ item.name }}({{ item.count }})</span
            >
          </li>
        </ul>
        <ul class="customer">
          <li v-for="(item, index) in shop.ratingList" :key="index">
            <div class="left">
              <img :src="getImgPath(item.avatar)" alt="" />
              <section>
                <p class="common">{{ item.username }}</p>
                <div class="common">
                  <van-rate
                    v-model="item.rating_star"
                    :size="25"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span>{{ item.time_spent_desc }}</span>
                </div>
                <div class="common food_list">
                  <div
                    v-for="(sonItem, index) in item.item_ratings"
                    :key="index"
                    
                  >
                    <img
                      :src="getImgPath(sonItem.image_hash)"
                      class="food_img"
                      alt=""
                      v-if="sonItem.image_hash"
                    />
                  </div>
                </div>
              </section>
            </div>
            <div class="right">
              {{ item.rated_at }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <van-action-bar v-if="shop.shangpin">
    <van-action-bar-icon icon="cart-o" text="购物车" :badge="shop.value" />
    <van-action-bar-icon icon="balance-pay" text="价钱" :badge="shop.money" />
    <van-action-bar-button type="danger" text="去结算" @click="next" />
  </van-action-bar>
  </div>
  <div class="skeleton" v-else>
    <Skeleton/>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import defaultImage from "../../images/error.jpeg";
import { sendRequest } from "../../plugins/promiseall";
import { getImgPath } from "../../plugins/mUtils";
import Skeleton from "../../components/Skeleton.vue";

// console.log(sendRequest);
const route = useRoute();
const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();
const food = proxy.$http.food;
const shopData = proxy.$http.shop;
const latitude = store.state.site.latitude;
const longitude = store.state.site.longitude;
const shop = reactive({
  loading: null,
  geohash: "", //geohash位置信息
  shopId: "", //商店id值
  menuList: [], //食品列表
  menuIndex: 0, //已选菜单索引值，默认为0
  imgBaseUrl: "https://elm.cangdu.org/img/",
  value: 0,
  active: 0,
  money: 0,
  shangpin: true, //控制商品页面是否显示
  ratingOffset: 0, // 评价获取数据offset值
  shopDetailData: {}, // 商铺详情
  ratingList: [], // 评价列表
  ratingScoresData: {}, // 评价总体分数
  ratingTagsList: [], // 评价分类列表
});

// 初始化基本数据
async function initData() {
  shop.shopId = route.query.id;
  shop.geohash = route.query.geohash;

  let tasks = [
    food.getFoodMenu(shop.shopId),
    shopData.shopDetails(shop.shopId, latitude, longitude),
    shopData.getRatingList(shop.shopId, shop.ratingOffset),
    shopData.ratingScores(shop.shopId),
    shopData.ratingTags(shop.shopId),
  ];

  sendRequest(tasks, 2).then((res) => {
    shop.loading = res
    shop.menuList = res[0];
    shop.shopDetailData = res[1];
    shop.ratingList = res[2];
    shop.ratingScoresData = res[3];
    shop.ratingTagsList = res[4];
  });
}
initData();

// 点击左侧菜单绑定索引值
function chooseMenu(index) {
  shop.menuIndex = index;
}

// 点击增加按钮
function addNum(
  category_id,
  item_id,
  food_id,
  name,
  price,
  specs,
  packing_fee,
  sku_id,
  stock
) {
  shop.value++;
  shop.money = price * shop.value;
  store.commit("cart/addCart", {
    shopId: shop.shopId,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock,
    quantity: 1,
  });
}

// 点击减少按钮
function decreaseNum(price) {
  shop.value--;
  shop.money = price * shop.value;
}

// 点击确认订单，跳转页面
function next() {
  router.push({
    path: "/confirmOrder",
    query: {
      geohash: shop.geohash,
      shopId: shop.shopId,
    },
  });
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.skeleton {
  background-color: #fff;
}
.top {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  font-size: 30px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  z-index: 2;
  .shop_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    padding: 0 20px;
    background-color: rgba(119, 103, 137, 0.4);
    .left {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 20px;
    }
    img {
      width: 120px;
      margin-right: 10px;
      border-radius: 15px;
    }
    .name {
      font-size: 26px;
      font-weight: 700;
    }
    .icon_right {
      color: #fff;
    }
  }
  .text_container {
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.bottom {
  display: flex;
  margin-top: 230px;
}
.menu_left {
  width: 20%;
  overflow-y: auto;
  .menu_left_li {
    height: 120px;
    color: #666;
    font-size: 28px;
    line-height: 120px;
    text-align: center;
    background-color: #f5f5f5;
  }
}
.menu_right {
  width: 80%;
  overflow-y: scroll;
  background-color: #fff;
  .menu_detail_header {
    padding: 20px;
    background-color: #fffbe8;
    font: 32px Microsoft Yahei;
    .menu_item_description {
      color: #999;
      font-size: 22px;
      margin-left: 10px;
    }
  }
}
.menu_food_img {
  width: 95px;
  margin-right: 18px;
  img {
    width: 100%;
  }
}
.menu_detail_list {
  padding: 20px;
  .menu_detail_link {
    display: flex;
    .food_description_head {
      font-size: 34px;
      font-weight: 700;
    }
    .food_description_content {
      color: #999;
      font-size: 22px;
    }
    .food_description_sale_rating {
      font-size: 22px;
      margin-top: 5px;
    }
    .food_activity {
      border: 1px solid;
      font-size: 14px;
      padding: 2px;
      border-radius: 5px;
    }
  }
  .menu_detail_footer {
    display: flex;
    justify-content: space-between;
    margin: 14px 0 0 112px;
    .food_price {
      color: #ff6600;
      font-size: 32px;
      font-weight: 700;
      .qi {
        color: #333;
        font-size: 24px;
        margin-left: 5px;
      }
    }
  }
}
.ping_bottom {
  margin-top: 230px;
}
.context_top {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  .common {
    margin-right: 50px;
    color: #666;
    font-size: 22px;
    p {
      margin-bottom: 10px;
    }
    span {
      color: #333;
      font-size: 26px;
      font-weight: 700;
    }
    &:nth-child(5) {
      margin: 0;
      padding-left: 50px;
      border-left: 1px solid #ddd;
    }
  }
  .pingfen {
    color: #f06600;
    font-size: 50px;
    font-weight: 700;
  }
}
.context_bottom {
  padding: 20px;
  background-color: #fff;
  .tag {
    display: flex;
    flex-wrap: wrap;
    font-size: 24px;
    li {
      margin: 0 20px 20px 0;
    }
    span {
      padding: 10px 20px;
      background-color: rgba(253, 195, 46, 0.2);
      border-radius: 6px;
    }
    .all {
      background-color: #fdc32e;
    }
    .cha {
      background-color: #eee;
    }
  }
  .customer {
    margin-top: 20px;
    li {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      font-size: 22px;
      border-bottom: 1px solid #eee;
    }
    .left {
      display: flex;
    }
    .right {
      color: #999;
    }
    img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
    }
    .common {
      margin-bottom: 10px;
    }
    .food_list {
      display: flex;
    }
    .food_img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
  }
}
</style>
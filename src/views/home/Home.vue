<template>
  <Footer />
  <div class="main">
    <div class="head">
      <div class="home_left" @click="position">
        <span>{{ city.cityName }}</span>
        <van-icon name="arrow-down" />
      </div>
      <div class="home_right">
        <input @focus="goSearch" type="text" placeholder="请输入搜索内容" />
        <button>搜索</button>
      </div>
    </div>
    <div class="body">
      <van-swipe class="my-swipe" indicator-color="#39a9ed">
        <van-swipe-item
          class="food_types_container"
          v-for="(item, index) in foods.foodList"
          :key="index"
        >
          <router-link
            class="link_to_food"
            :to="{
              path: '/food',
              query: {
                geohash: city.geohash,
                title: foodItem.title,
                restaurant_category_id: getCategoryId(foodItem.link),
              },
            }"
            v-for="foodItem in item"
            :key="foodItem.id"
          >
            <figure>
              <img :src="foods.imgBaseUrl + foodItem.image_url" />
              <figcaption>{{ foodItem.title }}</figcaption>
            </figure>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="bottom">
      <div>
        <svg class="icon shop" aria-hidden="true">
          <use xlink:href="#icon-shangjia"></use>
        </svg>
        <span>附近商家</span>
      </div>
      <ShopList :geohash="city.geohash"></ShopList>
    </div>
  </div>
  <Header />
  <Loading v-if="isLoading"></Loading>
</template>

<script setup>
import Footer from "../../components/footer/Footer.vue";
import Header from "../../components/header/Header.vue";
import ShopList from "../../components/common/ShopList.vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, reactive, getCurrentInstance, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Loading from "../../components/loading/index.vue";
import Skeleton from "../../components/common/Skeleton.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();
const { proxy } = getCurrentInstance();
const food = proxy.$http.food;
const pos = proxy.$http.position;
const isLoading = store.state.load.isLoading;
let city = reactive({
  cityName: "",
  geohash: route.query.geohash,
});
let foods = reactive({
  foodList: [],
  imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址
});
function position() {
  router.push("/position");
}

function getCity() {
  city.cityName = window.localStorage.getItem("name");
}

// 解码url地址，求去restaurant_category_id值
function getCategoryId(url) {
  let urlData = decodeURIComponent(
    url.split("=")[1].replace("&target_name", "")
  );
  if (/restaurant_category_id/gi.test(urlData)) {
    return JSON.parse(urlData).restaurant_category_id.id;
  } else {
    return "";
  }
}

onBeforeMount(async () => {
  // 根据经纬度获取详细地址信息
  if (!city.geohash) {
    // 没有搜索详细地址，返回当前定位城市经纬度
    const { data: res } = await pos.cityGuess();
    city.geohash = res.latitude + "," + res.longitude;
  } else {
    city.geohash = route.query.geohash;
  }
  store.commit("site/saveGeohash", city.geohash);
  //获取详细位置信息
  const { data: res } = await pos.posDetail(city.geohash);
  store.commit("site/saveAddress", res);
});

// 点击搜索框，跳转到搜索界面
function goSearch() {
  router.push("/search");
}

onMounted(async () => {
  getCity();
  // 获取食物分类列表
  const { data: res } = await food.getFoodCate();
  console.log(res);
  let resArr = [...res]; // 返回一个新的数组
  let foodArr = [];
  for (let i = 0, j = 0; i < res.length; i += 8, j++) {
    foodArr[j] = resArr.splice(0, 8);
  }
  foods.foodList = foodArr;
});
</script>

<style lang="less" scoped>
.main {
  padding: 80px 10px;
}
.head {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
  font-size: 30px;
  line-height: 60px;
  span {
    margin-right: 5px;
  }
  input {
    width: 610px;
    height: 60px;
    outline: none;
    border: 0;
    text-indent: 20px;
    border-radius: 30px;
  }
}
.home_right {
  position: relative;
  button {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -25px;
    width: 120px;
    height: 50px;
    border: 0;
    border-radius: 25px;
    background-color: #ffd101;
    line-height: 50px;
  }
}
.body {
  margin-top: 10px;
}
.food_types_container {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 20px;
  padding-bottom: 10px;
  .link_to_food {
    width: 25%;
    padding: 10px 0;
    figure {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 40%;
        margin-bottom: 15px;
      }
      figcaption {
        font-size: 24px;
        color: #747474;
      }
    }
  }
}
.bottom {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 20px 0;
  div {
    margin-bottom: 30px;
    .shop {
      width: 35px;
      height: 35px;
      vertical-align: bottom;
      margin-right: 10px;
    }
    span {
      font-size: 22px;
      color: #9fa19f;
    }
  }
}
</style>
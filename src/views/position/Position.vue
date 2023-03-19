<template>
  <Header />
  <div class="main">
    <div class="pos_top">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <div class="guess_city">
        <router-link :to="`/city/${city.guessCityid}`">
          <span>{{ city.guessCity + city.cityPos }}</span>
          <van-icon name="arrow" />
        </router-link>
        <div @click="rePos">
          <svg class="pos_icon" aria-hidden="true">
            <use xlink:href="#icon-dingwei"></use>
          </svg>
          <span class="repos">重新定位</span>
        </div>
      </div>
    </div>
    <div class="pos_bottom">
      <div class="hot_city">
        <span>热门城市</span>
        <div>
          <van-button
            class="btn"
            type="default"
            v-for="item in city.hotcity"
            :key="item.id"
            >{{ item.name }}</van-button
          >
        </div>
      </div>
      <div class="group_city">
        <div v-for="(value, key) in city.sortGroupCity" :key="key">
          <h3>{{ key }}</h3>
          <div
            v-for="item in value"
            :key="item.id"
            class="city_name"
            @click="getCity(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, getCurrentInstance, reactive, computed } from "vue";
import Header from "../../components/header/Header.vue";
import { useRouter } from "vue-router";
import { getStore, setStore } from "../../plugins/mUtils";

const router = useRouter();
const city = reactive({
  guessCity: "", //当前城市
  guessCityid: "", //当前城市id
  hotcity: [], //热门城市列表
  groupcity: {}, //所有城市列表
  cityPos: "",
  sortGroupCity: {},
});

const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
onMounted(async () => {
  // 当前定位城市
  const { data: res1 } = await pos.cityGuess();
  city.guessCity = res1.name;
  city.guessCityid = res1.id;

  // 热门城市
  const { data: res2 } = await pos.hotCity();
  city.hotcity = res2;

  // 所有城市
  const { data: res3 } = await pos.groupCity();
  city.groupcity = res3;
  city.cityPos = getStore("city");
  setStore("name", city.guessCity);
});

// 将获取的所有城市按A-Z排序
city.sortGroupCity = computed(() => {
  let sortObj = {};
  for (let i = 65; i <= 90; i++) {
    // 65-90代表A-Z的编码
    if (city.groupcity[String.fromCharCode(i)]) {
      sortObj[String.fromCharCode(i)] = city.groupcity[String.fromCharCode(i)];
    }
  }
  return sortObj;
});

function getCity(n) {
  let name = setStore("name", n);
  router.push("/home");
}
// 刷新页面
function rePos() {
  window.location.reload();
}
</script>

<style lang="less" scoped>
.main {
  padding-top: 80px;
}
.pos_top,
.pos_bottom {
  background-color: #fff;
  padding: 0 20px;
}
.city_tip {
  border-bottom: 1px solid #eee;
  span:first-child {
    font-size: 24px;
  }
  span:last-child {
    color: #9f9f9f;
    font-size: 20px;
    font-weight: bold;
  }
}
.guess_city,
.city_tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  // line-height: 70px;
}

.guess_city {
  font-size: 30px;
  div {
    display: flex;
    align-items: center;
    .pos_icon {
      width: 36px;
      margin-right: 10px;
      color: #333;
    }
    .repos {
      font-size: 24px;
    }
  }
}
.pos_bottom {
  margin-top: 20px;
}
.hot_city {
  span {
    display: block;
    font-size: 24px;
    margin: 20px 0 10px 0;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .btn {
      width: 23%;
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
}
.city_name {
  height: 50px;
  border-bottom: 1px solid #eee;
  font-size: 20px;
  color: #323233;
  line-height: 50px;
}
</style>
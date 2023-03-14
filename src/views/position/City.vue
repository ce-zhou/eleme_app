<template>
  <Header :headTitle="position.cityname"></Header>
  <div class="city_box">
    <div class="city_top">
      <input
        class="search"
        v-model="position.searchValue"
        placeholder="请输入详细地址"
        required
      />
      <van-button @click="postpois" type="primary" size="large"
        >提交</van-button
      >
    </div>
    <div class="city_mid" v-if="position.historytitle">搜索历史</div>
    <div class="city_bottom">
      <ul>
        <li
          v-for="(item, index) in position.placelist"
          :key="index"
          @click="nextPage(index, item.geohash)"
        >
          <div>{{ item.name }}</div>
          <span>{{ item.address }}</span>
        </li>
      </ul>
      <div
        v-if="position.historytitle && position.placelist.length"
        class="clear"
        @click="clearAll"
      >
        清空所有
      </div>
      <div class="search_none_place" v-if="position.placeNone">很抱歉！无搜索结果</div>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { getCurrentInstance, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getStore, setStore, removeStore } from "../../plugins/mUtils";
import { showNotify } from 'vant';
import 'vant/es/notify/style';

const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
const route = useRoute();
const router = useRouter();
let position = reactive({
  city_id: route.params.cityid,
  // 输入框中的信息
  searchValue: "",
  placelist: [], // 搜索城市列表
  historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
  placeHistory: [], // 历史搜索记录
  placeNone: false, // 搜索无结果，显示提示信息
  cityname:'', // 当前城市名字
});

// 点击搜索按钮，获取搜索到的信息
async function postpois() {
  if (position.searchValue) {
    const { data: res } = await pos.searchPlace(
      position.city_id,
      position.searchValue
    );
    position.historytitle = false;
    position.placelist = res;
    position.placeNone = res.length ? false : true;
  } else {
    showNotify({ position: "bottom", type: 'warning', message: '请输入内容' });
  }
}

// 点击搜索结果跳转到下一页面之前，判断搜索历史是否已将存在
// 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页

function nextPage(index, geohash) {
  let history = getStore("placeHistory");
  let choosePlace = position.placelist[index];
  if (history) {
    // 有搜索历史
    let checkrepeat = false;
    position.placeHistory.forEach((item) => {
      if (item.geohash === geohash) {
        //并且点击的搜索结果和搜索历史相同
        checkrepeat = true;
      }
    });
    if (!checkrepeat) {
      position.placeHistory.push(choosePlace);
    }
  } else {
    // 如果没有搜索历史，将它存到placeHistory里
    position.placeHistory.push(choosePlace);
  }
  setStore("placeHistory", position.placeHistory);
  setStore('city', choosePlace.name)
  router.push({
    path: "/home",
    query: { geohash },
  });
}

function getHistory() {
  // 获取历史记录
  if (getStore("placeHistory")) {
    position.placelist = JSON.parse(getStore("placeHistory"));
  } else {
    position.placelist = [];
  }
}

// 清空历史记录
function clearAll() {
  removeStore("placeHistory");
  removeStore('city')
  getHistory();
}

onMounted(async () => {
  getHistory();
  const {data: res} = await pos.currentCity(position.city_id)
  position.cityname = res.name
});
</script>

<style lang="less" scoped>
.city_box {
  padding-top: 80px;
}
.city_top {
  background-color: #fff;
  padding: 20px 50px;
  margin-top: 10px;
  border-bottom: 1px solid #ddd;
}
.search {
  width: 100%;
  height: 60px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #fff;
  text-indent: 10px;
  font-size: 26px;
}
.city_mid {
  height: 40px;
  font-size: 22px;
  padding-left: 20px;
  font-weight: 300;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
}
.city_bottom {
  background-color: #fff;
  padding: 0 20px;
  ul {
    li {
      position: relative;
      height: 100px;
      border-bottom: 1px solid #ddd;
      div {
        font-size: 24px;
        position: absolute;
        top: 20px;
      }
      span {
        position: absolute;
        top: 60px;
        font-size: 18px;
        color: #999;
      }
    }
  }
}
.clear,
.search_none_place {
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  color: #666;
}
</style>
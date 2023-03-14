<template>
  <div class="main">
    <div class="top">
      <van-icon @click="goBack" name="arrow-left" class="icon_left" />
      <input
        id="input"
        v-model="search.inputValue"
        type="text"
        placeholder="请输入商家名"
      />
      <button @click="getSearch">搜索</button>
    </div>
    <div id="search-list" v-if="search.inputValue">
      <ul>
        <li v-for="item in search.searchList" :key="item">
          <van-icon name="search" />
          <span class="innerText">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="history">
        <span>历史搜索</span>
        <van-icon @click="deleteAll" name="delete-o" class="icon_delete" />
      </div>
      <div class="his_icon">
        <span v-for="(item, index) in search.shopList" :key="index">
          {{ item }}
        </span>
      </div>
      <div class="shop">
        <section class="food-list">
          <div class="top">
            <svg class="icon icon-huo" aria-hidden="true">
              <use xlink:href="#icon-huobao"></use>
            </svg>
            <span>大家都在搜</span>
          </div>
          <div class="bot_con" v-for="(item, index) in hot" :key="index">
            <span :class="{red: index+1 == 1 || index+1 == 2 || index+1 == 3}">{{ index + 1 }}</span>
            <p>{{ item.title }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getStore, setStore, removeStore } from "../../plugins/mUtils";
import { useRouter } from "vue-router";
import myDebounce from "../../plugins/myDebounce";
import { hot } from "../../plugins/search";

const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const shop = proxy.$http.shop;
const search = reactive({
  inputValue: "", // 搜索框输入的内容
  shopList: [],
  searchList: [],
});
const geohash = store.state.site.geohash;

function initData() {
  if (getStore("shopList")) {
    let list = getStore("shopList")
      .slice(1, getStore("shopList").length - 1)
      .replace(/\"/g, "")
      .split(",");
    search.shopList = list;
  } else {
    search.shopList = [];
  }
}

onMounted(() => {
  initData();
});

function goBack() {
  router.back();
}

async function getSearchKeyWord() {
  const { data: res } = await shop.searchRestaurant(geohash, search.inputValue);
  if (!res.message) {
    search.searchList = [];
    res.forEach((item) => {
      search.searchList.push(item.name);
    });
  }
}

let searchInput = myDebounce(getSearchKeyWord, 300);

// 在搜索框输入内容调取后端接口
async function getSearch() {
  if (search.inputValue) {
    const { data: res } = await shop.searchRestaurant(
      geohash,
      search.inputValue
    );
    console.log(res);
    if (res.message) {
    }
    setStore("shop", search.inputValue);
    if (!search.shopList.includes(getStore("shop"))) {
      search.shopList.push(getStore("shop"));
    }
    setStore("shopList", search.shopList);
    search.inputValue = "";
    document.getElementById("input").focus();
  }
}

// 点击删除图标，删除所有历史记录
function deleteAll() {
  removeStore("shopList");
  initData();
}

watch(
  () => search.inputValue,
  () => {
    searchInput();
  }
);
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  padding-top: 40px;
  background-color: #e4f3f7;
}
.top {
  display: flex;
  align-items: center;
  font-size: 24px;
  .icon_left {
    margin: 0 20px;
    color: #666;
    font-size: 30px;
  }
  input {
    width: 75%;
    height: 60px;
    text-indent: 20px;
    border: 0;
    border-radius: 30px;
  }
  button {
    padding: 5px 20px;
    margin-left: 10px;
    background-color: #ffd101;
    border: 0;
    border-radius: 30px;
  }
}
#search-list {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 15px;
  li {
    padding: 20px;
    border-bottom: 1px solid #eee;
  }
  .innerText {
    font-size: 22px;
  }
}
.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  height: 80%;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  overflow-y: auto;
  .history {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 24px;
    .icon_delete {
      font-size: 30px;
    }
  }
  .his_icon {
    margin: 20px 0;
    font-size: 20px;
    span {
      padding: 10px 20px;
      margin-right: 10px;
      background-color: #eee;
      border-radius: 30px;
    }
  }
  .shop {
    height: 400px;
    margin-bottom: 30px;
  }
}
.food-list {
  width: 300px;
  padding: 10px;
  background-color: #fcecec;
  border-radius: 20px;
  .top {
    margin-bottom: 10px;
    .icon-huo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    span {
      color: #d81e06;
      font-size: 26px;
      font-weight: 700;
    }
  }
  .bot_con {
    display: flex;
    padding: 5px 10px;
    font-size: 22px;
    line-height: 40px;
    background-color: #fff;
    span {
      margin-right: 10px;
      color:#666;
      font-weight: 700;
    }
    .red {
      color: #ff623e;
    }
  }
}
</style>
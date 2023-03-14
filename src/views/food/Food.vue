<template>
  <Header :headTitle="list.title"></Header>
  <div class="main">
    <div class="top">
      <van-dropdown-menu class="meau">
        <van-dropdown-item :title="list.title">
          <div class="category_container">
            <ul class="category_left">
              <li
                v-for="(item, index) in list.category"
                :key="index"
                @click="selectCategoryName(item.id, index)"
              >
                <section>
                  <img
                    :src="getImgPath(item.image_url)"
                    alt=""
                    class="category_icon"
                  />
                  <span class="category_font">{{ item.name }}</span>
                </section>
                <section>
                  <van-tag
                    class="category_count"
                    round
                    size="small"
                    color="#ccc"
                    text-color="#fff"
                    >{{ item.count }}</van-tag
                  >
                  <van-icon class="left_icon" name="arrow" />
                </section>
              </li>
            </ul>
            <ul class="category_right">
              <li
                v-for="(item, index) in list.categoryDetail"
                :key="index"
                @click="getCategoryIds(item.id, item.name)"
              >
                <span>{{ item.name }}</span>
                <span class="category_count">{{ item.count }}</span>
              </li>
            </ul>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="排序">
          <ul class="sort_container">
            <li @click="list.sortByType = 4">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-paixu"></use>
              </svg>
              <span>智能排序</span>
            </li>
            <li @click="list.sortByType = 5">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-dingwei1"></use>
              </svg>
              <span>距离最近</span>
            </li>
            <li @click="list.sortByType = 6">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-caipinxiaoliang"></use>
              </svg>
              <span>销量最高</span>
            </li>
            <li @click="list.sortByType = 1">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-qiantianchong"></use>
              </svg>
              <span>起送价最低</span>
            </li>
            <li @click="list.sortByType = 2">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-a-shijianzuijin"></use>
              </svg>
              <span>配送速度最快</span>
            </li>
            <li @click="list.sortByType = 3">
              <svg class="icon sort_icon" aria-hidden="true">
                <use xlink:href="#icon-pingfen"></use>
              </svg>
              <span>评分最高</span>
            </li>
          </ul>
        </van-dropdown-item>
        <van-dropdown-item title="筛选">
          <div class="filter_container">
            <section class="filter_top">
              <div class="filter_header_style">配送方式</div>
              <ul>
                <li
                  v-for="(item, index) in list.delivery"
                  :key="index"
                  class="filter_li"
                  @click="selectDeliveryMode(item.id)"
                >
                  <svg
                    class="icon filter_icon"
                    aria-hidden="true"
                    v-if="list.delivery_mode == ''"
                  >
                    <use xlink:href="#icon-shaniaologo"></use>
                  </svg>
                  <svg v-else class="icon duihao" aria-hidden="true">
                    <use xlink:href="#icon-duihao2"></use>
                  </svg>
                  <span class="filter_text">{{ item.text }}</span>
                </li>
              </ul>
            </section>
            <section class="filter_bottom">
              <div class="filter_header_style">商家属性(可以多选)</div>
              <ul>
                <li
                  v-for="(item, index) in list.activity"
                  :key="index"
                  class="filter_li"
                  @click="selectSupportIds(index, item.id)"
                >
                  <span
                    v-if="!list.support_ids[index].status"
                    class="filter_icon_name"
                    :style="{
                      color: '#' + item.icon_color,
                      borderColor: '#' + item.icon_color,
                    }"
                    >{{ item.icon_name }}</span
                  >
                  <svg v-else class="icon duihao" aria-hidden="true">
                    <use xlink:href="#icon-duihao2"></use>
                  </svg>
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </section>
            <section class="filter_button">
              <button class="clear" @click="clear">清空</button>
              <button class="confirm" @click="confirm">确定</button>
            </section>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="bottom">
      <shopList
        :geohash="list.geohash"
        :restaurantCategoryId="list.restaurant_category_id"
        :restaurantCategoryIds="list.restaurant_category_ids"
        :sortByType="list.sortByType"
        :deliveryMode="list.delivery_mode"
        :supportIds="list.support_ids"
        :confirmSelect="list.confirmStatus"
      ></shopList>
    </div>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import ShopList from "../../components/common/ShopList.vue";
import { onMounted, reactive, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getImgPath } from "../../plugins/mUtils";

const route = useRoute();
const { proxy } = getCurrentInstance();
const shop = proxy.$http.shop;
const _axios = proxy.$http.all;
const store = useStore();
const latitude = store.state.site.latitude;
const longitude = store.state.site.longitude;
const list = reactive({
  geohash: "",
  title: "",
  restaurant_category_id: "",
  restaurant_category_ids: "",
  category: [],
  categoryDetail: [],
  delivery: [], // 配送方式数据
  activity: [], // 商家支持活动数据
  support_ids: [], // 选中的商铺活动列表
  sortByType: "", // 根据何种方式排序
  delivery_mode: "", // 选中的配送方式
  filterNum: 0, // 所选中的所有样式的集合
  confirmStatus: false, // 确认选择
});

// 初始化页面
async function initData() {
  list.geohash = route.query.geohash;
  list.title = route.query.title;
  list.restaurant_category_id = route.query.restaurant_category_id;

  // 获取category分类左侧数据 筛选列表的配送方式 商家属性活动列表
  _axios.all(
    [
      shop.foodCategory(latitude, longitude),
      shop.foodDelivery(latitude, longitude),
      shop.foodActivity(latitude, longitude),
    ],
    ({ data: res1 }, { data: res2 }, { data: res3 }) => {
      list.category = res1;
      list.delivery = res2;
      list.activity = res3;
      list.category.forEach((item) => {
        if (list.restaurant_category_id == item.id) {
          list.categoryDetail = item.sub_categories.slice(1);
        }
      });
      list.activity.forEach((item, index) => {
        list.support_ids[index] = { status: false, id: item.id };
      });
    }
  );
}

// 选中分类页的左侧某个选项时，右侧渲染相应的sub_categories列表
function selectCategoryName(id, index) {
  list.restaurant_category_id = id;
  list.categoryDetail = list.category[index].sub_categories.slice(1);
}

// 选中分类页的右侧某个选项时, 进行筛选，重新获取数据并渲染
function getCategoryIds(id, name) {
  list.restaurant_category_ids = id;
  list.title = name;
}

// 筛选选项中的配送方式
function selectDeliveryMode(id) {
  if (list.delivery_mode == "") {
    list.delivery_mode = id;
    list.filterNum++;
  } else if (list.delivery_mode == id) {
    list.delivery_mode = "";
    list.filterNum--;
  } else {
    //delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
    list.delivery_mode = id;
  }
}

// 商家活动列表
function selectSupportIds(index, id) {
  list.support_ids.splice(index, 1, {
    status: !list.support_ids[index].status,
    id,
  });
  // 重新计算filterNum的个数
  list.filterNum = list.delivery_mode == "" ? 0 : 1;
  list.support_ids.forEach((item) => {
    if (item.status) {
      list.filterNum++;
    }
  });
}

// 点击确定按钮是触发
function confirm() {
  list.confirmStatus = !list.confirmStatus;
}

// 点击取消触发
function clear() {
  list.support_ids.map((item) => (item.status = false));
  list.filterNum = 0;
  list.delivery_mode = "";
}

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.main {
  padding-top: 80px;
}
.meau {
  border-bottom: 1px solid #ddd;
}
.bottom {
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}
.category_container {
  display: flex;
}
.category_left {
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 84px;
    .category_icon {
      width: 38px;
      height: 38px;
      vertical-align: middle;
      margin-right: 10px;
    }
    .category_font {
      color: #666;
      font: 24px Microsoft Yahei;
    }
    .left_icon {
      color: #666;
      font-size: 20px;
    }
  }
}
.category_right {
  width: 50%;
  padding: 20px;
  background-color: #f1f1f1;
  overflow-y: auto;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 84px;
    border-bottom: 1px solid #ddd;
    font: 26px Microsoft Yahei;
  }
}
.sort_container {
  padding: 20px 30px;
  li {
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    .sort_icon {
      width: 35px;
      height: 35px;
      vertical-align: middle;
    }
    span {
      margin-left: 30px;
    }
  }
}
.filter_container {
  padding: 20px;
  .filter_header_style {
    font-size: 19px;
    margin-bottom: 20px;
  }
  .filter_li {
    width: 220px;
    height: 65px;
    border: 1px solid #ddd;
    line-height: 65px;
    padding-left: 20px;
    border-radius: 10px;
    .filter_icon {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    .duihao {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    .filter_text {
      color: #47a1fb;
      font-size: 19px;
      margin-left: 5px;
    }
  }
}
.filter_bottom {
  margin-top: 30px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .filter_li {
      width: 31%;
      &:nth-child(-n + 3) {
        margin-bottom: 10px;
      }
      .filter_icon_name {
        border: 1px solid;
        padding: 5px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .duihao {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
    }
  }
}
.filter_button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .confirm,
  .clear {
    width: 47%;
    height: 80px;
    border: 0;
    border-radius: 15px;
    font-size: 36px;
  }
  .confirm {
    color: #fff;
    background-color: #56d176;
  }
}
</style>
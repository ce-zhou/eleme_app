<template>
  <Header headTitle="搜索地址"></Header>
  <div class="main">
    <van-search
      v-model="detail.inputValue"
      show-action
      label="地址"
      placeholder="请输入小区/写字楼/学校等"
      @clear="clearAddress"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
    <van-notice-bar
      v-if="!detail.addressList.length"
      class="middle"
      left-icon="volume-o"
      text="为了满足商家的送餐要求，建议您从列表中选择地址"
    />
    <section class="poisearch-container" v-show="detail.addressList">
      <ul>
        <li
          v-for="(item, index) in detail.addressList"
          :key="index"
          @click="listClick(index)"
        >
          <p class="one">{{ item.name }}</p>
          <p class="two">{{ item.address }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Header from "../../../../../../components/header/Header.vue";

const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
const store = useStore();
const router = useRouter();
const detail = reactive({
  // 输入框的信息
  inputValue: "",
  // 获取的详细地址列表
  addressList: [],
});

// 点击搜索地址按钮获取详细地址
async function onClickButton() {
  const { data: res } = await pos.searchAddress(detail.inputValue);
  if (detail.inputValue) {
    detail.addressList = res;
  } else {
    detail.addressList = ''
  }
}

// 点击清空
function clearAddress() {
    detail.addressList = ''
}

// 点击地址保存并跳转页面
function listClick(index) {
    store.commit('site/addAddress', detail.addressList[index].name)
    store.commit('site/saveGeohash', detail.addressList[index].geohash)
    router.back()
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.middle {
  margin-top: 20px;
}
.poisearch-container {
    background-color: #fff;
    margin-top: 20px;
    li {
        padding: 20px;
        border-bottom: 1px solid #dadada;
        .one {
            color: #666;
            font: 32px Helvetica Neue,Tahoma,Arial;
            margin-bottom: 10px;
        }
        .two {
            color: #969696;
            font-size: 24px;
        }
    }
}
</style>
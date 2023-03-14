<template>
  <Header headTitle="编辑地址"></Header>
  <div class="main">
    <ul>
      <li v-for="(item, index) in allAddress" :key="index" class="addresslist">
        <div>
          <p class="name">{{ item.name }}</p>
          <p>
            <span class="phone">{{ item.phone }}</span>
          </p>
        </div>
        <div class="deletesite" v-if="address.deleteSite">
          <van-icon name="cross" @click="deleteSite(item, index)"/>
        </div>
      </li>
    </ul>
    <div class="middle">
      <van-tag plain round type="primary" size="large" class="tag" @click="edit" v-if="!address.deleteSite">编辑</van-tag>
      <van-tag plain round type="primary" size="large" class="tag" @click="CancelEdit" v-else>取消</van-tag>
    </div>
    <div class="bottom">
      <router-link to="/mine/info/address/add">
        <div class="addsite">
          <span>新增地址</span>
          <van-icon name="arrow" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Header from "../../../../components/header/Header.vue";
import { useStore } from "vuex";
import { getCurrentInstance, reactive } from "vue";
const store = useStore();
const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
const allAddress = store.state.site.addNewAddress;
const userInfo = store.state.login.userInfo;
const address = reactive({
  //是否编辑状态
  deleteSite: false
})
// 点击标记按钮，出现x号
function edit() {
  address.deleteSite = true
}

function CancelEdit() {
  address.deleteSite = false
}
// 删除地址
async function deleteSite(item, index) {
  await pos.deleteAddress(userInfo.user_id, item.id)
  store.commit('site/deleteAddress', index)
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.bottom {
  background-color: #fff;
  padding: 20px;
  .addsite {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-size: 32px;
  }
}
ul {
  background-color: #fff;
  margin-bottom: 10px;
}
.addresslist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  .name,
  .phone {
    padding-bottom: 10px;
    font: 28px Helvetica Neue, Tahoma, Arial;
  }
}
.middle {
  display: flex;
  justify-content: end;
  .tag {
    margin-bottom: 20px;
  }
}
</style>
<template>
  <Header headTitle="新增地址"></Header>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          size="large"
          v-model="add.value1"
          placeholder="请填写您的姓名"
          :rules="[{ required: true, message: '请填写您的姓名' }]"
        />
        <van-field
          v-model="value2"
          placeholder="小区/写字楼/学校等"
          :rules="[{ required: true, message: '小区/写字楼/学校等' }]"
          @click="toAddressDetail"
        />
        <van-field
          v-model="add.value3"
          placeholder="请填写详细送餐地址"
          :rules="[
            {
              required: true,
              message: (value) => {
                if (value == '') {
                  return '请详细填写送餐地址';
                } else if (value.length > 0 && value.length <= 2) {
                  return '送餐地址太短了，不能辨识';
                }
              },
            },
          ]"
        />
        <van-field
          v-model="add.value4"
          name="pattern"
          placeholder="请填入您的手机号"
          :rules="[
            {
              pattern,
              message: (value) => {
                if (pattern.test(value)) {
                  return;
                } else if (value == '') {
                  return '手机号不能为空';
                } else {
                  return '请输入正确的手机号';
                }
              },
            },
          ]"
        />
        <van-field
          v-model="add.value5"
          name="pattern"
          placeholder="请填入您的备用手机号"
          :rules="[
            {
              pattern,
              message: (value) => {
                if (pattern.test(value)) {
                  return;
                } else if (value == '') {
                  return '手机号不能为空';
                } else {
                  return '请输入正确的手机号';
                }
              },
            },
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          新增地址
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import Header from "../../../../../components/header/Header.vue";
import { useRouter } from "vue-router";
import { reactive, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";

const pattern = /^[1][358][0-9]{9}$/;
const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();
const pos = proxy.$http.position;
const add = reactive({
  value1: "",
  value3: "",
  value4: "",
  value5: "",
});
const user_id = computed(() => store.state.login.userInfo.user_id);
const value2 = computed(() => store.state.site.address);
const geohash = computed(() => store.state.site.geohash);
function toAddressDetail() {
  router.push("/mine/info/address/add/addDetail");
}
//保存地址
async function onSubmit() {
  const { data: res } = await pos.postAddAddress(
    user_id.value,
    add.value3,
    value2.value,
    geohash.value,
    add.value1,
    add.value4,
    add.value5,
    0,
    1,
    "公司",
    4
  );
  if (res.status === 1) {
    // 保存地址
    store.commit("site/addAllAddress", {
      name: add.value1,
      address: add.value3,
      address_detail: value2.value,
      geohash: geohash.value,
      phone: add.value4,
      phone_bk: add.value5,
      poi: value2.value,
      poi_type: 0,
    });
    router.back()
  }
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
</style>
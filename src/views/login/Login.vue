<template>
  <Header headTitle="密码登录"></Header>
  <div class="main">
    <van-form @submit="onSubmit">
      <van-cell-group class="group" inset>
        <van-field
          size="large"
          v-model="login.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          size="large"
          v-model="login.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          size="large"
          v-model="login.codeNumber"
          name="验证码"
          label="验证码"
          placeholder="验证码"
        >
        </van-field>
        <div class="checking">
          <img class="check_img" :src="login.captchaCodeImg" alt="" />
          <p @click="getCaptchas">换一张</p>
        </div>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showDialog } from "vant";
import "vant/es/dialog/style";

const { proxy } = getCurrentInstance();
const password = proxy.$http.login;
const socket = proxy.$socket;
const router = useRouter();
const store = useStore();
const userInfo = store.state.login.userInfo
const login = reactive({
  // 验证码地址
  captchaCodeImg: null,
  // 用户名
  username: "",
  // 密码
  password: "",
  // 验证码
  codeNumber: "",
  // 用户信息
  userInfo: {},
});
// 获取图片验证码
async function getCaptchas() {
  const { data: res } = await password.getCaptchas();
  login.captchaCodeImg = res.code;
}

async function onSubmit() {
  const { data: res } = await password.accountLogin(
    login.username,
    login.password,
    login.codeNumber
  );
  login.userInfo = res;
  //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
  if (!login.userInfo.user_id) {
    showDialog({
      message: login.userInfo.message,
      theme: "round-button",
    });
  } else {
    // 把用户信息存储到vuex中
    store.commit("login/setUserInfo", login.userInfo);
    socket.connect();
    socket.emit(
      "login",
      {
        name: login.username,
        img: "https://elm.cangdu.org/img/" + userInfo.avatar,
      },
      (results) => {
        console.log(results);
      }
    );
    socket.on("login", (data) => {
      data.filter((item) => {
        item.name = 'best'
      });
      window.sessionStorage.setItem('list', data[0].img)
    });
    router.push("/mine");
  }
}

onMounted(() => {
  getCaptchas();
});
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 0;
  position: relative;
}
.checking {
  display: flex;
  position: absolute;
  top: 100px;
  right: 10px;
  .check_img {
    width: 80px;
    height: 30px;
    padding-right: 10px;
  }
  p {
    font-size: 16px;
  }
}
</style>
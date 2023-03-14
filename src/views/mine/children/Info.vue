<template>
  <Header headTitle="账户信息"></Header>
  <div class="main">
    <div class="top">
      <section>
        <span>头像</span>
        <div>
          <img
            class="privateImage"
            :src="info.imgBaseUrl + userInfo.avatar"
            alt=""
          />
          <van-icon class="icon_left" name="arrow" />
        </div>
      </section>
      <router-link to="/mine/info/setusername">
        <section>
          <span>用户名</span>
          <div>
            <b class="username">{{ userInfo.username }}</b>
            <van-icon class="icon_left" name="arrow" />
          </div>
        </section>
      </router-link>
      <router-link to="/mine/info/address">
        <section>
          <span>收货地址</span>
          <div>
            <van-icon class="icon_left" name="arrow" />
          </div>
        </section>
      </router-link>
    </div>
    <div class="bind">账号绑定</div>
    <div class="middle">
      <section @click="loginInApp">
        <div>
          <svg class="icon phone" aria-hidden="true">
            <use xlink:href="#icon-a-tupianyihuifu-56"></use>
          </svg>
          <span>手机</span>
        </div>
        <van-icon class="icon_left" name="arrow" />
      </section>
    </div>
    <div class="safe">安全设置</div>
    <div class="bottom">
      <router-link to="/forget">
        <section>
          <span>登陆密码</span>
          <div>
            <b class="username">修改</b>
            <van-icon class="icon_left" name="arrow" />
          </div>
        </section>
      </router-link>
    </div>
    <button @click="outLogin">退出登录</button>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { useStore } from "vuex";
import { computed, reactive, getCurrentInstance } from "vue";
import { showConfirmDialog } from "vant";
import { useRouter } from "vue-router";
import "vant/es/dialog/style";
import { showDialog } from "vant";

const { proxy } = getCurrentInstance();
const login = proxy.$http.login;
const store = useStore();
const router = useRouter();
const info = reactive({
  imgBaseUrl: "https://elm.cangdu.org/img/",
});
const userInfo = computed(() => store.state.login.userInfo);

// 上传头像
const afterRead = async (file) => {
  console.log(file);
  // 此时可以自行将文件上传至服务器
  const { data: res } = await login.uploadAvatar(
    userInfo.value.user_id,
    file.content
  );
  console.log(res);
};

// 手机
function loginInApp() {
  showDialog({
    message: "请在手机APP中设置",
    theme: "round-button",
  }).then(() => {
    // on close
  });
}

// 退出登录
function outLogin() {
  showConfirmDialog({
    title: "退出登录",
    message: "是否退出登录",
  })
    .then(async () => {
      // 确认后的处理
      await login.signOut();
      store.commit("login/deleteUserId");
      router.back();
    })
    .catch(() => {
      // on cancel
    });
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 0;
}
.middle,
.top,
.bottom {
  background-color: #fff;
  padding: 0 20px;
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #e8e8e8;
    color: #333;
    .privateImage {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      font-size: 30px;
      font-weight: 500;
    }
    .icon_left {
      font-size: 36px;
      font-weight: 700;
      color: #d8d8d8;
    }
  }
}
.username {
  font-size: 32px;
  color: #999;
  margin-right: 20px;
}
.safe,
.bind {
  color: #666;
  font: 24px Microsoft Yahei;
  padding: 18px;
}
.phone {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  padding-right: 10px;
}
button {
  width: 100%;
  outline: none;
  background-color: #d8584a;
  border: 0;
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 10px;
  color: #fff;
  font: 34px Microsoft Yahei;
}
</style>
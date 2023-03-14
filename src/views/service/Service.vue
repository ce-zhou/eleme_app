<template>
  <Header headTitle="服务中心"></Header>
  <div class="main">
    <div class="hot_questions">
      <h4>热门问题</h4>
      <ul>
        <li
          v-for="(item, index) in service.questionTitle"
          :key="index"
          @click="toQuestionDetail(item, index)"
        >
          <span>{{ item }}</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <a href="tel:10103434" class="hot_phone">
      <van-icon name="phone" />
      热线电话:
      <span>10103434</span>
    </a>
  </div>
  <footer>
    <van-button round block type="primary" native-type="submit"
    class="button"
    @click="toService">
      在线客服
    </van-button>
    <section class="service">
      <van-icon name="clock-o" class="icon_service"/>
      <p>服务进度</p>
    </section>
  </footer>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
import { reactive, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const ser = proxy.$http.service;
const service = reactive({
  serviceData: {}, // 服务信息
  questionTitle: [], // 问题标题
  questionDetail: [],
});

// 获取信息
async function getService() {
  const { data: res } = await ser.getService();
  service.serviceData = res;
  Object.keys(service.serviceData).forEach((item) => {
    let avoidRepeat = false;
    //防止重复的数据，后台返回的数据有些是重复的
    service.questionTitle.forEach((insertItem) => {
      if (insertItem == service.serviceData[item]) {
        avoidRepeat = true;
      }
    });
    if (item.indexOf("Caption") !== -1 && !avoidRepeat) {
      service.questionTitle.push(service.serviceData[item]);
    } else if (!avoidRepeat) {
      service.questionDetail.push(service.serviceData[item]);
    }
  });
}
getService();

// 保存问题详情
function toQuestionDetail(title, index) {
  store.commit("service/saveQuestion", {
    title,
    detail: service.questionDetail[index],
  });
  router.push("/service/questionDetail");
}

// 点击按钮跳转页面
function toService() {
  router.push('/service/online')
}
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 100px;
}
.hot_questions {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  h4 {
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #eee;
    font-size: 32px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 28px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
}
.hot_phone {
  display: block;
  margin-top: 30px;
  color: #333;
  font-size: 26px;
  text-align: center;
  span {
    color: #0fbffd;
  }
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  background-color: #fff;
  .button {
    width: 75%;
    height: 70px;
    margin-left: 10px;
  }
  .service {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    font-size: 20px;
    .icon_service {
      font-size: 30px;
    }
  }
}
</style>
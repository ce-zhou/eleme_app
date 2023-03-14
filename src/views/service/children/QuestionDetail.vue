<template>
  <Header headTitle="问题详情"></Header>
  <div class="main">
    <div class="container">
      <p class="title">{{ question.title }}</p>
      <v-md-preview :text="question.detail"></v-md-preview>
    </div>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { useStore } from "vuex";

const store = useStore();
const question = store.state.service.question;
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
.container {
  padding: 0 20px 20px;
  background-color: #fff;
  border-radius: 20px;
  .title {
    padding: 20px 0;
    font-size: 30px;
  }
}
/deep/.vuepress-markdown-body:not(.custom) {
  padding: 0;
}
/deep/.vuepress-markdown-body {
  color: #666;
  font-size: 26px;
}
/deep/.vuepress-markdown-body h2 {
  font-size: 26px;
  font-weight: 400;
}
/deep/.vuepress-markdown-body h3 {
  font-size: 26px;
  font-weight: 400;
}
</style>
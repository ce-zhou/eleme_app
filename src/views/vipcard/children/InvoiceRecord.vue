<template>
  <Header headTitle="购买记录"></Header>
  <div class="main">
    <section class="invoice_contianer">
      <img src="../../../images/no-log.png" />
      <p>没有购买记录</p>
    </section>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
</script>

<style lang="less" scoped>
.main {
  text-align: center;
  padding: 80px 10px 20px;
}
.invoice_contianer {
    margin-top: 230px;
  img {
    width: 400px;
  }
  p {
    color: #999;
    font-size: 28px;
  }
}
</style>
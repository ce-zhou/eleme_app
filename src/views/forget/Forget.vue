<template>
  <Header headTitle="重置密码"></Header>
  <div class="main">
    <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="username"
      label="用户名"
      placeholder="请输入用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      label="旧密码"
      placeholder="请输入旧密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="newPassword"
      type="password"
      label="新密码"
      placeholder="请输入新密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="confirmPassword"
      type="password"
      label="确认新密码"
      placeholder="请确认新密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="password"
      type="password"
      label="验证码"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

  </div>
</template>

<script setup>
import Header from "../../components/header/Header.vue";
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}
</style>
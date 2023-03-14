<template>
  <div class="OtherChat">
    <div class="other_user">
      <div class="time"></div>
      <div class="user_main">
        <div class="avatar_warp">
          <img src="../../images/robot.jpeg" alt="" />
        </div>
        <div class="user_message">{{message}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['message'])
</script>

<style lang="less" scoped>
.time {
  text-align: center;
  color: #9a9a9a;
  padding-bottom: 20px;
}
.other_user {
  padding-bottom: 10px;
}
.user_main {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.user_message {
  padding: 20px 30px;
  font-size: 24px;
  background-color: #fff;
  border-radius: 10px 60px 60px 60px;
}
img {
  width: 90px;
  margin-right: 20px;
  border-radius: 50%;
}
.triangle_left {
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  margin-left: 20px;
  border-right: 20px solid #ededed;
  border-bottom: 16px solid transparent;
}
</style>
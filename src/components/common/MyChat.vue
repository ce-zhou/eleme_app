<template>
  <div class="MyChat">
    <div class="my_user">
      <div class="time"></div>
      <div class="other_main">
        <div class="other_message">
          {{ message }}
        </div>
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
/* 我的信息 */
.my_user {
  padding-bottom: 30px;
}
.other_main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.other_message {
  padding: 10px 30px;
  font-size: 24px;
  background: linear-gradient(
    90deg,
    rgba(246, 60, 47, 0.6),
    rgba(128, 58, 242, 0.6)
  );
  border-radius: 60px 10px 60px 60px;
}
</style>
<template>
  <Header headTitle="修改用户名"></Header>
  <div class="main">
    <div class="top">
        <input type="text" v-model="name.newUsername" placeholder="请输入用户名" required>
    </div>
    <div class="middle">
        <span>用户只能修改一次(5-24字符之间)</span>
    </div>
    <button @click="resetName">确认修改</button>
  </div>
</template>

<script setup>
import Header from '../../../../components/header/Header.vue';
import { useStore } from 'vuex';
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const name = reactive({
    newUsername: ''
})

function resetName() {
    store.commit('login/resetUserName', name.newUsername)
    router.back()
}
</script>

<style lang="less" scoped>
    .main {
        padding: 90px 10px 20px;
    }
    .top {
        background-color: #fff;
        padding: 30px;
        input {
            width: 100%;
            height: 90px;
            outline: none;
            border: 2px solid #eee;
            border-radius: 10px;
            text-indent: 10px;
        }
    }
    .middle {
        padding: 20px;
        font-size: 18px;
        color: #666;
    }
    button {
        width: 100%;
        height: 90px;
        outline: none;
        border: 0;
        background-color: #3199e8;
        border-radius: 15px;
        color: #add6f6;
        font-size: 32px;
    }
</style>
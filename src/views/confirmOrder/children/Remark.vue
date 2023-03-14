<template>
  <Header headTitle="订单备注"></Header>
  <div class="main">
    <div class="top">
      <header class="header_style">快速备注</header>
      <ul class="remark_arr_list_ul">
        <li
          class="remark_arr_list_li"
          v-for="(item, index) in remark.remarkList"
          :key="index"
        >
          <span
            class="remark_item_li"
            v-for="(remarkItem, remarkIndex) in item"
            :key="remarkIndex"
            :class="{
              choosed:
                remark.remarkText[index] &&
                remark.remarkText[index][0] == remarkIndex,
            }"
            @click="chooseRemark(index, remarkIndex, remarkItem)"
          >
            {{ remarkItem }}</span
          >
        </li>
      </ul>
    </div>
    <div class="bottom">
      <header class="header_style">其他备注</header>
      <textarea
        v-model="remark.inputText"
        class="input_text"
        placeholder="请输入备注内容(可不填)"
      ></textarea>
      <div class="determine_box">
        <button class="determine" @click="confirmRemark">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../../../components/header/Header.vue";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'

const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const store = useStore();
const order = proxy.$http.order;
const remark = reactive({
  remarkList: [], // 返回的口味列表
  remarkText: {},
  inputText: "",
});

async function getRemark() {
  const id = route.query.id;
  const sig = route.query.sig;
  const { data: res } = await order.getRemark(id, sig);
  remark.remarkList = res.remarks;
}

//选择备注
function chooseRemark(index, remarkIndex, text) {
  remark.remarkText[index] = [remarkIndex, text];
  remark.remarkText = Object.assign({}, remark.remarkText);
}
//确认选择
function confirmRemark() {
    store.commit('cart/confirmRemark', {
        remarkText: remark.remarkText,
        inputText: remark.inputText
    })
    router.back()
}

onMounted(() => {
  getRemark();
});
</script>

<style lang="less" scoped>
.main {
  padding: 90px 10px 20px;
}

.top,
.bottom {
  background-color: #fff;
  padding: 20px;
  .header_style {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .remark_arr_list_ul {
    display: flex;
    flex-wrap: wrap;
    .remark_arr_list_li {
      display: flex;
      border: 1px solid #97c7f3;
      margin: 0 28px 28px 0;
      border-radius: 15px;
      .remark_item_li {
        display: block;
        padding: 15px 28px;
        font: 28px Helvetica Neue, Tahoma, Arial;
        border-right: 1px solid #97c7f3;
        &:last-child {
          border: 0;
        }
      }
      .choosed {
        color: #fff;
        background-color: #3190e8;
      }
    }
  }
}
.bottom {
  margin-top: 20px;
  textarea {
    width: 100%;
    height: 160px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    padding: 20px;
    font-size: 28px;
  }
}
.determine_box {
    display: flex;
    justify-content: end;
}
.determine {
    background-color: #4cd964;
    border: 0;
    padding: 10px 30px;
    border-radius: 10px;;
    color: #fff;
    font-size: 30px;
}
</style>
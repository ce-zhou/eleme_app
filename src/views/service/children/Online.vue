<template>
  <Header headTitle="我的客服"></Header>
  <div class="main" id="gundong">
    <div>
      <!-- 客服信息 -->
      <other-chat message="hi~我是智能助理小e, 很高兴为您服务。"></other-chat>

      <ul class="problem_list">
        <li
          v-for="(item, index) in online.problem"
          :key="index"
          @click="getMessage(item.title, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!-- 我的信息 -->
    <div v-for="(item, index) in online.message" :key="index">
      <my-chat v-if="item.user == 'mine'" :message="item.title"></my-chat>
      <div v-if="item.user == 'other'" class="box">
        <p v-for="(SonItem, index) in item.con" :key="index">{{ SonItem }}</p>
        <div v-if="item.only == 1" class="btn_box">
          <button class="other" @click="otherProblem">其他问题</button>
          <button class="person">人工服务</button>
        </div>
      </div>
      <other-chat
        v-if="item.user == 'others'"
        :message="item.text"
      ></other-chat>
    </div>
    <div class="person_serive" v-if="online.appear">
      <section>
        <img src="../../../images/avatar.jpeg" alt="" />
        <div class="word">
          <p class="xiaoe">小饿客服: 企西西</p>
          <p class="person">人工客服</p>
        </div>
      </section>
    </div>
    <div v-if="online.appear" class="person-service">
      <div v-for="(list, index) in online.msgList" :key="index">
        <div>
          <p :class="{ right: list.type == 'my' }">
            <img
              v-if="list.type == 'user'"
              :src="list.senderimg"
              class="avatar"
            />
            <img
              v-if="list.type == 'my'"
              :src="list.senderimg"
              style="float: right"
              class="avatar"
            />
            <span
              class="content"
              :class="{ right_content: list.type == 'my' }"
              >{{ list.msg }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <section class="top">
      <span @click="toPerson">转人工</span>
    </section>
    <section class="bottom">
      <input
        type="text"
        v-model="online.inputText"
        placeholder="请输入您的问题~"
        :class="{ submit: online.inputText }"
        id="input_focus"
        @focus="online.exeute = true"
      />
      <van-icon name="add-o" class="add" />
      <button @click="getMsg" v-show="online.inputText">发送</button>
    </section>
  </footer>
  <!-- 弹出层 -->
  <van-popup
    v-model:show="online.showBottom"
    round
    closeable
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="header">请选择您要咨询的订单</div>
    <ul class="list_container">
      <li v-for="(item, index) in online.order" :key="index" class="list_li">
        <section class="list_top">
          <div>
            <svg class="icon shop" aria-hidden="true">
              <use xlink:href="#icon-shangjia"></use>
            </svg>
            <span class="common">{{ item.restaurant_name }}</span>
          </div>
          <div class="common title">{{ item.status_bar.title }}</div>
        </section>
        <section class="list_bottom">
          <div class="left">
            <img :src="online.imgBaseUrl + item.restaurant_image_url" alt="" />
            <section>
              <p class="shangpin" v-if="item.basket.group[0].length == 1">
                {{ item.basket.group[0][0].name }}
              </p>
              <p v-else>
                {{ item.basket.group[0][0].name }}等
                {{ item.basket.group[0].length }}件商品
              </p>
              <p class="time">{{ item.formatted_created_at }}</p>
            </section>
          </div>
          <div class="right">
            <p class="price">￥{{ item.total_amount }}</p>
            <p class="waimai">外卖</p>
            <button @click="consultation">咨询</button>
          </div>
        </section>
      </li>
    </ul>
  </van-popup>
</template>

<script setup>
import HeaderVue from "../../../components/header/Header.vue";
import MyChat from "../../../components/common/MyChat.vue";
import OtherChat from "../../../components/common/OtherChat.vue";
import { reactive, getCurrentInstance, onUpdated } from "vue";
import { useStore } from "vuex";
import dialog from "../../../plugins/robotDialog";
import useState from '../../../plugins/useState'

const store = useStore();
const { proxy } = getCurrentInstance();
const robot = proxy.$http.robot;
const socket = proxy.$socket;
const userInfo = store.state.login.userInfo;
const storeState = useState({
  userInfo: (state)=> state.login.userInfo
})
const online = reactive({
  problem: [
    { title: "怎么催单？", user: "mine" },
    { title: "订单超时了怎么办？", user: "mine" },
    { title: "提前点击送达了怎么办？", user: "mine" },
    { title: "错送漏送餐品怎么办？", user: "mine" },
    { title: "无骑士接单怎么办？", user: "mine" },
    { title: "餐品质量有问题怎么办？", user: "mine" },
    { title: "红包为什么用不了？", user: "mine" },
  ],
  title: "",
  showBottom: false, // 弹出层
  order: [], // 历史订单前两条数据
  imgBaseUrl: "https://elm.cangdu.org/img/",
  message: [],
  inputText: "", // 输入框消息
  appear: false, // 判断人工客服是否出现
  msgList: [],
  exeute: true,
});

socket.on("messageList", (data) => {
  if (online.exeute) {
    online.msgList.push(data);
  }
});
// 点击列表获取文字
function getMessage(title, index) {
  online.title = title;
  if (online.title == "怎么催单？") {
    online.message.push(online.problem[index]);
    setTimeout(() => {
      online.showBottom = true;
      // 获取订单页的数据
      let order = store.state.cart.order;
      online.order = order.slice(0, 2);
    }, 500);
  } else if (online.title == "无骑士接单怎么办？") {
    online.message.push(online.problem[index]);
    setTimeout(() => {
      online.message.push(dialog[3]);
    }, 500);
  } else {
    online.message.push(online.problem[index]);
    setTimeout(() => {
      online.message.push(dialog[index]);
    }, 500);
  }
}

// 点击咨询按钮触发的事件
function consultation() {
  online.message.push(dialog[0]);
  online.showBottom = false;
}

// 点击发送按钮触发的事件
async function getMsg() {
  online.exeute = false;
  if (!online.appear) {
    const { data: res } = await robot.getMsg(online.inputText);
    online.message.push({ title: online.inputText, user: "mine" });
    online.inputText = "";
    document.getElementById("input_focus").focus();
    setTimeout(() => {
      online.message.push({ text: res.data.info.text, user: "others" });
    }, 500);
  } else {
    let data = {
      type: "my",
      sender: userInfo.username, //发送者id
      senderimg: "https://elm.cangdu.org/img/" + userInfo.avatar, //发送者的img
      receiver: "best1", //接收方id
      // time: time.toLocaleString(), //发送时间
      msg: online.inputText, //消息内容
    };
    online.msgList.push(data);
    socket.emit("privateChat", data);
    online.inputText = "";
    document.querySelector("#input_focus").focus();
  }
}

// 点击其他问题触发事件
function otherProblem() {
  online.message.push({ title: "其他问题", user: "mine" });
  setTimeout(() => {
    online.message.push(dialog[dialog.length - 1]);
  }, 500);
}

// 转人工后发起websocket对话连接
function toPerson() {
  online.appear = true;
  socket.connect();
  socket.emit(
    "login",
    {
      name: userInfo.username,
      img: online.imgBaseUrl + userInfo.avatar,
    },
    (results) => {
      console.log(results);
    }
  );
  socket.on("login", (data) => {
    data.filter((item) => {
      item.name = "best";
    });
    window.sessionStorage.setItem("list", data[0].img);
  });
}

// 是滚动条始终保持最底部
onUpdated(() => {
  let msg = document.getElementById("gundong"); // 获取对象
  msg.scrollTop = msg.scrollHeight; // 滚动高度
});
</script>

<style lang="less" scoped>
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 130px;
  padding: 0 20px;
  overflow-y: auto;
}

.problem_list {
  width: 80%;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 30px;
  li {
    padding: 10px 0;
    font-size: 24px;
    border-bottom: 1px solid #eee;
  }
}
.box {
  width: 80%;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 20px;
  p {
    margin-bottom: 10px;
    color: #666;
    font-size: 22px;
  }
  .btn_box {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    button {
      padding: 5px 20px;
      font-size: 22px;
      border: 0;
      border-radius: 20px;
    }
    .other {
      color: #fff;
      background-color: #21a1f1;
    }
    .person {
      background-color: #fff;
      border: 1px solid #999;
    }
  }
}
.person_serive {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  section {
    width: 400px;
    height: 150px;
    text-align: center;
    background-color: #fff;
    border-radius: 30px;
  }
  img {
    transform: translateY(-50%);
    width: 100px;
    border-radius: 50%;
  }
  .word {
    font-size: 24px;
    transform: translateY(-50px);
    .person {
      color: #999;
    }
  }
}

footer {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 20px;
  background-color: #f2f2f2;
  .top {
    margin-bottom: 10px;
    span {
      padding: 5px 20px;
      margin: 10px 0;
      font-size: 22px;
      background-color: #fff;
      border-radius: 20px;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  input {
    width: 90%;
    height: 60px;
    text-indent: 20px;
    background-color: #fff;
    border: 0;
    border-radius: 20px;
  }
  .submit {
    width: 78%;
  }
  .add {
    font-size: 50px;
  }
  button {
    padding: 5px 20px;
    font-size: 24px;
    color: #fff;
    background-color: #21a1f1;
    border: 0;
    border-radius: 20px;
  }
}

.header {
  margin: 20px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
}
.list_container {
  margin-top: 30px;
  padding: 0 10px;
}
.list_li {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
}
.list_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .shop {
    width: 45px;
    height: 45px;
    margin-right: 20px;
    vertical-align: middle;
  }
  .common {
    font-size: 24px;
  }
  .title {
    color: #0fbffd;
  }
}
.list_bottom {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    font-size: 20px;
  }
  img {
    width: 120px;
    height: 120px;
    margin-right: 10px;
    border-radius: 20px;
  }
  .time {
    color: #999;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: end;
    font-size: 22px;
    .waimai {
      margin-bottom: 8px;
      color: #0fbffd;
    }
    button {
      padding: 5px 30px;
      color: #fff;
      background-color: #21a2f1;
      border: 0;
      border-radius: 20px;
    }
  }
}
.person-service {
  margin-top: 20px;
  P {
    width: 100%;
    height: 120px;
    line-height: 120px;
    .avatar {
      width: 80px;
      margin-left: 10px;
      border-radius: 50%;
    }
  }
  .content {
    padding: 10px 30px;
    font-size: 24px;
    background-color: #fff;
    border-radius: 10px 60px 60px 60px;
  }
  .right {
    text-align: right;
  }
  .right_content {
    padding: 10px 30px;
    font-size: 24px;
    background: linear-gradient(
      90deg,
      rgba(246, 60, 47, 0.6),
      rgba(128, 58, 242, 0.6)
    );
    border-radius: 60px 10px 60px 60px;
  }
}
</style>
<style>
.van-popup {
  height: 70% !important;
  background-color: #f2f2f2;
}
</style>
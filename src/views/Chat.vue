<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="item.name === 'xs'">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image fit="cover" round :src="userAvatar" />
        </div>
      </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么..." class="ipt">
        <template #button>
          <span @click="send()" style="font-size: 12px; color: #999" class="btn"
            >提交</span
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { io } from "socket.io-client";
let socket = null;
export default {
  name: "Chat",
  data() {
    return {
      // 用户聊天的信息
      word: "",
      // 所有的聊天信息
      list: [],
    };
  },
  methods: {
    // 提交按钮的点击事件处理函数
    send() {
      // 如果输入的聊天内容为空，则 return 出去
      if (!this.word) return;

      socket.emit("send", this.word);
      this.list.push({ name: "me", msg: this.word });
      this.word = "";
      // 打印输出用户填写的聊天内容
      console.log(this.word);
    },
    // 滚动到页面底部
    scrollBottom() {
      const chatItem = document.querySelectorAll(".chat-item");
      const lastItem = chatItem[chatItem.length - 1];
      lastItem.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    },
  },
  computed: {
    ...mapGetters(["userAvatar"]),
  },
  watch: {
      list() {
          this.$nextTick(()=>{
              this.scrollBottom()
          })
      }
  },

  // 创建客户端实例
  created() {
    socket = io("ws://www.liulongbin.top:9999");
    socket.on("message", (msg) => this.list.push({ name: "xs", msg }));
    socket.on("connect", () => console.log("connect: websocket 连接成功！"));
    socket.on("disconnect", () =>
      console.log("disconnect: websocket 连接关闭！")
    );
  },
  // 组件被销毁之前，清空 sock 对象
  beforeDestroy() {
    // 关闭连接
    socket.close();
    // 销毁 websocket 实例对象
    socket = null;
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
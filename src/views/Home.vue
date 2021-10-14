<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../assets/toutiao_logo.png" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky offset-top="1.23rem">
      <van-tab v-for="item in userChannel" :title="item.name" :key="item.id">
        <art-list :channelId="item.id"></art-list>
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from '../api/homeAPI'
import ArtList from '@/components/ArticleList/ArticleList.vue'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      userChannel: []
    }
  },
  methods: {
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      console.log(res)
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    }
  },
  components: {
    ArtList
  },
  created () {
    this.initUserChannel()
  }
}
</script>

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
  // logo 样式
  .logo {
    height: 80%;
  }
}
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
</style>

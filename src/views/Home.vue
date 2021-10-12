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
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
  <van-tab title="标签 5">内容 5</van-tab>
  <van-tab title="标签 6">内容 6</van-tab>
  <van-tab title="标签 7">内容 7</van-tab>
  <van-tab title="标签 8">内容 8</van-tab>
</van-tabs>
<van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 0
    }
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

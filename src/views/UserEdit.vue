<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link value="张三" />
      <van-cell title="生日" is-link value="2012-12-12" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'UserEdit',
  methods: {
      ...mapActions(['initUserProfile']),

  },
  created () {
      this.initUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
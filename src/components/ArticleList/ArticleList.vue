<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :disabled="finished">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false">
        <!-- 循环渲染文章的列表 -->
        <article-item
          v-for="item in artlist"
          :key="item.art_id"
          :article="item"
          @remove-article="removeArticle">
          </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api/homeAPI'
import ArticleItem from '../ArticleItem/ArticleItem.vue'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      artlist: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    // 初始化文章的列表数据
    async initArtList (isRefresh) {
      // 请求 API 接口
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp)
      if (res.message === 'OK') {
        // 为时间戳重新赋值
        this.timestamp = res.data.pre_timestamp
        if (isRefresh) {
          // 下拉刷新
          // 1--- 新数据在前 旧数据在后
          this.artlist = [...res.data.results, ...this.artlist]
          // 为 artlist 赋值
          // this.artlist = res.data.results
          // 1. 上拉加载更多时，应该是“旧数据”在前，“新数据”在后
          this.isLoading = false
        } else {
          // 上拉加载
          // 1--- 旧数据在前 前数据在后
          this.artlist = [...this.artlist, ...res.data.results]
          // 2. 重置 loading 为 false
          this.loading = false
          // 3. 判断所有的数据是否已加载完毕
        }
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    onLoad () {
      console.log('触发更多上拉加载')
      this.initArtList()
    },
    onRefresh () {
      console.log('触发了下拉刷新')
      this.initArtList(true)
    },
    removeArticle (id) {
      console.log('你要删除的文章ID:', id)
      this.artlist = this.artlist.filter(item => item.art_id !== id)
    }
  },
  created () {
    // 在组件创建的时候，请求文章的列表数据
    this.initArtList()
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped></style>

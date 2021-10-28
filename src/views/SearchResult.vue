<template>
  <div class="search-result-container">
    <!-- 点击实现后退效果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 文章的 Item 项 -->
      <art-item
        v-for="item in searchList"
        :key="item.art_id.toString()"
        :article="item"
        :closable="false"
      ></art-item>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api/searchAPI'
import ArtItem from '@/components/ArticleItem/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data () {
    return {
      // 页码值
      page: 1,
      // 搜索的结果
      searchList: [],
      // 是否正在进行上拉加载的数据请求
      loading: false,
      // 所有数据是否已经加载完毕
      finished: false
    }
  },
  methods: {
    async initSearchList () {
      const { data: res } = await getSearchResultAPI(this.kw, this.page)

      if (res.message === 'OK') {
        //   拼接数据：“旧数据”在前，“新数据”在后
        this.searchList = [...this.searchList, ...res.data.results]
        this.loading = false
        // 判断数据是否加载完毕
        if (res.data.results.length === 0) {
          this.finished = true
        }
        this.page += 1
      }
    },
    created () {
      this.initSearchList()
    },
    onLoad () {
      this.initSearchList()
    }
  },
  components: {
    // 注册组件
    ArtItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>

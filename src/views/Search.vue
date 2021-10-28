<template>
  <div>
    <!-- Header 头部区域 -->
    <div class="search-header">
      <!-- 后退图标 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="18"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        ref="searchRef"
        @input="onInput"
      />
    </div>

    <!-- 搜索建议 -->
    <div class="sugg-list" v-if="kw.length != 0">
      <div
        class="sugg-item"
        v-for="(item, i) in suggestList"
        :key="i"
        v-html="item"
        @click="gotoSearchResult"
      >
        {{ item }}
      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(tag, i) in history"
          :key="i"
          @click="gotoSearchResult"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestListAPI } from '@/api/searchAPI.js'
export default {
  name: 'Search',
  data () {
    return {
      // 搜索关键词
      kw: '',
      // 延时器
      timerId: null,
      // 搜索列表
      suggestList: [],
      // 搜索历史
      history: JSON.parse(localStorage.getItem('history') || '[]')
    }
  },
  mounted () {
    const ipt = document.querySelector('input[type=search]')
    // 如果有ipt 则为他添加焦点事件
    ipt && ipt.focus()
  },
  methods: {
    // 搜索组件的输入事件
    onInput () {
      // 2. 清除上次的延时器
      clearTimeout(this.timerId)

      // 3. 如果输入的内容为空则不开启延时器
      if (this.kw.length === 0) {
        // 清空搜索建议的列表数据
        this.suggestList = []
        return
      }

      // 1. 开启延时器
      this.timerId = setTimeout(() => {
        console.log(this.kw)
        // 重新请求数据
        this.initSuggestList()
      }, 500)
    },
    async initSuggestList () {
      // 调用 API 接口
      const { data: res } = await getSuggestListAPI(this.kw)
      if (res.message === 'OK') {
        // 调用高亮方法
        this.hlightKeywords(res.data.options)

        // 将获取到的数据传给 suggestList
        this.suggestList = res.data.options

        // 把搜索关键词加入到搜索历史中
        const newHistory = this.history.filter((item) => item !== this.kw)
        newHistory.unshift(this.kw)
        this.history = newHistory
      }
    },
    hlightKeywords (arr) {
      // 根据用户输入的 kw 动态创建正则表达式
      const reg = new RegExp(this.kw, 'ig')
      arr.forEach((item, index) => {
        arr[index] = item.replace(reg, (val) => {
          return `<span style="color: red; font-weight: bold;">${val}</span>`
        })
      })
    },
    // 跳转到搜索结果页
    gotoSearchResult (e) {
      console.log(e)
      const kw = e.currentTarget.innerText
      this.$router.push('/search/' + kw)
    }
  },
  watch: {
    history (newVal) {
      // 持久化存储到本地
      localStorage.setItem('history', JSON.stringify(newVal))
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>

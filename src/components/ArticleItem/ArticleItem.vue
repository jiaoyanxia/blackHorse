<template>
  <div id="ArticleItem">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <!-- <img v-if="article.cover.type === 1" :src="article.cover.images[0]" alt="" class="thumb"> -->
          <img
            v-if="article.cover.type === 1"
            v-lazy="article.cover.images[0]"
            alt=""
            class="thumb"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img
            v-for="(imgsrc, index) in article.cover.images"
            :src="imgsrc"
            :key="index"
            alt=""
            class="thumb"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >作者 {{ article.aut_name }} &nbsp;&nbsp;
            {{ article.comm_count }}评论 &nbsp;&nbsp; 发布日期
            {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true" v-if="closable"/>
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      @closed="isFirst = true"
      get-container="body"
    >
      <div class="content" v-if="isFirst">
        <van-cell
          :title="item.name"
          clickable
          class="center-title"
          v-for="item in actions"
          :key="item.name"
          @click="onCellClick(item.name)"
        />
      </div>
      <div v-else>
        <van-cell
          :title="item.label"
          clickable
          title-class="center-title"
          v-for="item in reports"
          :key="item.type"
          @click="reportArticle(item.type)"
        />
        <van-cell
          title="返回"
          clickable
          title-class="center-title"
          @click="isFirst = true"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '@/api/reports'
import { dislikeArticleAPI, reportsArticleAPI } from '@/api/homeAPI.js'
export default {
  name: 'ArticleItem',
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true // 必填项
    },
    // 是否展示关闭按钮
    closable: {
      type: Boolean,
      // 默认值为 true，表示展示关闭按钮
      default: true
    }
  },
  data () {
    return {
      // 是否展示反馈板块
      show: false,
      isFirst: true,
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      reports
    }
  },
  methods: {
    async onCellClick (name) {
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.article.art_id)
        console.log(res)
        if (res.message === 'OK') {
          // 炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
          this.$emit('remove-article', this.article.art_id)
        }
        this.show = false
      }
      if (name === '拉黑作者') {
        this.show = false
      } else if (name === '反馈垃圾内容') {
        // 二级反馈面板
        this.isFirst = false
      }
    },
    async reportArticle (type) {
      // 1. 发起举报文章的请求
      const { data: res } = await reportsArticleAPI(this.article.art_id, type)
      console.log(res)
      // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
      if (res.message === 'OK') {
        this.$emit('remove-article', this.article.art_id)
        // 3. 关闭动作面板
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
.center-title {
  text-align: center;
}
</style>

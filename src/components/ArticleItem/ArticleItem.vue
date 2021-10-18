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
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" cancel-text="取消" :closeable="false" @closed="isFirst = true">
      <div class="content" v-if="isFirst">
        <!-- <van-cell title="aaa" clickable class="center-title" />
        <van-cell title="aaa" clickable class="center-title" />
        <van-cell title="aaa" clickable class="center-title" /> -->
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
        <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true"/>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true // 必填项
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
      ]
    }
  },
  methods: {
    onCellClick (name) {
      if (name === '不感兴趣') {
        console.log('不感兴趣')
        this.show = false
      }
      if (name === '拉黑作者') {
        console.log('拉黑作者')
        this.show = false
      } else if (name === '反馈垃圾内容') {
        // 二级反馈面板
        this.isFirst = false
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

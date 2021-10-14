<template>
  <div>文章列 - {{ channelId }} - 表组件</div>
</template>

<script>
// import { getArtListAPI } from '@/api/homeAPI'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  }
//   data () {
//     return {
//       artlist: [],
//       timestamp: Data.now()
//     }
//   },
//   methods: {
//     // 初始化文章的列表数据
//     async initArtList () {
//       // 请求 API 接口
//       const { data: res } = await getArtListAPI(this.channelId, this.timestamp)
//       if (res.message === 'OK') {
//         // 为时间戳重新赋值
//         this.timestamp = res.data.pre_timestamp
//         // 为 artlist 赋值
//         console.log(res)
//         // 为 artlist 赋值
//         this.artlist = res.data.results
//       }
//     }
//   },
//   created () {
//     // 在组件创建的时候，请求文章的列表数据
//     this.initArtList()
//   }
}
</script>

<style lang="less" scoped></style>

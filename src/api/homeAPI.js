// 导入请求数据的 request 模块
import request from '@/utils/request'
/**
 *
 * @returns
 */
// 请求用户频道列表数据的 API
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels'

  )
}

export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      // 频道的 Id
      channel_id: id,
      // 时间戳
      timestamp: time
    }
  })
}

// 用来将指定 id 的文章设置为不感兴趣
export const dislikeArticleAPI = id => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}

// 用来实现举报文章的功能
export const reportsArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target, // 文章的 Id
    type // 举报的类型
  })
}

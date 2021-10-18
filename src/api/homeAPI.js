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

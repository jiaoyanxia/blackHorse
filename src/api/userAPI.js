import request from '@/utils/request'
import axios from 'axios'
// 登录的 API 接口
export const loginAPI = data => {
  return request.post('/v1_0/authorizations', data)
}

// 换取 Token 的 API (形参中的 refreshToken 用来获取新的 token)
export const exchangeTokenAPI = res => {
  return axios({
    method: 'PUT',
    // 必须填写完整的 URL 地址
    url: 'http://geek.itheima.net/v1_0/authorizations',
    headers: {
      // 在请求头中携带 Authorization 身份认证字段
      Authorization: 'Bearer' + res
    }
  })
}

// 请求用户基本信息的 API
export const getUserInfoAPI = () => {
  return request.get('/v1_0/user')
}

// 请求用户简介信息的 API
export const getUserProfileAPI = () => {
  return request.get('/v1_0/user/profile')
}
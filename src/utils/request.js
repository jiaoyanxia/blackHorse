import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'

// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  baseURL: 'http://www.liulongbin.top:8000'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁用背景点击
    duration: 0 // 持续展示 toast
  })

  const tokenStr = store.state.tokenInfo.token
  if (tokenStr) {
    config.headers.Authorization = 'Bearer ' + tokenStr
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  Toast.clear()
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance

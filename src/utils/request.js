import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
import router from '@/router'
// import { exchangeTokenAPI } from '@/api/userAPI.js'

// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  baseURL: 'http://geek.itheima.net'
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
instance.interceptors.response.use(
  response => {
    Toast.clear()
    return response
  },
  async error => {
    // 对响应错误做点什么
    Toast.clear()
    // 判断是否过期
    if (error.response && error.response.status === 401) {
      console.log('token 过期啦')
      // 1 清空 vuex 和 localStorage 中的数据
      store.commit('cleanTokenInfo')
      // 2 强制跳转到登录页
      // router.replace('/login?pre=' + router.currentRoute.fullPath)
      // 1.2 强制跳转到 登录页 让用户登录
      router.push('/login?url=' + '/user')
      Toast.clear()
      return Promise.reject(error)
    }
  })

export default instance

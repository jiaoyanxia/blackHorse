import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://www.liulongbin.top:8000'
})

// 添加请求拦截器
instance.interceptors.request.use(
  // 请求前
  function (config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    const tokenStr = store.state.tokenInfo
    if (tokenStr) {
      config.headers.Authorization = 'Bearer' + tokenStr
    }
    console.log(config)
    return config
  },
  // 请求错误前
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 手动清除 Toast
    Toast.clear()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

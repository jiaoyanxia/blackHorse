import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 导入 Vant 和 组件的样式表
import Vant, { Lazyload } from 'vant'
// 这里要把 .css 后缀名改为 .less
import 'vant/lib/index.less'

// 导入 dayjs 的核心模块
import dayjs from 'dayjs'

import relateveTime from 'dayjs/plugin/relativeTime'

import zh from 'dayjs/locale/zh-cn'

Vue.use(Vant)
Vue.config.productionTip = false

dayjs.extend(relateveTime)
dayjs.locale(zh)

// 定义格式化全局过滤器
Vue.filter('dateFormat', dt => {
  return dayjs().to(dt)
})
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

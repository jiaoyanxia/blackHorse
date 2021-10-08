import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 导入 Vant 和 组件的样式表
import Vant from 'vant'
// 这里要把 .css 后缀名改为 .less
import 'vant/lib/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

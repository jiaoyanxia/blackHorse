import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Login.vue页面组件
import Login from '@/views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]

const router = new VueRouter({
  routes
})

export default router
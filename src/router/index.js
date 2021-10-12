import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Login.vue页面组件
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Main,
    children: [
      // path 为"空字符串"的子路由规则，叫做"默认子路由"
      { path: '', component: Home, name: 'home' },
      { path: '/user', component: User, name: 'user' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

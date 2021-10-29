import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Login.vue页面组件
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Search from '@/views/Search.vue'
import SearchResult from '@/views/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
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
  },
  {
    path: '/search',
    component: Search,
    name: 'search'
  },
  {
    // 搜索结果页
    path: '/search/:kw',
    component: SearchResult,
    name: 'search-result'
  },
  {
    // 搜索结果页
    path: '/article/:id',
    component: ArticleDetail,
    name: 'art-deltail',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router

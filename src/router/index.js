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
import UserEdit from '@/views/UserEdit.vue'
import Chat from '@/views/Chat.vue'

// 导入数据
import store from '@/store/index.js'
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
  },
  {
    path: '/user/edit',
    component: UserEdit,
    name: 'user-edit'
  },
  // 小思同学
  { path: '/chat', component: Chat, name: 'chat' }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === '/user' || to.path === '/user/edit') {
    next()
  } else {
    next()
  }
})

// 把有权限的页面路径添加到一个数组里
const pagePathArr = ['/user', '/user/edit']

router.beforeEach((to, form, next) => {
  if (pagePathArr.indexOf(to.path) !== -1) {
    const tokenStr = store.state.tokenInfo.token
    if (tokenStr) {
      next()
    } else {
      next(`/login?pre=${to.fullPath}`)
    }
  } else {
    next()
  }
})

// 解决 vue-router 内部的报错的问题 !!
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject ) return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err=> err)
}


export default router

import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoAPI, getUserProfileAPI } from '@/api/userAPI.js'

Vue.use(Vuex)

const initState = {
  tokenInfo: {
    token: '',
    refresh_token: ''
  },
  userInfo: {},
  userProfile:{}
}
const stateStr = window.localStorage.getItem('state')
// console.log(stateStr) // 空(null) 或者 {"tokenInfo":{"token":"967fea98-fdf9-4076-b08c-b05bdc04f835","refresh_token":"851510b5-0615-444a-b6a4-c30d4118d4fd"}}
if (stateStr !== null) {
  initState.tokenInfo = JSON.parse(stateStr).tokenInfo
}
export default new Vuex.Store({
  state: {
    tokenInfo: initState.tokenInfo,
    userInfo: initState.userInfo,
    userProfile:initState.userProfile
  },
  mutations: {
    // 更新 tokenInfo 数据的方法
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateToStorage')
    },
    saveStateToStorage (state) {
      localStorage.setItem('state', JSON.stringify(state))
    },
    cleanTokenInfo (state) {
      state.tokenInfo = {
        token: '',
        refresh_token: ''
      }
      localStorage.removeItem('state')
    },
    updateUserInfo (state, payload) {
      state.userInfo = payload
      console.log(state.userInfo);
      this.commit('saveStateToStorage')
    },
    // 清空 vuex 和本地的数据
    cleanState (state) {
      // 1.清空 vuex 中的数据
      state.tokenInfo = {}
      state.userInfo = {}
      state.userProfile = {}
      // 2.将清空后的 state 存储到本地
      this.commit('saveStateToStorage')
    },
    updataUserProfile(state, payload) {
      state.userProfile = payload
      this.commit('saveStateToStorage')
    }
  },
  actions: {
    async infoUserInfo (ctx){
      const {data: res} = await getUserInfoAPI()
      if (res.message === 'OK') {
        // TODO: 把数据转交给 Mutation 方法
        // ctx.commit('Mutation方法名')
        ctx.commit('updateUserInfo', res.data)
      }
    },
    async initUserProfile(ctx) {
      const {data: res} = await getUserProfileAPI()
      if(res.message === 'OK'){
        ctx.commit('updataUserProfile',res.data)
      }
    }
  },
  getters: {
    // 用户头像计算属性
    userAvatar (state){
      let imgSrc = 'https://i.loli.net/2021/06/18/2ZJ9RIP1vUlQs4D.jpg'
      if (state.userInfo.photo) {
        imgSrc = state.userInfo.photo
      }

      return imgSrc
    }
  },
  modules: {
  }
})

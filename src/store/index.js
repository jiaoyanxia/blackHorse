import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let initState = { tokenInfo: {} }
const stateStr = localStorage.getItem('state')
if (stateStr) {
  // 加载本地的数据
  initState = JSON.parse(stateStr)
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    // 更新 tokenInfo 数据的方法
    updateTokenInfo (state, payload) {
      state.tokenInfo = payload
      this.commit('saveStateToStorage')
    },
    saveStateToStorage (state) {
      localStorage.setItem('state', JSON.stringify(state))
    }
  },
  actions: {
  },
  modules: {
  }
})

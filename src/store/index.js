import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initState = {
  tokenInfo: {
    token: '',
    refresh_token: ''
  }
}
const stateStr = window.localStorage.getItem('state')
// console.log(stateStr) // 空(null) 或者 {"tokenInfo":{"token":"967fea98-fdf9-4076-b08c-b05bdc04f835","refresh_token":"851510b5-0615-444a-b6a4-c30d4118d4fd"}}
if (stateStr !== null) {
  initState.tokenInfo = JSON.parse(stateStr).tokenInfo
}
export default new Vuex.Store({
  state: {
    tokenInfo: initState.tokenInfo
  },
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

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      mypcs:[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  mutations: {
    changepcs(state, mypcs) {
      console.log('mutation changepcs whith :' + mypcs);
      state.mypcs = mypcs    
    }
  },
  getters: {
    pcsCard: state => {
      return state.mypcs.filter(i => i==1).length
    },
    mypcs:  state => {
      return state.mypcs
    },
  },
  actions: {
    changepcs(state, mypcs) {
      console.log('action changepcs whith :' + mypcs);
      state.mypcs = mypcs    
    }

  }
})

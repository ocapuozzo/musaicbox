import Vue from 'vue'
import Vuex from 'vuex'
import ipcs from './modules/IPcs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules : {
      ipcs
	},
  
})
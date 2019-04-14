import Vue from 'vue'
import Vuex from 'vuex'
import ipcs from './modules/IPcsModule'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    // strict : process.env.NODE_ENV !== 'production',
    modules : {
      ipcs
	},
  
})
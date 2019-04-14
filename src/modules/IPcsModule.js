import IPcs from "../models/IPcs";

const state = {
  ipcs : new IPcs("0,4,7", 0)
}

const getters = {
  pcsCard: state => {
    return state.ipcs.cardinal();
  },

  iv: state => {
    return state.ipcs.iv();
  },

  id: state => {
    return state.ipcs.id();
  },

  pcsstr: state => {
    return state.ipcs.pcsStr;
  },

  cyclicPF: state => {
    return state.ipcs.cyclicPrimeForm();
  },

  fortenum(state, getters) {
    return state.ipcs.getForteNum();
  },

   pcs: state => {
    return state.ipcs.pcs
   },

  ipcs: state => {
    return state.ipcs
  }

}

const actions = {}

const mutations = {

  update(state, ipcs) {
    // console.log('ipcs mutation :' + ipcs);
    state.ipcs = ipcs;
  },

  changepcs(state, pcs) {
    // console.log('mutation changepcs whith :' + pcs);
    state.ipcs.pcs = pcs;
  },

  /**
   * update new pcs by toggle 0 or 1 value on index position
   * @param state
   * @param index
   */
  toggleindexpcs(state, index) {
    state.ipcs.pcs  = state.ipcs.pcs.map((value, i) => {
      if (i === index) {
        return (value === 1) ? 0 : 1
      }
      return value
    })
  },

  /**
   * update new pcs by set payload.value at payload.index position
   * @param state
   * @param payload an object { index, value }
   */
  changevalueatindex(state, payload) {
    state.ipcs.pcs  = state.ipcs.pcs.map((value, i) => {
      if (i === payload.index) {
        return payload.value
      }
      return value
    })
  },


  setIRoot(state, iroot) {
    state.ipcs.setIroot(iroot);
  },

  transpose(state, t) {
    state.ipcs = state.ipcs.transpose(t);
  },

  // direction in (IPcs.NEXT_MODULATION, IPcs.PREV_MODULATION)
  modulate(state, direction) {
    state.ipcs = state.ipcs.modulate(direction)
  },

  
  /**
   * image of given array where each element is multipy by mult modulo n
   * (n is size of given array) plus - (mult-1) * iroot
   *
   * @param state
   * @param mult
   * update ipcs
   */
  mult(state, mult) {
    // console.log('NEW mutation multiplication by :' + mult);
    state.ipcs = state.ipcs.affineOp(mult, 0);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
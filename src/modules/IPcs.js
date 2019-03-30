import IPcsClass from "../models/IPcsClass";

const state = {
  ipcs : new  IPcsClass("0,4,7", 0)
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

  setIRoot(state, iroot) {
    state.ipcs.setIroot(iroot);
  },

  transpose(state, t) {
    state.ipcs = state.ipcs.transpose(t);
  },

  // direction in (IPcsClass.NEXT_MODULATION, IPcsClass.PREV_MODULATION)
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
import IPcs from "../models/IPcs";

const state = {
  ipcs : new IPcs({strPcs:"0,4,7"})
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
    let newPcs = state.ipcs.pcs.map((value, i) => {
      if (i === index) {
        return (value === 1) ? 0 : 1
      }
      return value
    })
    // assume index <> iPivot if cardinal > 1
    let newPivot =  state.ipcs.iPivot

    let newCardinal  = newPcs.filter(i => i === 1).length
    // empty pcset has not iPivot
    if (newCardinal === 0 ) {
      newPivot = undefined
    } else if (newCardinal === 1) {
      newPivot = newPcs.findIndex(pc => pc === 1)
    }
    state.ipcs = new IPcs({binPcs:newPcs, iPivot:newPivot})
  },

  /**
   * update new pcs by set payload.value at payload.index position
   * @param state
   * @param payload an object { index, value }
   */
  changevalueatindex(state, payload) {
    let newPcs = state.ipcs.pcs.map((value, i) => {
      if (i === payload.index) {
        return payload.value
      }
      return value
    })
    let newPivot =  state.ipcs.iPivot
    if (!newPcs ) {
      newPivot = undefined // empty set has not iPivot
    }
    // if (payload.value == 0 && payload.index == state.ipcs.iPivot )
    state.ipcs = new IPcs({binPcs:newPcs, iPivot:newPivot})
  },


  setiPivot(state, iPivot) {
    state.ipcs.setiPivot(iPivot);
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
   * (n is size of given array) plus - (mult-1) * iPivot
   *
   * @param state
   * @param mult
   * update ipcs
   */
  mult(state, mult) {
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
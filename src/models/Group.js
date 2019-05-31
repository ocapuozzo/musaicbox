/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicPcsOperation from "./MusaicPcsOperation";

export default class Group {
  /**
   * Generate all operations from a set of operations, implement Cayley
   * table algorithm
   *
   * @param someOperations
   *           : maybe a sub group operations generators
   * @return {Array} ordered list of operations including someOperations and 0..n more generated operations by table cayley composition.
   */
  static generator(arrayOfSomeMusaicPcsOperation) {
    let allOps = [...arrayOfSomeMusaicPcsOperation]
    for (let i = 0; i < allOps.length; i++) {
      for (let j = 0; j < allOps.length; j++) {
        let opnew = allOps[i].compose(allOps[j]);
        if (!allOps.find(op => op.getHashCode() === opnew.getHashCode())) {
          allOps.push(opnew)
        }
      }
    }
    return allOps.sort(MusaicPcsOperation.compareTo)
  }
}

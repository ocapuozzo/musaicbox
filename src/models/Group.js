/**
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicPcsOperation from "./MusaicPcsOperation";

export default class Group {

  /**
   * Generate all operations from a set of operations, implement Cayley
   * table algorithm
   *
   * @param {Array} arrayOfSomeMusaicPcsOperation
   *           : a sub group generated operations (generators of group)
   * @return {Array} ordered list of operations including someOperations and 0..n more generated operations by table cayley composition.
   */
  static buildOperationsGroupByCaylayTable(arrayOfSomeMusaicPcsOperation) {
    let allOps = [...arrayOfSomeMusaicPcsOperation]
    let loop = true
    while (loop) {
      let cardinalOp = allOps.length
      loop = false;
      forloop:
      for (let i = 0; i < cardinalOp; i++) {
         for (let j = 0; j < cardinalOp; j++) {
           let newop = allOps[i].compose(allOps[j]);
           if (!allOps.find(op => op.getHashCode() === newop.getHashCode())) {
             allOps.push(newop)
             // loop = true;
             // break forloop
             cardinalOp++
           } else {
             // console.log("-------------------------------------")
             // console.log("newop = " + newop)
             // console.log("newop.getHashCode() : " + newop.getHashCode())
           }
         }
       }
     }
    allOps.sort(MusaicPcsOperation.compareTo)
    return allOps
  }

  /**
   * http://www.idevelopment.info/data/Programming/data_structures/java/gcd/GCD.java
   *
   * @param {int} m
   * @param {int} n
   * @return {int}
   */
  static gcd(m, n) {
    if (m < n) {
      let t = m;
      m = n;
      n = t;
    }

    let r = m % n;

    if (r === 0) {
      return n;
    } else {
      return this.gcd(n, r);
    }
  }

  /**
   * Get min elements generators of phiEulerElements of n prime_root(n)
   *
   * @param {number} n  n > 0
   * @return {number[]} minimum elts necessary for generate phiEulerElements of n
   */
  static phiEulerElements(n) {
    let eltsMinGenerator = []
    eltsMinGenerator.push(1);
    for (let i = 2; i < n; i++) {
      if (this.gcd(i, n) === 1) {
        eltsMinGenerator.push(i);
      }
    }
    return eltsMinGenerator;
  }


}

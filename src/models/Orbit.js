/**
 * Copyright (c) 2019. Olivier Capuozzo
 */

import IPcs from "./IPcs";

export default class Orbit {

  constructor({stabs = [], ipcsSet = []}={}) {
    this.stabilizers = stabs;
    this.ipcsset = ipcsSet;

    if (stabs === null) {
      this.stabilizers = [];
    }
    if (ipcsSet == null) {
      this.ipcsset = []
    }
  }

  /**
   *
   * @param {IPcs} newIPcs
   */
  addIPcsIfNotPresent(newIPcs) {
    if (!this.ipcsset.find(ipcs => ipcs.id() === newIPcs.id())) {
      this.ipcsset.push(newIPcs)
    }
  }



  /**
   *
   * @param orbit1
   * @param orbit2
   * @return {number} as waiting by Array sort
   */
  static compare(orbit1, orbit2) {
    let cmp = 0;
    orbit1.stabilizers.forEach(stab1 => {
      orbit2.stabilizers.forEach(stab2 => {
        cmp = stab1.compareTo(stab2);
        if (cmp !== 0) {
          return cmp;
        }
      });
    });

    if (cmp === 0) {
      cmp = orbit1.getPcsMin().compareTo(orbit2.getPcsMin());
    }
    return cmp;
  }

  /*
     public boolean contains(Stabilizer stabilizer) {
        return stabilizers.contains(stabilizer);
     }

     public void add(Stabilizer stabilizer) {
        stabilizers.add(stabilizer);
     }
  */
  /**
   *
   * @return {IPcs} the min IPcs of ipcsset
   */
  getPcsMin() {
    if (this.ipcsset.length === 0)
      throw new Error("Orbit : get min on empty set");
    return this.ipcsset[0];
  }

  toString() {
    return "Orbit (" + this.ipcsset.length + ") stabilizers=" + this.stabilizers
      + "] min = " + this.getPcsMin().toString();
  }

  /**
   * get symmetric minimum (experimental)
   *
   * @return
   *
   public Pcs getMinSym() {
  if (minSymmetric == null) {
    List<Pcs> cyclicPcs =  Arrays.asList(getMin().getPcsCyclicTransf());
    Collections.sort(cyclicPcs, new PcsSymmetryComparator());
    minSymmetric = cyclicPcs.get(0);
  }
  return minSymmetric;
}
   */

  /**
   * Get all PCS cyclic prime form in its orbit
   *
   * @return {Array}
   */
  getPrimeForms() {
    return this.ipcsset.map((ipcs) => ipcs.cyclicPrimeForm())
  }

}

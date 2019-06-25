/**
 * Copyright (c) 2019. Olivier Capuozzo
 */

import IPcs from "./IPcs";
import Utils from "../utils/Utils";

export default class Orbit {

  constructor({stabs = [], ipcsSet = []}={}) {
    this.stabilizers = stabs
    this.ipcsset = ipcsSet
    this._hashcode = null

    if (stabs === null) {
      this.stabilizers = []
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
      this._hashcode = null
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
   * @return {IPcs} the min IPcs of elements of orbit (min elt in ipcsset)
   */
  getPcsMin() {
    if (this.ipcsset.length === 0)
      throw new Error("Orbit : get min on empty set");
    return this.ipcsset[0];
  }

  toString() {
    return "Orbit (" + this.ipcsset.length + ") stabilizers=" + this.stabilizers
      + " ipcsset : " + this.ipcsset + "  min = " + this.getPcsMin().toString();
  }

  hashCode(){
    if (!this._hashcode) {
      let res= ""
      this.stabilizers.forEach(stab => res += stab.hashCode())
      this.ipcsset.forEach(pcs => res += pcs.id())
      this._hashcode = res //Utils.stringHashCode(this.toString())
    }

    return  this._hashcode
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

  /**
   * Get stabilizers by action group on powerset Ex : [M1-T0] is maximal
   * stabilizer for pcs that have not more stabilizers (sub-group)
   * post-assert :
   *  each pcs of powerset has his maximal stabilizer Ex : pcs=100110101100
   * has [M1-T0, M5-T0, M7-T0, M11-T0] as maxstabilizer
   *
   * @return {Array} list of stabilizers
   *
   */
  /**
  computeMaxStabilizersAndFixs() {
    stabilizers = []
    this.ipcsset.forEach((pcs) => {
      Stabilizer newStab = new Stabilizer();
      for (MusaicPcsOperation op : operations) {
        if (pcs.equals(op.actionOn(pcs))) {
          newStab.addFixedPcs(pcs);
          newStab.addOperation(op);

          pcs.addOperationAsStabilizer(op);
          op.addFixedPcs(pcs);
        }
      }
      // note : stab identity is based on their operations
      if (!stabilizers.contains(newStab)) {
        stabilizers.add(newStab);
      } else {
        Stabilizer stab = stabilizers.get(stabilizers.indexOf(newStab));
        // add fixed pcs
        stab.addFixedPcs(pcs);
        Collections.sort(stab.getFix().pcsset, new PcsSymmetryComparator());
      }

    })

    }
    stabilizers.sort(new ComparatorStab());
    return stabilizers;
  }
*/

}

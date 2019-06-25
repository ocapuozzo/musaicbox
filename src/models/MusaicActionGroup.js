/**
 * Copyright (c) 2019. Olivier Capuozzo
 *
 */

import IPcs from "./IPcs";
import Orbit from "./Orbit";
import Group from "./Group";
import Stabilizer from "./Stabilizer";
import MusaicPcsOperation from "./MusaicPcsOperation";

export default class MusaicActionGroup {

  constructor({n = -1, someMusaicOperations = []}) {
    this.n = n;
    this.operations = Group.buildOperationsGroupByCaylayTable(someMusaicOperations);
    // min operation = neutral operation = operations.get(0)
    this.powerset = MusaicActionGroup.buildPowerSetOfIPcs(this.n);
    this.orbits = this.makeOrbitsByActionOnPowerset();
    // this.orbitRepresentativesPcs = this.computeOrbitRepresentatives();
   // this.stabilizers = this.computeMaxStabilizersAndFixs();
    // computeStabilizersIntoOrbit();
  }

  get stabilizers()  {
    if (!this._stabilizers) {
      this._stabilizers = this.computeMaxStabilizersAndFixs();
    }
    return this._stabilizers
  }

  /**
   *
   * @return {Array} of IPcs in PF
   */
  computeOrbitRepresentatives() {
    let orbitRepr = [];
    this.orbits.forEach(orbit =>  {
      orbitRepr.push(orbit.getPcsMin());
    });
    return orbitRepr;
  }

  /**
   *
   * generic algorithm to compute all subsets (IPcs) of Z/nZ
   *
   * @param {int} n
   *
   * @return {Map} of IPcs
   */
  static buildPowerSetOfIPcs(n) {
    let cardinal = Math.pow(2, n);
    let powerset = new Map()
    let ipcs;
    for (let i = 0; i < cardinal; i++) {
      ipcs = new IPcs({pidVal: i, n: n});
      powerset.set(ipcs.id(), ipcs)
    }
    // get ordered
   // powerset = new Map([...powerset.entries()].sort());
    return powerset; //.sort(IPcs.compare);
  }

  /**
   * pre-assert : powerset sorted
   *
   * @return {Array} of Orbit of powerset by action of group operations on them
   *         (partition)
   *
   */
  makeOrbitsByActionOnPowerset() {
    let orbits = [];
    let tmpPowerset = new Map(this.powerset)
    // for info : convert array to Map
    //  myarray.map(pcs => [pcs.id(), pcs]));
    let self = this
    this.powerset.forEach((pcs) => {
      if (tmpPowerset.has(pcs.id())) {
        pcs.addInOrbit(pcs); // add himself in orbit, if not into
        tmpPowerset.delete(pcs.id());
        self.operations.forEach((op) => {
          // an image of pcs (by action on) is always into powerset
          let pcs_other = this.powerset.get(op.actionOn(pcs).id());
          pcs.addInOrbit(pcs_other);
          //pcs_other.addInOrbit(pcs);
          tmpPowerset.delete(pcs_other.id());// orbit of other is now known
          pcs_other.orbit = pcs.orbit; // orbit is shared by all pcs in same orbit
        }) // end foreach operation
        pcs.orbit.ipcsset.sort(IPcs.compare)
        orbits.push(pcs.orbit);
      }
    }) // end foreach ipcs in powerset
    return orbits.sort(Orbit.compare);
  }

  /**
   * Get stabilizers by action group on powerset Ex : [M1-T0] is maximal
   * stabilizer for pcs that have not more stabilizers (sub-group) post-assert
   * : each pcs of powerset has his maximal stabilizer Ex : pcs=100110101100
   * has [M1-T0, M5-T0, M7-T0, M11-T0] as maxstabilizer
   *
   * @return {Array} list of stabilizers
   *
   */
  _computeMaxStabilizersAndFixs() {
    let stabilizers = new Map()
    this.powerset.forEach(pcs => {
      let newStab = new Stabilizer();
      this.operations.forEach(op => {
        if (pcs.equalsPcs(op.actionOn(pcs))) {
          newStab.addFixedPcs(pcs);
          newStab.addOperation(op);
         // pcs.addOperationAsStabilizer(op);
          op.addFixedPcs(pcs);
        }
      })
      // note : stab identity is based on their operations
      let findStab = stabilizers.get(newStab.hashCode())
      if (!findStab) {
        stabilizers.set(newStab.hashCode(), newStab)
      } else {
        // add fixed pcs
        findStab.addFixedPcs(pcs)
      }
    })
    // now sort operations then stabilizers
    stabilizers.forEach((stab, hashcode, map)=> stab.operations.sort(MusaicPcsOperation.compareTo))
    let resStabs = Array.from(stabilizers.values())
    return resStabs.sort(Stabilizer.compare)
   }

 computeMaxStabilizersAndFixs() {
    let stabilizers = []
    this.powerset.forEach(pcs => {
      let newStab = new Stabilizer();
      this.operations.forEach(op => {
        if (pcs.equalsPcs(op.actionOn(pcs))) {
          newStab.addFixedPcs(pcs);
          newStab.addOperation(op);
          // pcs.addOperationAsStabilizer(op);
          op.addFixedPcs(pcs);
        }
      })
      // note : stab identity is based on their operations
      let findStab = stabilizers.find(stab => stab.hashCode() === newStab.hashCode())
      if (!findStab) {
        stabilizers.push(newStab)
      } else {
        // add fixed pcs
        findStab.addFixedPcs(pcs)
      }
    })
    // now sort operations then stabilizers
    //stabilizers.forEach(stab => stab.operations.sort(MusaicPcsOperation.compareTo))
    stabilizers.sort(Stabilizer.compare)
    return stabilizers
  }


}


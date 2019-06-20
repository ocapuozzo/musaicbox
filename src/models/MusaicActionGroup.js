/**
 * Copyright (c) 2019. Olivier Capuozzo
 *
 */

import IPcs from "./IPcs";
import Orbit from "./Orbit";
import Group from "./Group";


export default class MusaicActionGroup {

  constructor({n = -1, someMusaicOperations = []}) {
    this.n = n;
    this.operations = Group.buildOperationsGroupByCaylayTable(someMusaicOperations);
    // min operation = neutral operation = operations.get(0)
    this.powerset = MusaicActionGroup.buildPowerSetOfIPcs(this.n);
    this.orbits = this.makeOrbitsByActionOnPowerset();
    // orbitRepresentativesPcs = computeOrbitRepresentatives();
    //stabilizers = computeMaxStabilizersAndFixs();
    // computeStabilizersIntoOrbit();
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
      ipcs = new IPcs({idVal: i, n: n});
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

    this.powerset.forEach((pcs) => {
      if (tmpPowerset.has(pcs.id())) {
        pcs.addInOrbit(pcs); // add himself in orbit, if not into
        tmpPowerset.delete(pcs.id());
        this.operations.forEach((op) => {
          // an image of pcs (by action on) is always into powerset
          let pcs_other = this.powerset.get(op.actionOn(pcs).id());
          pcs.addInOrbit(pcs_other);
          tmpPowerset.delete(pcs_other.id());// orbit of other is now known
          pcs_other.orbit = pcs.orbit; // orbit is shared by all pcs in same orbit
        }) // end foreach operation
        orbits.push(pcs.orbit);
      }
    }) // end foreach ipcs in powerset
    return orbits.sort(Orbit.compare);
  }

}


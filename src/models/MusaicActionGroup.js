/**
 * Copyright (c) 2019. Olivier Capuozzo
 *
 */

import IPcs from "./IPcs";
import Orbit from "./Orbit";
import Group from "./Group";
import Stabilizer from "./Stabilizer";
import MusaicPcsOperation from "./MusaicPcsOperation";
import MotifStabilizer from "./MotifStabilizer";
import Utils from "../utils/Utils";

export default class MusaicActionGroup {

  constructor({n = -1, someMusaicOperations = []}) {
    this.n = n;
    this.operations = Group.buildOperationsGroupByCaylayTable(someMusaicOperations);
    // min operation = neutral operation = operations.get(0)
    this.powerset = MusaicActionGroup.buildPowerSetOfIPcs(this.n);
    this.orbits = this.buildOrbitsByActionOnPowerset();
    this.buildOrbitMotifStabilizers()

    this._orbitsSortedByStabilizers = null
    this._orbitsSortedByMotifStabilizers = null
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
    return powerset;
  }

  /**
   * pre-assert : powerset sorted
   *
   * @return {Array} of Orbit of powerset by action of group operations on them
   *         (partition)
   *
   */
  buildOrbitsByActionOnPowerset() {
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
   * build stabilizers orbit for all orbits
   */
  buildOrbitMotifStabilizers() {
    this.orbits.forEach(orbit => {
      orbit.ipcsset.forEach(pcs => {
        let newStab = new Stabilizer();
        this.operations.forEach(op => {
          if (pcs.equalsPcs(op.actionOn(pcs))) {
            newStab.addFixedPcs(pcs);
            newStab.addOperation(op);
            // pcs.addOperationAsStabilizer(op);
            op.addFixedPcs(pcs);
          }
        }) // for each op
        // note : stab identity is based on their operations (no change when add fixedPcs)
        let findStab = orbit.stabilizers.find(stab => stab.hashCode() === newStab.hashCode())
        if (!findStab) {
          orbit.stabilizers.push(newStab)
        } else {
          findStab.addFixedPcs(pcs)
        }
      })
      // ordered operations and fixedPcs in orbit
      orbit.stabilizers.forEach(stab => {
        stab.operations.sort(MusaicPcsOperation.compare)
        stab.fixedPcs.sort(IPcs.compare)
      })
      // order stabilizes of orbit
      orbit.stabilizers.sort(Stabilizer.compareShortName)

      // build motif stabilizer of orbit  (orbit.motifStabilizer)
      orbit.checkAndBuildMotifStabilizerOfOrbit()
    }) // end loop orbits
  }

  get orbitsSortedByMotifStabilizers() {
    if (!this._orbitsSortedByMotifStabilizers)
      this._orbitsSortedByMotifStabilizers = this.computeOrbitSortedByMotifStabilizers()

    return this._orbitsSortedByMotifStabilizers
  }

  get orbitsSortedByStabilizers() {
    if (!this._orbitsSortedByStabilizers)
      this._orbitsSortedByStabilizers = this.computeOrbitSortedByStabilizers()

    return this._orbitsSortedByStabilizers
  }

  /**
   * @return {Array} of objects {stabilizerName : {String}, orbits : {Array} of orbits
   *
   * Example :
   */
  computeOrbitSortedByStabilizers() {
    let orbitsSortedByStabilizers = new Map() // k=name orbit based on his stabs, v=array of orbits
    this.orbits.forEach(orbit => {
      orbit.stabilizers.forEach(stab => {
        let nameStab = stab.getShortName()
        if (!orbitsSortedByStabilizers.has(nameStab))
          orbitsSortedByStabilizers.set(nameStab, [])
        // make an subOrbit based on stabilizer : subOrbits partitioning orbit
        let subOrbit = new Orbit({stabs:[stab], ipcsSet:stab.fixedPcs})
        orbitsSortedByStabilizers.get(nameStab).push(subOrbit)
      })
    })

    // sort map on keys (lexical order)
    let resultOrbitsSortedByStabilizers = []
    Array.from(orbitsSortedByStabilizers.keys()).sort().forEach((name) => {
      resultOrbitsSortedByStabilizers.push(
        {
          stabilizerName : name,
          hashcode : Utils.stringHashCode(name) + Date.now(),
          orbits : orbitsSortedByStabilizers.get(name).sort(Orbit.compare)
        })
    })

    return resultOrbitsSortedByStabilizers
  }


  /**
   * @return {Array} of objects {stabilizerName : {String}, orbits : {Array} of orbits
   *
   */
  computeOrbitSortedByMotifStabilizers() {
    let orbitsSortedByMotifStabilizer = new Map() // k=name orbit based on his stabs, v=array of orbits
    this.orbits.forEach(orbit => {
      let kmotifstab = Array.from(orbitsSortedByMotifStabilizer.keys()).find(ms => ms.hashCode() === orbit.motifStabilizer.hashCode())
      // orbit name based on his stabilizers and shortName
      if (!kmotifstab)
        orbitsSortedByMotifStabilizer.set(orbit.motifStabilizer, [orbit])
      else
        orbitsSortedByMotifStabilizer.get(kmotifstab).push(orbit)
    })
    // sort operations
    let resultOrbitsSortedByMotifStabilizer = []
    Array.from(orbitsSortedByMotifStabilizer.keys()).sort(MotifStabilizer.compare).forEach(motifStab => {
      resultOrbitsSortedByMotifStabilizer.push(
        {
          stabilizerName: motifStab.name,
          hashcode : motifStab.name.length + Date.now(),
          orbits : orbitsSortedByMotifStabilizer.get(motifStab).sort(Orbit.compare)
        })
    })
    return resultOrbitsSortedByMotifStabilizer
  }
}


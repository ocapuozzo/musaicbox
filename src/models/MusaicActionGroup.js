/*
 * Copyright (c) 2019. Olivier Capuozzo
 *  This file is part of the musaicbox project
 *
 *  (c) Olivier Capuozzo <olivier.capuozzo@gmail.com>
 *
 *  For the full copyright and license information, please view the README.md file of this project.
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
    this.group = new Group(someMusaicOperations);
    this.operations = this.group.operations;
    // min operation = neutral operation = operations.get(0)
    this.powerset = MusaicActionGroup.buildPowerSetOfIPcs(this.n);
    this.orbits = this.buildOrbitsByActionOnPowerset();
    this.buildOrbitMotifStabilizers()

    this._orbitsSortedByStabilizers = null
    this._orbitsSortedByMotifStabilizers = null
    this._orbitsSortedByCardinal = null
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
      powerset.set(ipcs.id, ipcs)
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
    while (tmpPowerset.size > 0) {
      let pcs = tmpPowerset.values().next().value
      pcs.addInOrbit(pcs); // add himself in orbit
      tmpPowerset.delete(pcs.id);
      for (let i = 0; i < this.operations.length; i++) {
        let op = this.operations[i]
        let pcs_other = this.powerset.get(op.actionOn(pcs).id);
        if (tmpPowerset.has(pcs_other.id)) {
          // new image pcs by op
          pcs.addInOrbit(pcs_other)
          pcs_other.orbit = pcs.orbit // share same orbit
          tmpPowerset.delete(pcs_other.id)
        }
      }
      pcs.orbit.ipcsset.sort(IPcs.compare)
      orbits.push(pcs.orbit);
    }
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

  get orbitsSortedByCardinal() {
    if (!this._orbitsSortedByCardinal)
      this._orbitsSortedByCardinal = this.computeOrbitSortedByCardinal()

    return this._orbitsSortedByCardinal
  }

  /**
   * @return {Array} of objects {stabilizerName : {String}, hashcode : {Integer}, orbits : {Array} of orbits
   */
  computeOrbitSortedByStabilizers() {
    let orbitsSortedByStabilizers = new Map() // k=name orbit based on his stabs, v=array of orbits
    this.orbits.forEach(orbit => {
      orbit.stabilizers.forEach(stab => {
        let nameStab = stab.getShortName()
        if (!orbitsSortedByStabilizers.has(nameStab))
          orbitsSortedByStabilizers.set(nameStab, [])
        // make an subOrbit based on stabilizer : subOrbits partitioning orbit
        let subOrbit = new Orbit({stabs: [stab], ipcsSet: stab.fixedPcs})
        orbitsSortedByStabilizers.get(nameStab).push(subOrbit)
      })
    })

    // sort map on keys (lexical order)
    // make an "view adapter" for v-for
    let resultOrbitsSortedByStabilizers = []
    Array.from(orbitsSortedByStabilizers.keys()).sort().forEach((name) => {
      resultOrbitsSortedByStabilizers.push(
        {
          groupingCriterion: name,
          // to avoid duplicate keys in vue
          hashcode: Utils.stringHashCode(name) + Date.now(),
          orbits: orbitsSortedByStabilizers.get(name)
        })
    })

    return resultOrbitsSortedByStabilizers
  }

  /**
   * @return {Array} of objects {stabilizerName : {String}, hashcode : {Integer}, orbits : {Array} of orbits
   */
  computeOrbitSortedByMotifStabilizers() {
    let orbitsSortedByMotifStabilizer = new Map() // k=name orbit based on his stabs, v=array of orbits
    this.orbits.forEach(orbit => {
      let kNameMotifStab = Array.from(orbitsSortedByMotifStabilizer.keys())
           .find(ms => ms.hashCode() === orbit.motifStabilizer.hashCode())
      // orbit name based on his stabilizers and shortName
      if (!kNameMotifStab) {
        orbitsSortedByMotifStabilizer.set(orbit.motifStabilizer, [orbit])
      } else {
        orbitsSortedByMotifStabilizer.get(kNameMotifStab).push(orbit)
      }
    })
    // sort operations
    // make an "view adapter" for v-for 
    let resultOrbitsSortedByMotifStabilizer = []
    Array.from(orbitsSortedByMotifStabilizer.keys()).sort(MotifStabilizer.compare).forEach(motifStab => {
      resultOrbitsSortedByMotifStabilizer.push(
        {
          groupingCriterion: motifStab.name,
          // to avoid duplicate keys in vue
          hashcode: Utils.stringHashCode(motifStab.name) + Date.now(),
          orbits: orbitsSortedByMotifStabilizer.get(motifStab).sort(Orbit.comparePcsMin)
        })
    })
    return resultOrbitsSortedByMotifStabilizer
  }


  /**
   * @return {Array} of objects {stabilizerName : {String}, hashcode : {Integer}, orbits : {Array} of orbits
   */
  computeOrbitSortedByCardinal() {
    let orbitsSortedByCardinal = new Map() // k=name orbit based on his stabs, v=array of orbits
    this.orbits.forEach(orbit => {
      let card = Array.from(orbitsSortedByCardinal.keys()).find(card => card === orbit.getPcsMin().cardinal())
      // orbit name based on his stabilizers and shortName
      if (!card)
        orbitsSortedByCardinal.set(orbit.getPcsMin().cardinal(), [orbit])
      else
        orbitsSortedByCardinal.get(card).push(orbit)
    })
    // sort operations
    // make an "view adapter" for v-for
    let resultOrbitsSortedByCardinal = []
    // default, sort cast key to string...
    Array.from(orbitsSortedByCardinal.keys()).sort((a, b) => (Number(a) - Number(b))).forEach(card => {
      resultOrbitsSortedByCardinal.push(
        {
          groupingCriterion: "card : " + this.group.isComplemented() ? card + "/" + (this.n - card) : card + "",
          // to avoid duplicate keys in vue
          hashcode: card + Date.now(),
          orbits: orbitsSortedByCardinal.get(card).sort(Orbit.comparePcsMin)
        })
    })
    return resultOrbitsSortedByCardinal
  }


  cardinalOfOrbitStabilized() {
    return this.orbitsSortedByStabilizers.reduce((sum, sortedOrbit) => sum + sortedOrbit.orbits.length, 0)
  }

}


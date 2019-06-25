/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicActionGroup from "@/models/MusaicActionGroup"
import IPcs from "@/models/IPcs";
import MusaicPcsOperation from "@/models/MusaicPcsOperation";


test("All subsets of n = 5 ", () => {
  let powerset5 = MusaicActionGroup.buildPowerSetOfIPcs(5);
  // let musaicGroup5 = Array.from(MusaicActionGroup.buildPowerSetOfIPcs(5).keys()).sort();
  expect(powerset5.size).toEqual(Math.pow(2, 5))
  // let minPcs = new IPcs({strPcs:"", n:5})
  // let maxPcs = new IPcs({strPcs:"0,1,2,3,4", n:5})
  // expect(minPcs).toEqual(powerset5[0])
  // //musaicGroup5.forEach(pcs => console.log(pcs))
  // expect(maxPcs).toEqual(powerset5[powerset5.length-1])
});

test("Powerset n = 12", () => {
  let musaicGroup12 = MusaicActionGroup.buildPowerSetOfIPcs(12);
  expect(musaicGroup12.size).toEqual(Math.pow(2, 12))
});

test("Action group trivial n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral]});
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(Math.pow(2, 12))
});

test("Action group cyclic n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opM1T1 = new MusaicPcsOperation(12, 1, 1);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opM1T1]});
  expect(musaicGroup12.operations.length).toEqual(12)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(352)
 // console.log("cyclic operations : " + musaicGroup12.operations)
 // console.log("cyclic stabilizers : " + musaicGroup12.stabilizers)
  expect(musaicGroup12.stabilizers.length).toEqual(6)
  let nbPcs = 0
  let nbEATL = 0
  musaicGroup12.stabilizers.forEach((stab => {
    nbPcs += stab.fixedPcs.length
    // skip trivial stab
    if (stab.operations.length > 1) {
      let primeFormes = new Map()
      stab.fixedPcs.forEach(pcs => {
        primeFormes.set(pcs.cyclicPrimeForm().id(), pcs.cyclicPrimeForm())
      })
      nbEATL += primeFormes.size
    }
  }))
  // 2^12 = 4096
  expect(nbPcs).toEqual(4096)
  // 17 LTs is-motifs
  expect(nbEATL).toEqual(17)
});

test("Action group dihedral n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opM1T1 = new MusaicPcsOperation(12, 1, 1);
  let opM11 = new MusaicPcsOperation(12, 11, 0);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opM1T1, opM11]});
  expect(musaicGroup12.operations.length).toEqual(24)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(224)
});

test("Action group affine n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opT1 = new MusaicPcsOperation(12, 1, 1);
  let opM5 = new MusaicPcsOperation(12, 5, 0);
  let opM7 = new MusaicPcsOperation(12, 7, 0);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opT1, opM5, opM7]});
  expect(musaicGroup12.operations.length).toEqual(48)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(158)
});

test("Action group musaic n = 5 ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(5, 1, 0);
  let opCM1 = new MusaicPcsOperation(5, 1, 1, true);

  let musaicGroup5 = new MusaicActionGroup({n:5, someMusaicOperations:[opNeutral , opCM1]});

  expect(musaicGroup5.powerset.size).toEqual(Math.pow(2, 5))
  expect(musaicGroup5.orbits.length).toEqual(4)

});


test("Action group musaic n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, true);
  let opCM1T1 = new MusaicPcsOperation(12, 1, 1, true);
  let opM5 = new MusaicPcsOperation(12, 5, 0, false);
  let opM7 = new MusaicPcsOperation(12, 7, 0, false);

  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opCM1T1, opM5, opM7, opCM1]});

  expect(musaicGroup12.operations.length).toEqual(96)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(88)
  let lastPF = new IPcs({pidVal: 1365, n:12 }) // whole tone scale
  // test equality of PCS
  expect(musaicGroup12.orbits[musaicGroup12.orbits.length-1].getPcsMin().equalsPcs(lastPF)).toBeTruthy()
  // whole tone scale : 2 in orbit
  expect(musaicGroup12.orbits[musaicGroup12.orbits.length-1].ipcsset.length).toEqual(2)
});

test("Stabilizers of group musaic n = 12 ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(12, 1, 0, !complemented);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, complemented);
  let opCT1 = new MusaicPcsOperation(12, 1, 1, complemented);
  let opM5 = new MusaicPcsOperation(12, 5, 1, !complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 1, !complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opCM1, opCT1, opM5, opM7]});
  expect(musaicGroup12.operations.length).toEqual(96)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(88)
  let  nbPcs = 0
  let primeFormes = new Map()
  musaicGroup12.stabilizers.forEach((stab => {
    nbPcs += stab.fixedPcs.length
    // console.log("Stab : " + stab + " #fixeds : " + stab.fixedPcs.length)
    stab.fixedPcs.forEach(pcs => {
      primeFormes.set(pcs.musaicPrimeForm().id(), pcs.musaicPrimeForm())
    })
  }))
  let nbPF = primeFormes.size
  expect(nbPcs).toEqual(4096)
  expect(musaicGroup12.stabilizers.length).toEqual(111)
  // musaicGroup12.stabilizers.forEach(stab  => {
  //   console.log("stab.operations : " + stab.operations)
  // })
  expect(nbPF).toEqual(88)
  expect(nbPF).toEqual(musaicGroup12.orbits.length)

  let isMotifSabilizers = new Map()
  musaicGroup12.stabilizers.forEach(stab => {
    isMotifSabilizers.set(stab.motifStabilizer.hashCode(),stab.motifStabilizer)
  })
  expect(isMotifSabilizers.size).toEqual(13)
});

/**
 * If group has a complemented operation then this group must have CM1-T1 op
 * because ipcs complemented lost his iPivot... So equivalence relation must include
 * "to a near transposition"
 */
test("No good group with complemented op (n = 12)= ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(12, 1, 0, !complemented);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, complemented);
  let opM5 = new MusaicPcsOperation(12, 5, 0, complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 0, !complemented);

  let group = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opCM1, opM5, opM7]});

  // console.log("orbits.length : " + group.orbits.length)
  // console.log("group.powerset.size : " + group.powerset.size)
  // console.log("orbit min [2] : " + group.orbits[2])
  // console.log("orbit min [3] : " + group.orbits[3])

  expect(group.operations.length).toEqual(8)

  // Ho!!!
  expect(group.orbits[2].getPcsMin().equalsPcs(group.orbits[3].getPcsMin())).toBeTruthy()

  })


/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicActionGroup from "@/models/MusaicActionGroup"
import IPcs from "@/models/IPcs";
import MusaicPcsOperation from "@/models/MusaicPcsOperation";

test("All subsets of n = 5 ", () => {
  let powerset5 = Array.from(MusaicActionGroup.buildPowerSetOfIPcs(5).values());
  expect(powerset5.length).toEqual(Math.pow(2, 5))
  let minPcs = new IPcs({strPcs:"", n:5})
  let maxPcs = new IPcs({strPcs:"0,1,2,3,4", n:5})
  expect(minPcs.equalsPcs(powerset5[0])).toBeTruthy()
  expect(maxPcs.equalsPcs(powerset5[31])).toBeTruthy()

});

test("Powerset n = 12", () => {
  let musaicGroup12 = MusaicActionGroup.buildPowerSetOfIPcs(12);
  expect(musaicGroup12.size).toEqual(Math.pow(2, 12))
});

test("Action group trivial n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let musaicGroup12 = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral]});
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(Math.pow(2, 12))
});

test("Action group cyclic n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opM1T1 = new MusaicPcsOperation(12, 1, 1);
  let cyclicGroup12 = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opM1T1]});

  expect(cyclicGroup12.operations.length).toEqual(12)
  expect(cyclicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(cyclicGroup12.orbits.length).toEqual(352)
  // console.log("cyclic operations : " + musaicGroup12.operations)
  // console.log("cyclic stabilizers : " + musaicGroup12.stabilizers)
  let nbPcs = 0
  let nbEATL = 0
  let orbitByStabShortName = new Set()
  cyclicGroup12.orbits.forEach(
    orbit => {
      orbitByStabShortName.add(orbit.name)
      orbit.stabilizers.forEach((stab => {
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
    })

  // 2^12 = 4096
  expect(nbPcs).toEqual(4096)
  // 17 LTs is-motifs
  expect(nbEATL).toEqual(17)

  // 5 classes of limited transposition plus identity stab (M1-T0]), so 6 waiting
  // expected 6 stabilizer names (2/1 , 54/6 , 12/4 , 6/3 , 2/2 and 4020/12)
  // (sorted by name) M1-T0 M1-T0~1* M1-T0~2* M1-T0~3* M1-T0~4* M1-T0~6*
  expect(orbitByStabShortName.size).toEqual(6)
  // Array.from(orbitByStabShortName).sort().forEach(name => console.log(name))

  // now build by MusaicActionGroup instance (by call buildOrbitsSortedByStabilizers() via getter)
  expect(cyclicGroup12.orbitsSortedByStabilizers.length).toEqual(6)

});

test("Action group dihedral n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);

  let opM1T1 = new MusaicPcsOperation(12, 1, 1);
  let opM11 = new MusaicPcsOperation(12, 11, 0);
  let musaicGroup12 = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opM1T1, opM11]});
  expect(musaicGroup12.operations.length).toEqual(24)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(224)
});

test("Action group affine n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opT1 = new MusaicPcsOperation(12, 1, 1);
  let opM5 = new MusaicPcsOperation(12, 5, 0);
  let opM7 = new MusaicPcsOperation(12, 7, 0);
  let musaicGroup12 = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opT1, opM5, opM7]});
  expect(musaicGroup12.operations.length).toEqual(48)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(158)
});

test("Action group musaic n = 5 ", () => {
  let opNeutral = new MusaicPcsOperation(5, 1, 0);
  let opCM1 = new MusaicPcsOperation(5, 1, 1, true);

  let musaicGroup5 = new MusaicActionGroup({n: 5, someMusaicOperations: [opNeutral, opCM1]});

  expect(musaicGroup5.powerset.size).toEqual(Math.pow(2, 5))
  expect(musaicGroup5.orbits.length).toEqual(4)

});


test("Action group musaic n = 12 ", () => {
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, true);
  let opCM1T1 = new MusaicPcsOperation(12, 1, 1, true);
  let opM5 = new MusaicPcsOperation(12, 5, 0, false);
  let opM7 = new MusaicPcsOperation(12, 7, 0, false);

  let musaicGroup12 = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opCM1T1, opM5, opM7, opCM1]});

  expect(musaicGroup12.operations.length).toEqual(96)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(88)
  let lastPF = new IPcs({pidVal: 1365, n: 12}) // whole tone scale
  // test equality of PCS
  expect(musaicGroup12.orbits[musaicGroup12.orbits.length - 1].getPcsMin().equalsPcs(lastPF)).toBeTruthy()
  // whole tone scale : 2 in orbit
  expect(musaicGroup12.orbits[musaicGroup12.orbits.length - 1].ipcsset.length).toEqual(2)

  expect(musaicGroup12.orbitsSortedByStabilizers.length).toEqual(111)

  // TODO 326 must be verified
  expect(musaicGroup12.cardinalOfOrbitStabilized()).toEqual(326)

});


/**
 * If group has a complemented operation then this group must have CM1-T1 op
 * because ipcs complemented lost his iPivot... So equivalence relation must include
 * "to a near transposition"
 */
test("group with complemented op and no T (n = 12)= ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, complemented);
  let opM5 = new MusaicPcsOperation(12, 5, 0, complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 0, !complemented);
  try {
    let group = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, /*opCM1T1, opM1, */ opCM1, opM5, opM7]});
   // expect(group.orbits.length).toEqual(919)
  } catch (e) {
    fail(e)
  }
})

test("Test M5 M7 group (n = 12) ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(12, 1, 0);
  let opM5 = new MusaicPcsOperation(12, 5, 0, !complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 0, !complemented);

  try {
    let group = new MusaicActionGroup({n: 12, someMusaicOperations: [opNeutral, opM5, opM7]});
    // console.log("orbits.length : " + group.orbits.length)
    // console.log("group.operations : " + group.operations)
    // console.log("group.orbitsSortedByMotifStabilizers : ")
    // group.orbitsSortedByMotifStabilizers.forEach(motif => console.log(motif))
  } catch (e) {
    fail(e)
  }
})

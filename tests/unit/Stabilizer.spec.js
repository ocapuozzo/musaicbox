/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicPcsOperation from "@/models/MusaicPcsOperation";
import IPcs from "@/models/IPcs";
import Group from "@/models/Group";
import Stabilizer from "../../src/models/Stabilizer";
import MusaicActionGroup from "../../src/models/MusaicActionGroup";
import MotifStabilizer from "../../src/models/MotifStabilizer";

test("Stabilizer addOperation", () => {
  let opM5T0 = new MusaicPcsOperation(12, 5, 0, false);
  let opM5T4 = new MusaicPcsOperation(12, 5, 4, false);
  let opM7T0 = new MusaicPcsOperation(12, 7, 0, false);
  let opM11T2 = new MusaicPcsOperation(12, 11, 2, false);
  let opCM5T0 = new MusaicPcsOperation(12, 5, 0, true);
  let stab1 = new Stabilizer()
  stab1.addOperation(opM5T0)
  stab1.addOperation(opM7T0)
  expect(stab1.operations.length).toEqual(2);

  stab1.addOperation(opM5T4)
  expect(stab1.operations.length).toEqual(3);
  expect(stab1.operations[1]).toEqual(opM5T4)

  stab1.addOperation(opM11T2)
  expect(stab1.operations.length).toEqual(4);
  expect(stab1.operations[1]).toEqual(opM5T4)
  expect(stab1.operations[3]).toEqual(opM11T2)

  stab1.addOperation(opCM5T0)
  expect(stab1.operations.length).toEqual(5);
  expect(stab1.operations[1]).toEqual(opM5T4)
  expect(stab1.operations[3]).toEqual(opM11T2)
  expect(stab1.operations[4]).toEqual(opCM5T0)

  // console.log("stab1 :" + stab1)
})

test("Stabilizer compare", () => {
  let opM5T0 = new MusaicPcsOperation(12, 5, 0, false);
  let opM5T4 = new MusaicPcsOperation(12, 5, 4, false);
  let opM7T0 = new MusaicPcsOperation(12, 7, 0, false);
  let opM11T2 = new MusaicPcsOperation(12, 11, 2, false);
  let opCM5T0 = new MusaicPcsOperation(12, 5, 0, true);
  let stab1 = new Stabilizer()
  let stab2 = new Stabilizer()
  let stab3 = new Stabilizer()
  stab1.addOperation(opM5T0)
  stab1.addOperation(opM7T0)
  stab1.addOperation(opM5T4)
  stab2.addOperation(opM5T0)
  stab2.addOperation(opCM5T0)
  stab2.addOperation(opM11T2)
  stab3.addOperation(opM5T4)

  let stabs = [stab1, stab3, stab2]
  /*
  M5-T0,M5-T4,M7-T0
  M5-T4
  M5-T0,M11-T2,CM5-T0
  */
  stabs.sort(Stabilizer.compare)
  /*
  M5-T0,M5-T4,M7-T0
  M5-T0,M11-T2,CM5-T0
  M5-T4
 */
  // stabs.forEach(stab => {
  //   console.log("stab :" + stab.operations)
  // })

  expect(stabs[0].equals(stab1)).toBeTruthy();
  expect(stabs[1].equals(stab2)).toBeTruthy();
})

test("Stabilizer reduceNameByIgnoreTransp", () => {
  let opM5T0 = new MusaicPcsOperation(12, 5, 0, false);
  let opM5T4 = new MusaicPcsOperation(12, 5, 4, false);
  let opM7T0 = new MusaicPcsOperation(12, 7, 0, false);
  let opM11T2 = new MusaicPcsOperation(12, 11, 2, false);
  let opCM5T0 = new MusaicPcsOperation(12, 5, 0, true);
  let stab = new Stabilizer()
  stab.addOperation(opM5T0)
  stab.addOperation(opM7T0)
  stab.addOperation(opM5T4)
  stab.addOperation(opCM5T0)
  stab.addOperation(opM11T2)

  expect(stab.reduceNameByIgnoreTransp()).toEqual("M5,M7,M11,CM5");
})

test("Cyclic Group Explore", () => {
  let opId = new MusaicPcsOperation(12, 1, 0);
  let opM1T1 = new MusaicPcsOperation(12, 1, 1);

  let cyclicGroup = new MusaicActionGroup({n: 12, someMusaicOperations: [opId, opM1T1]});

  // number of orbits
  expect(cyclicGroup.orbits.length).toEqual(352);

  let sumPcs = 0;
  cyclicGroup.orbits.forEach(orbit => sumPcs += orbit.ipcsset.length)
  expect(sumPcs).toEqual(4096)

  let setStabilizers = new Set()
  // each orbit has stabilisers
  cyclicGroup.orbits.forEach(orbit => {
    orbit.stabilizers.forEach(stab => {
      setStabilizers.add(stab.hashCode())
    })
  })
  // 5 classes of limited transposition plus identity stab (M1-T0]), so 6 waiting
  // expected 6 stabilizers (2/1 , 54/6 , 12/4 , 6/3 , 2/2 and 4020/12)
  expect(setStabilizers.size).toEqual(6) // = 6
})

test("Musaic Group Explore", () => {
  let opM1 = new MusaicPcsOperation(12, 1, 0, false);
  let opCM1 = new MusaicPcsOperation(12, 1, 0, true);
  let opM1T1 = new MusaicPcsOperation(12, 1, 1, false);
  let opM5T1 = new MusaicPcsOperation(12, 5, 1, false);
  let opM7T1 = new MusaicPcsOperation(12, 7, 1, false);

  let musaicGroup = new MusaicActionGroup({n: 12, someMusaicOperations: [/*opId,*/ opM1, opCM1, opM1T1, opM5T1, opM7T1]});

  expect(musaicGroup.operations.length).toEqual(96);
  // number of orbits
  expect(musaicGroup.orbits.length).toEqual(88);

  let sumPcs = 0;
  musaicGroup.orbits.forEach(orbit => sumPcs += orbit.ipcsset.length)
  expect(sumPcs).toEqual(4096)

  let setStabilizers = new Set()
  // each orbit has stabilisers
  musaicGroup.orbits.forEach(orbit => {
    orbit.stabilizers.forEach(stab => setStabilizers.add(stab.hashCode()))
  })
  expect(setStabilizers.size).toEqual(111)

  expect(musaicGroup.orbitsSortedByMotifStabilizers.length).toEqual(13)

  expect(musaicGroup.orbitsSortedByStabilizers.length).toEqual(111)

//  musaicGroup.orbitsSortedByMotifStabilizers.forEach(motifSatb => console.log(motifSatb.toString()))
})

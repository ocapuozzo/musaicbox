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
  //
  // let minPcs = new IPcs({strPcs:"", n:12})
  // let maxPcs = new IPcs({strPcs:"0,1,2,3,4,5,6,7,8,9,10,11", n:12})
  // expect(minPcs).toEqual(musaicGroup12[0])
  // //musaicGroup5.forEach(pcs => console.log(pcs))
  // expect(maxPcs).toEqual(musaicGroup12[musaicGroup12.length-1])
});

test("Action group trivial n = 12 ", () => {
  let complemented = false
  let opNeutral = new MusaicPcsOperation(12, 1, 0, complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral]});
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(Math.pow(2, 12))
});

test("Action group cyclic n = 12 ", () => {
  let complemented = false
  let opNeutral = new MusaicPcsOperation(12, 1, 0, complemented);
  let opT1 = new MusaicPcsOperation(12, 1, 1, complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opT1]});
  expect(musaicGroup12.operations.length).toEqual(12)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(352)
});


test("Action group dihedral n = 12 ", () => {
  let complemented = false
  let opNeutral = new MusaicPcsOperation(12, 1, 0, complemented);
  let opT1 = new MusaicPcsOperation(12, 1, 1, complemented);
  let opM11 = new MusaicPcsOperation(12, 11, 1, complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opT1, opM11]});
  expect(musaicGroup12.operations.length).toEqual(24)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(224)
});

test("Action group affine n = 12 ", () => {
  let complemented = false
  let opNeutral = new MusaicPcsOperation(12, 1, 0, complemented);
  let opT1 = new MusaicPcsOperation(12, 1, 1, complemented);
  let opM5 = new MusaicPcsOperation(12, 5, 1, complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 1, complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opT1, opM5, opM7]});
  expect(musaicGroup12.operations.length).toEqual(48)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(158)
});

test("Action group musaic n = 12 ", () => {
  let complemented = true
  let opNeutral = new MusaicPcsOperation(12, 1, 0, complemented);
  let opCT1 = new MusaicPcsOperation(12, 1, 1, !complemented);
  let opM5 = new MusaicPcsOperation(12, 5, 1, !complemented);
  let opM7 = new MusaicPcsOperation(12, 7, 1, !complemented);
  let musaicGroup12 = new MusaicActionGroup({n:12, someMusaicOperations:[opNeutral, opCT1, opM5, opM7]});
  expect(musaicGroup12.operations.length).toEqual(96)
  expect(musaicGroup12.powerset.size).toEqual(Math.pow(2, 12))
  expect(musaicGroup12.orbits.length).toEqual(88)
});

/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicPcsOperation from "@/models/MusaicPcsOperation";
import IPcs from "@/models/IPcs";
import Group from "@/models/Group";
import Stabilizer from "../../src/models/Stabilizer";

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

/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicPcsOperation from "@/models/MusaicPcsOperation";
import IPcs from "@/models/IPcs";
import Group from "@/models/Group";

const getRandomInt = max => {
 return Math.floor(Math.random() * Math.floor(max))
}

test("Generator group from M1T0", () => {
  let opM1_T0 = new MusaicPcsOperation(12, 1, 0, false);
  let someOps = [opM1_T0]
  let opsWaiting = someOps
  let allOps = Group.buildOperationsGroupByCaylayTable(someOps)
  expect(allOps).toEqual(opsWaiting)
})

test("Generator group from M1T1", () => {
  let opM1_T1 = new MusaicPcsOperation(12, 1, 1, false);
  let someOps = [opM1_T1]
  let opsWaiting = []
  for (let i = 0; i<12; i++) {
    opsWaiting.push(new MusaicPcsOperation(12, i, 0, false))
  }
  let allOperations = Group.buildOperationsGroupByCaylayTable(someOps)
  expect(allOperations).not.toEqual(opsWaiting)
})

test("testCayleyGenerateOperationsAffine", () => {
  let someOperations = []
  let order = 12;
  let a = 1;
  let t = 1;
  let complement = false;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  a = 5;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  a = 7;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  a = 11;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));

  // generate 48 operations : 12 * each a
  expect(Group.buildOperationsGroupByCaylayTable(someOperations).length).toEqual(order*4)
})

test("testCayleyGenerateOperationsMusaic", () => {
  let someOperations = []
  let order = 12;
  let a = 1;
  let t = 1;
  let complement = false;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  a = 5;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  a = 7;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));
  complement = true;
  someOperations.push(new MusaicPcsOperation(order, a, t, complement));

  t = getRandomInt(12)
  let aleaOp = new MusaicPcsOperation(order, 11, t, complement)

  let allOps = Group.buildOperationsGroupByCaylayTable(someOperations)

  // test if aleaOp is in allOps
  expect(allOps.find( (e) => e.getHashCode() === aleaOp.getHashCode())).toBeTruthy()

  // waiting 96 operations : 12 * each a = 48 and each complement (*2)
  expect(allOps.length).toEqual(order*4*2)
})


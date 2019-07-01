/*
 * Copyright (c) 2019. Olivier Capuozzo
 */


import Orbit from "@/models/Orbit";
import MotifStabilizer from "../../src/models/MotifStabilizer";

test("MotifStabilizer Constructor", () => {
  let motifStab = new MotifStabilizer("M1, M5");
  expect(motifStab.motifStabOperations).not.toBeNull()
  expect(motifStab.motifStabOperations).toEqual(["M1", "M5"])
});

test("MotifStabilizer toString", () => {
  let motifStab = new MotifStabilizer("M1, M5");
  expect(motifStab.toString()).toEqual("M1, M5")
});

test("MotifStabilizer getMiniName", () => {
  let motifStab = new MotifStabilizer("M1, M5, M7, M11, CM1, CM5, CM7, CM11");
  expect(motifStab.getMiniName()).toEqual("M1, M5, M7,...")
});

test("MotifStabilizer equals hashCode", () => {
  let motifStab1 = new MotifStabilizer("M1, M5, M7");
  let motifStab2 = new MotifStabilizer("M1, M5, M7");
  let motifStab3 = new MotifStabilizer("M1, M5, M7, CM1");
  expect(motifStab1.equals(motifStab2)).toBeTruthy()
  expect(motifStab1.hashCode()).toEqual(motifStab2.hashCode())
  expect(motifStab1.equals(motifStab3)).not.toBeTruthy()
  expect(motifStab1.hashCode()).not.toEqual(motifStab3.hashCode())
});


test("MotifStabilizer sort compare", () => {
  let motifStab1 = new MotifStabilizer("M1, M5, M7");
  let motifStab2 = new MotifStabilizer("M1, M7, CM5");
  let motifStab3 = new MotifStabilizer("M1, M5, CM1, CM7");
  let motifStab4 = new MotifStabilizer("CM1");
  let motifStab5 = new MotifStabilizer("M1, CM1");
  let motifStab6 = new MotifStabilizer("M1, M5, CM1, CM9");
  let stabilizers = [motifStab1, motifStab2,  motifStab3, motifStab6, motifStab4, motifStab5]

  // waiting
  // "CM1"            (stab4)
  // "M1 CM1"         (stab5)
  // "M1 M5 M7"       (stab1)
  // "M1 M7 CM5"      (stab2)
  // "M1 M5 CM1 CM7"  (stab3)
  // "M1 M5 CM1 CM9"  (stab6)
  stabilizers.sort(MotifStabilizer.compare)

  expect(stabilizers[0]).toEqual(motifStab4)
  expect(stabilizers[1]).toEqual(motifStab5)
  expect(stabilizers[2]).toEqual(motifStab1)
  expect(stabilizers[3]).toEqual(motifStab2)
  expect(stabilizers[4]).toEqual(motifStab3)
  expect(stabilizers[5]).toEqual(motifStab6)
});


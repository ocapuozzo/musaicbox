/*
 * Copyright (c) 2019. Olivier Capuozzo
 */


import Orbit from "@/models/Orbit";
import { fail } from "assert";
import Stabilizer from "../../src/models/Stabilizer";
import MusaicPcsOperation from "../../src/models/MusaicPcsOperation";

test("Constructor default", () => {
  let orbit = new Orbit();
  expect(orbit.ipcsset).not.toBeNull()
  expect(orbit.stabilizers).not.toBeNull()
});

test("Orbit isMotifEquivalence", () => {
  let orbit = new Orbit();
  let stab = new Stabilizer()
  stab.addOperation(new MusaicPcsOperation(12,1,0))
  orbit.stabilizers.push(stab)
  expect(orbit.isMotifEquivalence).not.toBeTruthy()
  stab.addOperation(new MusaicPcsOperation(12,1,1))
  expect(orbit.isMotifEquivalence).toBeTruthy()
});



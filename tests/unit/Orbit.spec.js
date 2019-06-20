/*
 * Copyright (c) 2019. Olivier Capuozzo
 */


import Orbit from "@/models/Orbit";

test("Constructor default", () => {
  let orbit = new Orbit();
  expect(orbit.ipcsset).not.toBeNull()
  expect(orbit.stabilizers).not.toBeNull()
});



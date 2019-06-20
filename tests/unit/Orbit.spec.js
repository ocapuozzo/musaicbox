/*
 * Copyright (c) 2019. Olivier Capuozzo
 */

import MusaicActionGroup from "@/models/MusaicActionGroup"
import IPcs from "../../src/models/IPcs";

test("All subsets of n = 5 ", () => {
  let musaicGroup5 = MusaicActionGroup.buildPowerSetOfIPcs(5);
  expect(musaicGroup5.length).toEqual(Math.pow(2, 5))

  let minPcs = new IPcs({strPcs:"", n:5})
  let maxPcs = new IPcs({strPcs:"0,1,2,3,4", n:5})
  expect(minPcs).toEqual(musaicGroup5[0])
  //musaicGroup5.forEach(pcs => console.log(pcs))
  expect(maxPcs).toEqual(musaicGroup5[musaicGroup5.length-1])
});



import MusaicPcsOperation from "@/models/MusaicPcsOperation";

test("testEqualsObject ", () => {
  let op1 = new MusaicPcsOperation(12, 7, 5, true);
  let op2 = new MusaicPcsOperation(12, 7, 5, true);
  expect(op1.equals(op2)).toEqual(true);
});
/*
@Test
public void testEqualsObject() {
  MusaicPcsOperation op1 = new MusaicPcsOperation(12, 7, 5, true);
  MusaicPcsOperation op2 = new MusaicPcsOperation(12, 7, 5, true);
  assertEquals(op1, op2);
}

@Test
public void testCompose() {
  MusaicPcsOperation opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  MusaicPcsOperation opCM7    = new MusaicPcsOperation(12, 7, 0, true);
  MusaicPcsOperation opT5     = new MusaicPcsOperation(12, 1, 5, false);

  // action CM7 first and T5 second
  assertEquals(opCM7_T5, opT5.compose(opCM7));
}

@Test
public void testActionOn() {
  Pcs pcs = new Pcs("0,3,4,7,8,11");
  MusaicPcsOperation opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  // n = 12, CM7_T5 is stabilizer for Pcs("0,3,4,7,8,11")
  assertEquals(pcs, opCM7_T5.actionOn(pcs));
  MusaicPcsOperation opCM7 = new MusaicPcsOperation(12, 7, 0, true);
  MusaicPcsOperation opT5 = new MusaicPcsOperation(12, 1, 5, false);
  assertEquals(pcs, opT5.actionOn(opCM7.actionOn(pcs)));
}

@Test
public void testActionOnLT() {
  Pcs pcs = new Pcs("0,3,6,9");
  MusaicPcsOperation opM7_T0 = new MusaicPcsOperation(12, 7, 0, false);
  assertEquals(pcs, opM7_T0.actionOn(pcs));
}


@Test
public void testActionOnLTIRoot() {
  Pcs pcs = new Pcs("1,4,7,10");
  MusaicPcsOperation opM7_T0 = new MusaicPcsOperation(12, 7, 0, false);
  MusaicPcsOperation opM5_T0 = new MusaicPcsOperation(12, 5, 0, false);
  assertEquals(pcs, opM7_T0.actionOn(pcs));
  assertEquals(pcs, opM5_T0.actionOn(pcs));
}

@Test
public void testActionOnLTIRoot2Cycles() {
  Pcs pcs = new Pcs("0,4,7");
  MusaicPcsOperation opM5_T0 = new MusaicPcsOperation(12, 5, 0, false);
  assertEquals(pcs, opM5_T0.actionOn(opM5_T0.actionOn(pcs)));
}

@Test
public void testActionOnLTIRoot2CyclesBis() {
  Pcs pcs = new Pcs("1,5,8");
  MusaicPcsOperation opM5_T0 = new MusaicPcsOperation(12, 5, 0, false);
  Pcs pcs2 =  opM5_T0.actionOn(pcs);
  Pcs pcs3 = opM5_T0.actionOn(pcs2);
  assertEquals(pcs, pcs3);
}


@Test
public void testToString() {
  MusaicPcsOperation opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  assertEquals("CM7-T5", opCM7_T5.toString());
  MusaicPcsOperation opM1_T0 = new MusaicPcsOperation(12, 1, 0, false);
  assertEquals("M1-T0", opM1_T0.toString());
}


@Test
public void testToStringWithoutTransp() {
  MusaicPcsOperation opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  assertEquals("CM7", opCM7_T5.toStringWithoutTransp());
  MusaicPcsOperation opM1_T0 = new MusaicPcsOperation(12, 1, 0, false);
  assertEquals("M1", opM1_T0.toStringWithoutTransp());
}

@Test
public void testCompareTo() {
  MusaicPcsOperation opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  MusaicPcsOperation opM1_T0 = new MusaicPcsOperation(12, 1, 0, false);
  MusaicPcsOperation opM1_T11 = new MusaicPcsOperation(12, 1, 11, false);
  MusaicPcsOperation opM7_T5 = new MusaicPcsOperation(12, 7, 5, false);

  ArrayList<MusaicPcsOperation> ops = new ArrayList<MusaicPcsOperation>();
  ops.add(opCM7_T5);
  ops.add(opM1_T0);
  ops.add(opM7_T5);
  ops.add(opM1_T11);

  ArrayList<MusaicPcsOperation> opsSortedWaiting = new ArrayList<MusaicPcsOperation>();
  opsSortedWaiting.add(opM1_T0);
  opsSortedWaiting.add(opM1_T11);
  opsSortedWaiting.add(opM7_T5);
  opsSortedWaiting.add(opCM7_T5);

  Collections.sort(ops);
  assertEquals(opsSortedWaiting, ops);
}
*/


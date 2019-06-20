import MusaicPcsOperation from "@/models/MusaicPcsOperation";
import IPcs from "@/models/IPcs";

test("MusaicPcsOp testEqualsObject ", () => {
  let op1 = new MusaicPcsOperation(12, 7, 5, true);
  let op2 = new MusaicPcsOperation(12, 7, 5, true);
  expect(op1.equals(op2)).toEqual(true);
  op2 = new MusaicPcsOperation(12, 7, 5, false);
  expect(op1.equals(op2)).not.toBeTruthy();
  op1 = new MusaicPcsOperation(12, 7, 5, false)
  expect(op1.equals(op2)).toBeTruthy();
});

test("MusaicPcsOp compose", () => {
  let opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  let opCM7    = new MusaicPcsOperation(12, 7, 0, true);
  let opT5     = new MusaicPcsOperation(12, 1, 5, false);

  // action CM7 first and T5 second
  expect(opCM7_T5.equals(opT5.compose(opCM7))).toBeTruthy();
});

test("MusaicPcsOp testActionOn", () => {
  let pcs = new IPcs({strPcs:"0,3,4,7,8,11"});
  let opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  // n = 12, CM7_T5 is stabilizer for Pcs("0,3,4,7,8,11")

  let newPcs = opCM7_T5.actionOn(pcs)

  expect(pcs.equalsPcs(newPcs)).toBeTruthy();

  let opCM7 = new MusaicPcsOperation(12, 7, 0, true);
  let opT5 = new MusaicPcsOperation(12, 1, 5, false);
  expect(pcs.equalsPcs(opT5.actionOn(opCM7.actionOn(pcs)))).toBeTruthy();
});

test("MusaicPcsOp test sort", () => {
  let opCM7_T5 = new MusaicPcsOperation(12, 7, 5, true);
  let opM1_T0 = new MusaicPcsOperation(12, 1, 0, false);
  let opM1_T3 = new MusaicPcsOperation(12, 1, 3, false);
  let opM1_T11 = new MusaicPcsOperation(12, 1, 11, false);
  let opM7_T5 = new MusaicPcsOperation(12, 7, 5, false);

  let ops = [opCM7_T5, opM1_T3, opM1_T0, opM7_T5, opM1_T11]

  let opsSortedWaiting = [opM1_T0, opM1_T3, opM1_T11, opM7_T5, opCM7_T5]

  expect(ops).not.toEqual(opsSortedWaiting)

  ops.sort(MusaicPcsOperation.compareTo)
  
  expect(ops).toEqual(opsSortedWaiting)
})

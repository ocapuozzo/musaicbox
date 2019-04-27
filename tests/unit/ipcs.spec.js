import IPcs from "@/models/IPcs";

test("IPcs cardinal", () => {
  const ipcs = new IPcs("0,4,7", 0)
  expect(ipcs.cardinal()).toEqual(3);
});

test("IPcs transpose + 1", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_plus_one = new IPcs("1,5,0", 1)

  expect(ipcs.transpose(1)).toEqual(ipcs_plus_one);
});

test("IPcs transpose - 1", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_minus_one = new IPcs("11,3,10", 11)

  expect(ipcs.transpose(-1)).toEqual(ipcs_minus_one);
});

test("IPcs transpose - 12", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("0,11,4", 0)

  expect(ipcs.transpose(-12)).toEqual(ipcs_other);
});

test("IPcs transpose + 12+6", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("6,10,5", 6)

  expect(ipcs.transpose(18)).toEqual(ipcs_other);
});

test("IPcs modulate NEXT ", () => {
  const ipcs = new IPcs("0,4,11", 0)
  let ipcs_other1
  let ipcs_other2 = new IPcs("0,4,11", 4)

  expect(ipcs.modulate(IPcs.NEXT_MODULATION)).toEqual(ipcs_other2);
  ipcs_other1 = new IPcs("0,4,11", 11)
  expect(ipcs_other2.modulate(IPcs.NEXT_MODULATION)).toEqual(ipcs_other1);
  ipcs_other2 = new IPcs("0,4,11", 0)
  expect(ipcs_other1.modulate(IPcs.NEXT_MODULATION)).toEqual(ipcs_other2);
});

test("IPcs cardinal PREVIOUS", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("0,4,11", 11)

  expect(ipcs.modulate(IPcs.PREV_MODULATION)).toEqual(ipcs_other);
});

test("IPcs equals ok ", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("11,4,0", 0)

  expect(ipcs.equals(ipcs_other)).toBeTruthy();
});

test("IPcs equals ko ", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("0,4,11", 1)

  expect(ipcs.equals(ipcs_other)).not.toBeTruthy();
});

test("IPcs complement ", () => {
  const ipcs = new IPcs("0,2,4,5,7,9,11", 0)
  const ipcs_complement = new IPcs("1,3,6,8,10", 1)
  const complement = ipcs.complement()

  const cpltcplt = complement.complement()

  expect(complement.equals(ipcs_complement)).toBeTruthy();
  expect(cpltcplt.equals(ipcs)).toBeTruthy();
});

test("IPcs complement ko", () => {
  const ipcs12pc = new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 0)
  const ipcs_complement = new IPcs("0", 0)
  try {
    const complement = ipcs12pc.complement()
    fail("impossible complement waiting (no iroot)")
  } catch (e) {
    expect(e.toString()).toMatch("Cannot initialize iroot")
  }
});

test("IPcs cardOrbitMode", () => {
  let ipcs = new IPcs("0, 3, 6, 9", 0)
  expect(ipcs.cardOrbitMode()).toEqual(1)
  ipcs = new IPcs("1, 4, 7, 10", 1)
  expect(ipcs.cardOrbitMode()).toEqual(1)
  ipcs = new IPcs("0, 4, 8", 0)
  expect(ipcs.cardOrbitMode()).toEqual(1)
  ipcs = new IPcs("0, 1, 6, 7", 0)
  expect(ipcs.cardOrbitMode()).toEqual(2)
  ipcs = new IPcs("0, 1, 2, 3", 0)
  expect(ipcs.cardOrbitMode()).toEqual(4)
  ipcs = new IPcs("0, 2, 4, 5, 7, 9, 11", 0)
  expect(ipcs.cardOrbitMode()).toEqual(7)
});

test("IPcs cardOrbitCyclic", () => {
  let ipcs = new IPcs("0, 3, 6, 9", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(3)
  ipcs = new IPcs("0, 4, 8", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(4);
  ipcs = new IPcs("0, 1, 6, 7", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(6);
  ipcs = new IPcs("0, 1, 2, 3", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(12);
  ipcs = new IPcs("0, 2, 4, 5, 7, 9, 11", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(12);
  ipcs = new IPcs("0, 1, 3, 5, 6, 8, 10", 0)
  expect(ipcs.cardOrbitCyclic()).toEqual(12);
});

test("IPcs cyclicPrimeForm", () => {
  let ipcsPF = new IPcs("0, 3, 6, 9", 0)
  expect(ipcsPF.cyclicPrimeForm()).toEqual(ipcsPF)
  let ipcs = new IPcs("1, 4, 7, 10", 1)
  expect(ipcs.cyclicPrimeForm()).toEqual(ipcsPF)
  ipcs = new IPcs("7", 7)
  expect(ipcs.cyclicPrimeForm()).toEqual(new IPcs("0", 0))
  ipcs = new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 7)
  expect(ipcs.cyclicPrimeForm()).toEqual(new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 0))
});

test("IPcs musaicPrimeForm", () => {
  let ipcs = new IPcs("0, 3, 5, 8", 0)
  // page 1171 de ToposOfMusic
  let ipcsMusaicPF = new IPcs("0, 1, 3, 4", 0)
  expect(ipcs.musaicPrimeForm()).toEqual(ipcsMusaicPF)
});

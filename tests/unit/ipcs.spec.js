import IPcs from "@/models/IPcs";

test("IPcs constructor with no iroot = 0", () => {
  const ipcs = new IPcs("0,4,7")
  expect(ipcs.iroot).toEqual(0);
});

test("IPcs constructor with no iroot > 0", () => {
  const ipcs = new IPcs("3,4,7")
  expect(ipcs.iroot).toEqual(3);
});

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
  const ipcs_other = new IPcs("0,4,11", 11)

  expect(ipcs.equals(ipcs_other)).not.toBeTruthy();
});

test("IPcs equalsPcs ", () => {
  const ipcs = new IPcs("0,4,11", 0)
  const ipcs_other = new IPcs("0,4,11", 4)

  // not equals because iroot are not same
  expect(ipcs.equals(ipcs_other)).not.toBeTruthy();
  // ok
  expect(ipcs.equalsPcs(ipcs_other)).toBeTruthy();
});


test("IPcs complement ", () => {
  const ipcs = new IPcs("0,2,4,5,7,9,11", 0)
  const ipcs_complement = new IPcs("1,3,6,8,10", 6)
  const complement = ipcs.complement()

  const cpltcplt = complement.complement()

  expect(complement.equals(ipcs_complement)).toBeTruthy();
  expect(cpltcplt.equals(ipcs)).toBeTruthy();
});

test("IPcs complement max/empty", () => {
  const ipcs12pc = new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 0)
  const ipcs_complement = new IPcs("", undefined)
  new IPcs("{]", undefined)
  try {
    const complement = ipcs12pc.complement()
    // console.log("cpt : = " + complement)
  } catch (e) {
    expect(e.toString()).toMatch("Not accept empty pcs ?")
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
  expect(ipcsPF.cyclicPrimeForm().equals(ipcsPF)).toBeTruthy();
  let ipcs = new IPcs("1, 4, 7, 10", 1)
  expect(ipcs.cyclicPrimeForm().equals(ipcsPF)).toBeTruthy();
  ipcs = new IPcs("7", 7)
  let pcsExpected = new IPcs("0", 0)
  expect(ipcs.cyclicPrimeForm().equals(pcsExpected)).toBeTruthy();
  ipcs = new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 7)
  pcsExpected = new IPcs("0,1,2,3,4,5,6,7,8,9,10,11", 0)
  expect(ipcs.cyclicPrimeForm().equals(pcsExpected)).toBeTruthy();
});

test("IPcs musaicPrimeForm", () => {
  let ipcs = new IPcs("0, 3, 5, 8", 0)
  // page 1171 de ToposOfMusic
  let ipcsMusaicPF = new IPcs("0, 1, 3, 4", 0)
  expect(ipcs.musaicPrimeForm()).toEqual(ipcsMusaicPF)
});

test("IPcs Set by Map then sort and convert to Array", () => {
  let ipcs1 = new IPcs("1, 4, 6, 9", 1)
  let ipcs2 = new IPcs("0, 3, 5, 8", 0)
  let ipcs3 = new IPcs("0, 3, 5, 8", 0)
  let map = new Map()
  map.set(ipcs1.id(),ipcs1)
  map.set(ipcs2.id(),ipcs2)
  map.set(ipcs3.id(), ipcs3)
  expect(map.size).toEqual(2)

  // https://stackoverflow.com/questions/28718641/transforming-a-javascript-iterator-into-an-array
  expect(Array.from(map.keys())[0]).toEqual(ipcs1.id())

  // test sort (integer order on id)
  map = new Map([...map.entries()].sort())
  expect(Array.from(map.keys())[0]).toEqual(ipcs2.id())

  // get ordered array from map object
  let theIpcs = Array.from(map.values());
  expect(theIpcs[0]).toEqual(ipcs2)
});


test("IPcs Set by Array", () => {
  let ipcs1 = new IPcs("1, 4, 6, 9", 1)
  let ipcs2 = new IPcs("0, 3, 5, 8", 0)
  let ipcs3 = new IPcs("0, 3, 5, 8", 0)
  let tab = []
  tab.push(ipcs1)
  tab.push(ipcs2)
  if (!tab.find(ipcs => ipcs.id() === ipcs3.id()))
      tab.push(ipcs3)

  expect(tab.length).toEqual(2)

  // let tabsort = tab.sort( (pcsa, pcsb) => pcsa.id() - pcsb.id())
  let tabsort = tab.sort( IPcs.compare)

  // get min
  expect(tabsort[0].equals(ipcs2)).toBeTruthy();
});

test("IPcs id ", () => {
  let ipcs1 = new IPcs("", undefined)
  let ipcs2 = new IPcs("0", 0)
  let ipcs3 = new IPcs("0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11", 0)
  expect(ipcs1.id()).toEqual(0)
  expect(ipcs2.id()).toEqual(1 + Math.pow(2, 12))
  expect(ipcs3.id()).toEqual(Math.pow(2, 12) - 1 + 12 * Math.pow(2, 12))
})

test("IPcs pid by simple polynomial function", () => {
  let ipcs1 = new IPcs("", undefined)
  let ipcs2 = new IPcs("0", 0)
  let ipcs3 = new IPcs("0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11", 0)
  expect(ipcs1.pid()).toEqual(0)
  expect(ipcs2.pid()).toEqual(1)
  expect(ipcs3.pid()).toEqual(Math.pow(2, 12) - 1)
})


import { shallowMount } from "@vue/test-utils";
import IPcsClass from "@/models/IPcsClass";
import { NEXT_MODULATION } from "../../src/models/IPcsClass";


// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

describe("IPcs cardinal", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,7", 0)
    expect(ipcs.cardinal()).toEqual(3);
  });
});

describe("IPcs transpose + 1", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    const ipcs_plus_one = new IPcsClass("1,5,0", 1)

    expect(ipcs.transpose(1)).toEqual(ipcs_plus_one);
  });
});


describe("IPcs transpose - 1", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    const ipcs_minus_one = new IPcsClass("11,3,10", 11)

    expect(ipcs.transpose(-1)).toEqual(ipcs_minus_one);
  });
});


describe("IPcs transpose - 12", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    const ipcs_other = new IPcsClass("0,11,4", 0)

    expect(ipcs.transpose(-12)).toEqual(ipcs_other);
  });
});

describe("IPcs transpose + 12+6", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    const ipcs_other = new IPcsClass("6,10,5", 6)

    expect(ipcs.transpose(18)).toEqual(ipcs_other);
  });
});

describe("IPcs modulate NEXT ", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    let ipcs_other1
    let ipcs_other2 = new IPcsClass("0,4,11", 4)

    expect(ipcs.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other2);
    ipcs_other1 = new IPcsClass("0,4,11", 11)
    expect(ipcs_other2.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other1);
    ipcs_other2 = new IPcsClass("0,4,11", 0)
    expect(ipcs_other1.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other2);

  });
});


describe("IPcs modulate PREVIOUS ", () => {
  it("IPcs cardinal", () => {
    const ipcs = new IPcsClass("0,4,11", 0)
    const ipcs_other = new IPcsClass("0,4,11", 11)

    expect(ipcs.modulate(IPcsClass.PREV_MODULATION)).toEqual(ipcs_other);
  });
});

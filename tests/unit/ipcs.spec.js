import {
	shallowMount
} from "@vue/test-utils";
import IPcsClass from "@/models/IPcsClass";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).toMatch(msg);
//   });
// });

test("IPcs cardinal", () => {
	const ipcs = new IPcsClass("0,4,7", 0)
	expect(ipcs.cardinal()).toEqual(3);
});

test("IPcs transpose + 1", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_plus_one = new IPcsClass("1,5,0", 1)

	expect(ipcs.transpose(1)).toEqual(ipcs_plus_one);
});

test("IPcs transpose - 1", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_minus_one = new IPcsClass("11,3,10", 11)

	expect(ipcs.transpose(-1)).toEqual(ipcs_minus_one);
});

test("IPcs transpose - 12", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_other = new IPcsClass("0,11,4", 0)

	expect(ipcs.transpose(-12)).toEqual(ipcs_other);
});

test("IPcs transpose + 12+6", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_other = new IPcsClass("6,10,5", 6)

	expect(ipcs.transpose(18)).toEqual(ipcs_other);
});

test("IPcs modulate NEXT ", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	let ipcs_other1
	let ipcs_other2 = new IPcsClass("0,4,11", 4)

	expect(ipcs.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other2);
	ipcs_other1 = new IPcsClass("0,4,11", 11)
	expect(ipcs_other2.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other1);
	ipcs_other2 = new IPcsClass("0,4,11", 0)
	expect(ipcs_other1.modulate(IPcsClass.NEXT_MODULATION)).toEqual(ipcs_other2);
});

test("IPcs cardinal PREVIOUS", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_other = new IPcsClass("0,4,11", 11)

	expect(ipcs.modulate(IPcsClass.PREV_MODULATION)).toEqual(ipcs_other);
});

test("IPcs equals ok ", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_other = new IPcsClass("0,4,11", 0)

	expect(ipcs.equals(ipcs_other)).toBeTruthy();
});

test("IPcs equals ko ", () => {
	const ipcs = new IPcsClass("0,4,11", 0)
	const ipcs_other = new IPcsClass("0,4,11", 1)

	expect(ipcs.equals(ipcs_other)).not.toBeTruthy();
});

test("IPcs complement ", () => {
	const ipcs = new IPcsClass("0,2,4,5,7,9,11", 0)
	const ipcs_complement = new IPcsClass("1,3,6,8,10", 1)
	const complement = ipcs.complement()
	
	const cpltcplt = complement.complement()

	expect(complement.equals(ipcs_complement)).toBeTruthy();
	expect(cpltcplt.equals(ipcs)).toBeTruthy();	
});

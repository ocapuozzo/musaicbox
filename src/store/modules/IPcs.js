import forte from './ForteMap';

class IPCS {
	constructor(pcs, iroot) {
		if (typeof(pcs)==='string') {
			this.pcs = this._constructFromString(pcs);
		} else { // assume array
		  this.pcs = pcs
		}
		this.iroot = iroot

	}

	_constructFromString(strpcs) {
		let bin = new Array(12).fill(0); 
		let picthes = strpcs.split(',');
		for (let i = 0; i < picthes.length; i++){
       bin[Number(picthes[i])] = 1; 
		}
		return bin;
	}

	static id(abin) {
		let n = abin.length;
		let res = 0;
		let pow = 1;
		let card = 0;
		for (let i = 0; i < n; i++) {
			res += abin[i] * pow;
			pow *= 2;
			if (abin[i] == 1)
				card++;
		}
		return res + card * (1 << n);
		//return res + ((int) Math.pow(2, dim)) * card;
	}
	id() {
		return IPCS.id(this.pcs);
	}

	/**
	 * Get cyclic PF
	 * 
	 * @param bpcs
	 *           bpcs binary pitches class set
	 * @return bpcs binary pitches class set in cyclic prime form
	 */
	cyclicPrimeForm() {
		let n = this.pcs.length;
		let norm = this.pcs.slice();
		let min = norm;
		let minInt = IPCS.id(this.pcs);
		for (let i = 0; i < n - 1; i++) {
			norm = this.getPermute(1, 1, norm);
			let curInt = IPCS.id(norm);
			if (minInt > curInt) {
				minInt = curInt;
				min = norm;
			}
		}
		return new IPCS(min, 0);
	}

	dihedralPrimeForm() {
		let cpf = this.cyclicPrimeForm();
		let norm = cpf.pcs.slice();
		norm = this.getPermute(11, 1, norm);
		let dpf = new IPCS(norm,0).cyclicPrimeForm();
		return cpf.id() < dpf.id() ? cpf : dpf;
	}


	/**
	 * general transformation
	 * @param  a    {1,5,7,11}
	 * @param  t    [0..11]
	 * @param  abin binary array  
	 */
	getPermute(a, t, abin) {
		let permute = abin.slice();
		let n = abin.length;
		let index;
		for (let i = 0; i < n; i++) {
			index = i*a  + -(a - 1 - n) * this.iroot + t;
			index = index % n;
			permute[i] = abin[index];
		}
		return permute;
	}

  getPcsstr(){
		let res = "";
		for (let index = 0; index < this.pcs.length; index++) {
			const element = this.pcs[index];
			if (element)
				res = (res) ? res + ',' + index.toString() : index.toString();
		}
		return '[' + res + ']';
	}

	getForteNum(){
		let cpf = this.cyclicPrimeForm();
		let fortenum = forte(cpf.getPcsstr());
		if (fortenum) {
			return fortenum;
		} 
		let dpcsf = cpf.dihedralPrimeForm();
		console.log("dpcsf : " + dpcsf);
    return forte(dpcsf.getPcsstr());
	}

}

const state = {
	pcs: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	iroot: 0
}

const getters = {
	pcsCard: state => {
		return state.pcs.filter(i => i === 1).length
	},

	// interval vector (generalized on n, from musaicbox java)
	// https://en.wikipedia.org/wiki/Common_tone_(scale)#Deep_scale_property
	iv: state => {
		let n = state.pcs.length;
		let res = new Array(n / 2 + n % 2);
		let max = n / 2;
		let v = 0;
		for (let i = 0; i < max; i++) {
			res[i] = 0;
			v++;
			for (let j = 0; j < n; j++) {
				if (state.pcs[j] == 1 && state.pcs[(j + v) % n] == 1)
					res[i] = res[i] + 1;
			}
		}
		// div last value by 2
		res[res.length - 1] /= 2;
		return res;
	},

	/**
	 * int image of a binary pitches class set (total order)
	 * 
	 * Ex : [0,0,1,0,0,0,0,0,0,0,0,0] => 4 * cardinal * 2^12
	 * 
	 */
	id: state => {
		let n = state.pcs.length;
		let res = 0;
		let pow = 1;
		let card = 0;
		for (let i = 0; i < n; i++) {
			res += state.pcs[i] * pow;
			pow *= 2;
			if (state.pcs[i] == 1)
				card++;
		}
		return res + card * (1 << n);
		//return res + ((int) Math.pow(2, dim)) * card;
	},

	pcsstr: state => {
		let res = "";
		for (let index = 0; index < state.pcs.length; index++) {
			const element = state.pcs[index];
			if (element)
				res = (res) ? res + ',' + index.toString() : index.toString();
		}
		return '[' + res + ']';
	},

	cyclicPF : state => {
		let ipcs = new IPCS(state.pcs, state.iroot);
		return ipcs.cyclicPrimeForm();
	},

	fortenum(state, getters) {		
		let ipcs = new IPCS(state.pcs, state.iroot);
		console.log('ipcs : '+ ipcs.pcs);
		return ipcs.getForteNum();
	}

}

const actions = {}

const mutations = {

	update(state, ipcs) {
		console.log('ipcs mutation :' + ipcs);
		state.pcs = ipcs.pcs
		state.iroot = ipcs.iroot
	},

	changepcs(state, pcs) {
		console.log('mutation changepcs whith :' + pcs);
		state.pcs = pcs
	},

	setIRoot(state, iroot) {
		state.iroot = iroot
		state.pcs[iroot] = 1;
	},

	transpose(state, t) {
		state.iroot = (state.iroot + t) % state.pcs.length
	},

	/**
	 * image of given array where each element is multipy by mult modulo n
	 * (n is size of given array) plus - (mult-1) + state.iroot
	 * 
	 * @param mult
	 * @returns int[]
	 */
	mult(state, mult) {
		console.log('NEW mutation multiplication by :' + mult);
		let n = state.pcs.length;
		let newpcs = state.pcs.slice().fill(0);
		for (let i = 0; i < n; i++) {
			newpcs[i] = state.pcs[((i * mult) % n - (-n + mult - 1) * state.iroot) % n];

		}
		console.log('pcs : ' + state.pcs);
		console.log('newpcs : ' + newpcs);
		state.pcs = newpcs;
	},

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
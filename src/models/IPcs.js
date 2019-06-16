import forte from "./ForteMap";

const NEXT_MODULATION = 1
const PREV_MODULATION = 2

const negativeToPositiveModulo = (i, n) => {
  return (n - ((i * -1) % n)) % n
}

export default class IPcs {
  // TODO change signature add "destructured bloc" as parameter
  constructor(pcs, iroot, prev_ipcs_cplt = null) {
    if (typeof (pcs) === 'string') {
      this.pcs = this._fromStringTobinArray(pcs, 12)
    } else if (typeof (pcs) === 'object' && !Array.isArray(pcs)) {
      // waiting object as { strpcs a string attribute and n an integer }
      // example { "strpcs" : "[0,3,4]", "n" : 7 }
      this.pcs = this._fromStringTobinArray(pcs.strpcs, pcs.n)
    } else if (Array.isArray(pcs)) {
      // assume pcs bin vector [1,0,1, ... ]
      this.pcs = pcs.slice()
    } else {
      throw new Error("Can't create IPcs instance (bad args = "+ pcs + ")")
    }
    // empty set as valid pcs
    if (this.cardinal() === 0) {
      this.iroot = undefined
    } else if (!iroot && iroot !== 0) {
      //iroot is min pc
      this.iroot = this.pcs.findIndex( ( pc => pc === 1 ))
    } else {
      // check iroot in pcs
      if (this.pcs[iroot] === 1) {
        this.iroot = iroot
      } else {
        throw new Error("Can't create IPcs instance (bad iroot = " + iroot + " for pcs " + this.pcs + ")")
      }
    }
    this.prev_ipcs_cplt = prev_ipcs_cplt ? prev_ipcs_cplt : null
    this.n = this.pcs.length
  }

  /**
   * bin array image of PCS string
   * Example : "0, 1, 7" => [1,1,0,0,0,0,0,1,0,0,0,0] (default n = 12)
   * Example : "0, 1, 3", 5 => [1,1,0,1,0] (n = 5)
   *
   * @param {string} strpcs
   * @param {number} n vector dimension
   * @returns {int[]} vector (length == n)
   */
  _fromStringTobinArray(strpcs, n=12) {
    // assume length = 12
    let bin = new Array(n).fill(0);

    //  if "[1,3,5]" => "1,3,5"
    //  if "{1,3,5}" => "1,3,5"
    if ((strpcs[0] === '[' && strpcs[strpcs.length - 1] === ']') ||
        (strpcs[0] === '{' && strpcs[strpcs.length - 1] === '}')) {
      strpcs = strpcs.substring(1, strpcs.length - 1);
    }
    if (strpcs) {
      let pitches = strpcs.split(',');
      for (let i = 0; i < pitches.length; i++) {
        bin[Number(pitches[i])] = 1;
      }
    }
    return bin;
  }

  static get NEXT_MODULATION() {
    return NEXT_MODULATION
  }

  static get PREV_MODULATION() {
    return PREV_MODULATION
  }

  /**
   * int identify of PCS Bin Array representtion (abin)
   *  function polynomial (bijective function)
   * @param {array} abin
   * @returns {number}
   */
  static pid(abin) {
    let n = abin.length;
    let res = 0;
    let pow = 1;
    let card = 0;
    for (let i = 0; i < n; i++) {
      res += abin[i] * pow;
      pow *= 2;
      if (abin[i] === 1)
        card++;
    }
    return res;
  }

  /**
   * int identify of PCS Bin Array representtion (abin)
   *  is function polynomial + 2^12 * cardinal
   *   for order relation (select min with weight cardinal)
   * @param {array} abin
   * @returns {number}
   */
  static id(abin) {
    let n = abin.length;
    let res = 0;
    let pow = 1;
    let card = 0;
    for (let i = 0; i < n; i++) {
      res += abin[i] * pow;
      pow *= 2;
      if (abin[i] === 1)
        card++;
    }
    return res + card * (1 << n);
    //return res + ((int) Math.pow(2, dim)) * card;
  }

  id() {
    return IPcs.id(this.pcs);
  }

  pid() {
    return IPcs.pid(this.pcs);
  }

  /**
   * return this by transpose iroot to zero
   * @return {IPcs}
   */
  modalPrimeForm() {
    // if iroot is undefined or already equals to zero, return this
    if (!this.iroot) {
      return this
    }
    return this.transpose(-this.iroot)
  }

  /**
   * Get cyclic PF
   *
   * @return IPcs
   */
  cyclicPrimeForm() {
    if (this.cardinal() === 0) {
      return this
    }
    if (this._minCyclic){
      return this._minCyclic
    }
    // lazy compute
    let n = this.pcs.length;
    let norm = this.pcs.slice();
    let min = norm;
    let minInt = IPcs.id(this.pcs);

    for (let i = 0; i < n - 1; i++) {
      norm = IPcs.getPermute(1, 1, 0, norm);
      let curInt = IPcs.id(norm);
      if (minInt > curInt) {
        minInt = curInt;
        min = norm;
      }
    }
    this._minCyclic = new IPcs(min, 0)
    return this._minCyclic
  }

  dihedralPrimeForm() {
    let cpf = this.cyclicPrimeForm();
    let pcsM11 = cpf.affineOp(11, 0).cyclicPrimeForm();
    return cpf.id() < pcsM11.id() ? cpf : pcsM11;
  }

  affinePrimeForm() {
    let cpf = this.dihedralPrimeForm();
    let pcsM5 = cpf.affineOp(5, 0).cyclicPrimeForm();
    let pcsM7 = cpf.affineOp(7, 0).cyclicPrimeForm();

    if (cpf.id() < pcsM5.id() && cpf.id() < pcsM7.id())
       return cpf

    if (pcsM5.id() < pcsM7.id())
       return pcsM5

    return pcsM7
  }

  musaicPrimeForm() {
    let cpf = this.affinePrimeForm();
    let cpfCplt = this.complement().affinePrimeForm();
    return cpf.id() < cpfCplt.id() ? cpf : cpfCplt;
  }

  /**
   * general transformation : affine operation ax + t
   * general idea (composition of affine operations):
   *  1/ translate :        1 + -iroot
   *  2/ affine operation : ax + t
   *  3/ translate :        1 + iroot
   *  so : ax + ( -(a-1) * iroot + t )
   * @param  a    {number}
   * @param  t    [0..this.n[
   * @param iroot [0..this.n[
   * @param  abin binary array
   * @return {int[]}
   */
  static getPermute(a, t, iroot, abin) {
    let permute = abin.slice()
    let n = abin.length
    let j
    if (t < 0) {
      t = negativeToPositiveModulo(t, n)
      // t in [0..n[
    }
    for (let i = 0; i < n; i++) {
      j = (n + (((i * a) - (a - 1) * iroot - t) % n)) % n
      // j may be negative... so n + (...) modulo n
      permute[i] = abin[j]
    }
    return permute
  }

  /**
   * general transformation : affine operation ax + t
   * general idea (composition of affine operations):
   *  1/ translate :        1 + -iroot
   *  2/ affine operation : ax + t
   *  3/ translate :        1 + iroot
   *  so : ax + ( -(a-1) * iroot + t ) (for each pc in pcs)
   * @param  a    {number}
   * @param  t    [0..11]
   * @return {IPcs}
   */
  permute(a, t) {
    if (this.cardinal() === 0) {
      // empty pcs no change
      return this
    }
    let newIRoot = negativeToPositiveModulo((this.iroot + t), this.pcs.length)
    return new IPcs(IPcs.getPermute(a, t, newIRoot, this.pcs), newIRoot)
  }

  /**
   * Transformation affine of this
   * @param a
   * @param t
   * @returns {IPcs}
   */
  affineOp(a, t) {
    return this.permute(a, t)
  }

  /**
   * Transpose of this
   * @param t
   * @returns {IPcs}
   */
  transpose(t) {
    return this.affineOp(1, t)
  }

  /**
   * Modulate of this (change iroot)
   * @param direction which next or previus degree of modulation
   * @returns {IPcs} a new object
   *
   * TODO : set new iroot nearest
   */
  modulate(direction) {
    let newIRoot = this.iroot
    if (direction === IPcs.NEXT_MODULATION) {
      let n = this.pcs.length
      for (let i = this.iroot + 1; i < n + this.iroot; i++) {
        if (this.pcs[i % n] === 1) {
          newIRoot = i % n
          break
        }
      }
    } else if (direction === IPcs.PREV_MODULATION) {
      let n = this.pcs.length
      let i = this.iroot - 1
      if (i < 0) {
        i = negativeToPositiveModulo(i, n)
      }
      for (; i !== this.iroot;) {
        if (this.pcs[i] === 1) {
          newIRoot = i
          break
        }
        i--
        if (i < 0) {
          i = negativeToPositiveModulo(i, n)
        }
      }
    }
    return new IPcs(this.pcs.slice(), newIRoot)
  }

  /**
   * string image of PCS from bin array
   * Example : [1,1,0,0,0,0,0,1,0,0,0,0] => "[0, 1, 7]"
   * @returns {string}
   */
  get pcsStr() {
    let res = "";
    for (let index = 0; index < this.pcs.length; index++) {
      const element = this.pcs[index];
      if (element)
        res = (res) ? res + ',' + index.toString() : index.toString();
    }
    return '[' + res + ']';
  }

  getForteNum() {
    let cpf = this.cyclicPrimeForm();
    // console.log("cpf :" + cpf);
    let fortenum = forte(cpf.pcsStr);
    // console.log("fortenum :" + fortenum);
    if (fortenum) {
      return fortenum;
    }
    let dpcsf = cpf.dihedralPrimeForm();
    // console.log("dpcsf : " + dpcsf);
    // console.log("dpcsf : " + dpcsf.pcsStr);

    return forte(dpcsf.pcsStr);
  }

  /**
   * Change iroot and set 1 to this index
   * @param iroot
   */
  setIroot(iroot) {
    this.pcs[iroot] = 1;
    this.iroot = iroot;
  }

  /**
   * interval vector (generalized on n, from musaicbox java)
   * @see https://en.wikipedia.org/wiki/Common_tone_(scale)#Deep_scale_property
   * @returns {int[]}
   *
   * Example : iv("0,3,7") => [0,0,1,1,1,0]
   */
  iv() {
    let n = this.pcs.length;
    let res = new Array(n / 2 + n % 2);
    let max = n / 2;
    let v = 0;
    for (let i = 0; i < max; i++) {
      res[i] = 0;
      v++;
      for (let j = 0; j < n; j++) {
        if (this.pcs[j] === 1 && this.pcs[(j + v) % n] === 1)
          res[i] = res[i] + 1;
      }
    }
    // div last value by 2 (n==12)
    res[res.length - 1] /= 2;
    return res;
  }

  /**
   * get number of pitches of this
   */
  cardinal() {
    return this.pcs.filter(i => i === 1).length
  }

  /**
   * get cardinal of all modes of this
   * Examples :
   * <pre>
   * { 0, 3, 6, 9} => 1
   * { 0, 4, 8} => 1
   * { 0, 1, 6, 7} => 2
   * { 0, 1, 2, 3} => 4
   * </pre>
   * @return {number}
   */
  cardOrbitMode() {
    if (this.iroot === undefined) {
      return undefined
    }
    if (this._cardModesOrbits) {
      return this._cardModesOrbits // _modesOrbits.length
    }
    // lazy loading
    let modesOrbits = []
    modesOrbits.push(this)
    let cardinal = 0;
    let pcs = this.pcs.slice()
    let n = pcs.length
    for (let i = (this.iroot + 1) % n; i < pcs.length + this.iroot; i++) {
      if (pcs[i % n] === 0) continue
      cardinal++
      let ipcs2 = this.transpose(-i + this.iroot)
      // compare pcs without iroot
      if (ipcs2.equalsPcs(this)) {
        break
      } else {
        modesOrbits.push(ipcs2)
      }
    }
    return this._cardModesOrbits = modesOrbits.length
  }

  /**
   * get number of distinct PCS in cyclic orbit of PCS.
   *  formula derived from equality in these two ratios  : n/cardOrbitCyclic and cardinalPcs/cardOrbitMode
   * @return {number}
   */
  cardOrbitCyclic() {
    let n = this.pcs.length
    return (n * this.cardOrbitMode()) / this.cardinal()
  }

  /**
   * get complement of this.
   * Important : complement loses iroot pivot
   * if prev_ipcs_cplt is defined, return prev_ipcs_cplt
   *   (default prev_ipcs_cplt is null)
   * else
   *   build complement of this and put this as prev_ipcs_cplt
   * why ? It is to allow to switch from one to another
   */
  complement() {
    if (this.prev_ipcs_cplt) {
      return this.prev_ipcs_cplt
    }
    let pcs_cpt = this.pcs.map(pc => (pc === 1 ? 0 : 1)) //;slice() and inverse 0/1
    let new_iroot = undefined
    let localIroot = this.iroot === undefined ?  0 : this.iroot
    let n = pcs_cpt.length
    // iroot is lost by complement... set a new iroot of complement
    // opposite is a good candidate when n is even
    if ((n%2) === 0 && pcs_cpt[(localIroot + n/2) % n ] === 1 ){
      new_iroot = (localIroot  + n/2) % n
    } else {
      // TODO best strategy to fin new iroot
      // here the first in right circular research
      for (let i = localIroot  + 1; i < localIroot  + n; i++) {
        if (pcs_cpt[i % n] === 1) {
          new_iroot = i % n
          break
        }
      }
    }
    if (new_iroot === undefined && this.prev_ipcs_cplt) {
      throw new Error("Complement : Cannot initialize iroot !!!??")
    }
    return new IPcs(pcs_cpt, new_iroot, this)
  }

  toString() {
    return JSON.stringify(this.pcs) + ", iroot : "
      + JSON.stringify(this.iroot)
      + (this.prev_ipcs_cplt ? ', (cplt)' : '')
    //	return JSON.stringify(this);
  }

  equals(other) {
    if (other instanceof IPcs) {
      return this.pcs.every((v, i) => v === other.pcs[i]) &&
        this.iroot === other.iroot;
    }
    return false
  }

  equalsPcs(other) {
    if (other instanceof IPcs) {
      return this.pcs.every((v, i) => v === other.pcs[i])
    }
    return false
  }

  /**
   *
   * @param ipcs1
   * @param ipcs2
   * @return {number} as waiting by Array sort
   */
  static compare(ipcs1, ipcs2) {
    return ipcs1.id() - ipcs2.id()
  }
}
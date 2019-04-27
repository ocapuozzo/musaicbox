import forte from "./ForteMap";

const NEXT_MODULATION = 1
const PREV_MODULATION = 2

const negativeToPositiveModulo = (i, n) => {
  return (n - ((i * -1) % n)) % n
}

export default class IPcs {
  constructor(pcs, iroot, prev_ipcs_cplt = null) {
    if (typeof (pcs) === 'string') {
      this.pcs = this._fromStringTobinArray(pcs);
    } else { // assume array
      this.pcs = pcs
    }
    // test for futur include empty set (?) as valid pcs
    if (!pcs) {
      this.iroot = 0;
    } else  {
      // check iroot in pcs
      this.setIroot(iroot)
    }

    this.prev_ipcs_cplt = prev_ipcs_cplt ? prev_ipcs_cplt : null
  }

  /**
   * bin array image of PCS string
   * Example : "0, 1, 7" => [1,1,0,0,0,0,0,1,0,0,0,0]
   * @returns {string}
   *
   * @param strpcs
   * @returns {int[]}
   */
  _fromStringTobinArray(strpcs) {
    let bin = new Array(12).fill(0);
    //  if "[1,3,5]" => "1,3,5"
    //  if "{1,3,5}" => "1,3,5"
    if ((strpcs[0] === '[' && strpcs[strpcs.length - 1] === ']') ||
      (strpcs[0] === '{' && strpcs[strpcs.length - 1] === '}')) {
      strpcs = strpcs.substring(1, strpcs.length - 1);
    }
    let pitches = strpcs.split(',');
    for (let i = 0; i < pitches.length; i++) {
      bin[Number(pitches[i])] = 1;
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
   *  is function polynomial + 2^12 * cardinal
   *   for order relation (select min in hasse diagram)
   * @param abin
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

  /**
   * Get cyclic PF
   *
   * @return IPcs which binary pitches class set in cyclic prime form
   */
  cyclicPrimeForm() {
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
    return new IPcs(min, 0);
  }

  dihedralPrimeForm() {
    let cpf = this.cyclicPrimeForm();
    let pcsM11 = cpf.affineOp(11, 0).cyclicPrimeForm();
    return cpf.id() < pcsM11.id() ? cpf : pcsM11;
  }

  affinePrimeForm() {
    let cpf = this.dihedralPrimeForm();
    let pcsM5 = cpf.affineOp(5, 0).cyclicPrimeForm();
    // or M11xM7
    // or M5xM7
    return cpf.id() < pcsM5.id() ? cpf : pcsM5;
  }

  musaicPrimeForm() {
    let cpf = this.affinePrimeForm();
    let cpfCplt= this.complement().affinePrimeForm();
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
   * @param  t    [0..11]
   * @param iroot [0..11]
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
    // iroot is invariant
    let newIRoot = negativeToPositiveModulo((this.iroot + t), this.pcs.length)
    return new IPcs(IPcs.getPermute(a, t, this.iroot, this.pcs), newIRoot)
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
    this.iroot = iroot;
    this.pcs[iroot] = 1;
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
    // if(this._modesOrbits) {
    //   return this._modesOrbits.length
    // }
    // lazy loading
    // this._modesOrbits = []
    let cardinal = 0;
    let pcs = this.pcs.slice()
    let n = pcs.length
    for (let i=(this.iroot+1) % n; i< pcs.length + this.iroot; i++) {
      if (pcs[i%n] === 0) continue
      cardinal++
      let pcs2 = this.transpose(-i + this.iroot)
      pcs2.setIroot(this.iroot) // for equals...
      if (pcs2.equals(this)) {
        return cardinal
      } else {
        // this._modesOrbits.push(pcs2)
      }
    }
    // return this._modesOrbits.length
    return cardinal +1
  }

  /**
   * get number of distinct PCS in cyclic orbit of PCS.
   *  formula derived from equality in these two ratios  : n/cardOrbitCyclic and cardinalPcs/cardOrbitMode
   * @return {number}
   */
  cardOrbitCyclic() {
    let n = this.pcs.length
    return (n * this.cardOrbitMode())/this.cardinal()
  }

  /**
   * get complement of this.
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
    let n = pcs_cpt.length
    // iroot is lost by complement... set a new iroot of complement
    for (let i = this.iroot + 1; i < this.iroot + n; i++ ) {
      if (pcs_cpt[i % n] === 1) {
        new_iroot = i % n
        break
      }
    }
    if (new_iroot === undefined){
       throw new Error("Complement : Cannot initialize iroot !!!")
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
}
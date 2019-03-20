import forte from "./ForteMap";

export default class IPcsClass {
  constructor(pcs, iroot) {
    if (typeof (pcs) === 'string') {
      this.pcs = this._fromStringTobinArray(pcs);
    } else { // assume array
      this.pcs = pcs
    }
    this.iroot = iroot

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
     if (strpcs[0]==='[' && strpcs[strpcs.length-1]===']') {
       strpcs = strpcs.substring(1,strpcs.length-1);
     }
    let pitches = strpcs.split(',');
    for (let i = 0; i < pitches.length; i++) {
      bin[Number(pitches[i])] = 1;
    }
    return bin;
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
    return IPcsClass.id(this.pcs);
  }

  /**
   * Get cyclic PF
   *
   * @return IPcsClass which binary pitches class set in cyclic prime form
   */
  cyclicPrimeForm() {
    let n = this.pcs.length;
    let norm = this.pcs.slice();
    let min = norm;
    let minInt = IPcsClass.id(this.pcs);
    for (let i = 0; i < n - 1; i++) {
      norm = IPcsClass.getPermute(1, 1, 0, norm);
      let curInt = IPcsClass.id(norm);
      if (minInt > curInt) {
        minInt = curInt;
        min = norm;
      }
    }
    return new IPcsClass(min, this.iroot);
  }

  dihedralPrimeForm() {
    let cpf = this.cyclicPrimeForm();
    let norm = cpf.pcs.slice();
    norm = IPcsClass.getPermute(11, 1, this.iroot, norm);
    let dpf = new IPcsClass(norm, this.iroot).cyclicPrimeForm();
    return cpf.id() < dpf.id() ? cpf : dpf;
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
    let permute = abin.slice();
    let n = abin.length;
    for (let i = 0; i < n; i++) {
      permute[i] = abin[((i * a) - (-n + a - 1) * iroot + t) % n];
    }
    return permute;
  }

  /**
   * Transformation affine of this
   * @param a
   * @param t
   * @returns {IPcsClass}
   */
  affineOp(a,t){
    return new IPcsClass(IPcsClass.getPermute(a, t, this.iroot, this.pcs), this.iroot)
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
    // div last value by 2
    res[res.length - 1] /= 2;
    return res;
  }

  cardinal() {
    return this.pcs.filter(i => i === 1).length
  }

  toString(){
    return JSON.stringify(this);
  }
}

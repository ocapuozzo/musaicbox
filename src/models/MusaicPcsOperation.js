/**
 * musaic operation group : ((ax + t) modulo n) . c
 *
 * where 'a' is prime with n,  'x' a PCS (all PCs in x), 't' step of transposition, 'c' is
 * complement operation which can be : neutral operation or complement operation
 * so 'c' is boolean representation with composition operation is XOR
 * <table>
 * <tr>
 * <td></td>
 * <td>notCplt</td>
 * <td>Cplt</td>
 * </tr>
 * <tr>
 * <td>notCplt</td>
 * <td>id</td>
 * <td>Cplt</td>
 * </tr>
 * <tr>
 * <td>Cplt</td>
 * <td>Cplt</td>
 * <td>id</td>
 * </tr>
 * </table>
 *
 * @author kpu
 *
 */

import Utils from "../utils/Utils";

export default class MusaicPcsOperation {

  /**
   *  ((ax + t) modulo n) . c
   *
   * @param {Number} n dimension vector
   * @param {Number} a coef mult
   * @param {Number} t translation value
   * @param {Boolean} complement boolean
   */
  constructor(n, a, t, complement=false) {
  this.a = Number(a);
  this.t = Number(t);
  this.n = Number(n);
  this.complement = complement;
  let prefix = this.complement ? "C" : "";
  this._strRepr = prefix + "M" + this.a + "-T" + this.t; // n ?
  this._strReprWithoutTransp = prefix + "M" + a;
  this.fixedPcs = []  // new ArrayList<Pcs>();
  this.stabilizers = [] // new ArrayList<Stabilizer>();
}

_makeHashCode() {
  return Utils.stringHashCode(this._strRepr)
}

equals(obj) {
  if (this === obj)
    return true;
  if (obj === null)
    return false;
  if (!(obj instanceof MusaicPcsOperation))
    return false;

  let other = obj;

  if (this.a !== other.a)
    return false;
  if (this.complement !== other.complement)
    return false;
  if (this.n !== other.n)
    return false;
  if (this.t !== other.t)
    return false;
  return true;
}

/**
 * Use for generate all operations from a subset of operations, inspired by Cayley
 * table algorithm : get a new operation by Law of composition of MusaicGroup :
 * <pre>
 * (a,t,c) (a',t',c') = (aa', at' + t, c xor c')
 * </pre>
 * where :
 * <ul>
 * <li>a is integer prime with n </li>
 * <li>t is integer into [0..n[ </li>
 * <li>c is boolean (complement or not) </li>
 * </ul>
 * Important remark : Neutral operation is M1-TO (complement == false)
 *    whatever op :
 *    M1-T0.compose(M1-T0) == M1-T0   (false !== false) => false
 *    CM1-T0.compose(M1-T0) == CM1-T0 (true !== false) => true
 *
 * @param {...*} other (a',t',c')
 * @return {MusaicPcsOperation} (this.a,this.t,this.c) (a',t',c') = (aa', at' + t, c xor c'), a new instance
 */
compose(other) {
  if (this.n !== other.n)
    throw new Error("MusaicPcsOperation MusaicGroup Exception bad N in compose op");

  return new MusaicPcsOperation(
    this.n,
   (this.a * other.a) % this.n,
   (this.a * other.t + this.t) % this.n,
   this.complement !== other.complement)  // xor logical
}

/**
 * action on a IPcs is define by
 * <pre>
 *   is this action is complemented
 *     return complement(affineOperation(pcs))
 *   else
 *     return affineOperation(pcs)
 * </pre>
 * @param {IPcs} ipcs
 * @return {IPcs} a new Pcs
 */
actionOn(ipcs) {
  return this.complement ? ipcs.affineOp(this.a, this.t).complement() : ipcs.affineOp(this.a, this.t);
}

toString() {
  return this._strRepr;
}

// without translation op
toStringWithoutTransp() {
  return this._strReprWithoutTransp;
}

/**
 * major sort as M, CM
 *   M1 M5 M7 M11 CM1 CM5 CM7 CM11
 * minor sort as T
 *   M1-T1 M2-T2 ...
 * So:    M1-T3, M1-T0, CM1-T5, M5-T1, CM7-T8, CM7-T3
 * give : M1-T0, M1-T3, M5-T1, CM1-T5, CM7-T3, CM7-T8
 */
static compare(op1, op2) {
  let w1 = 0;
  let w2 = 0;
  if (op1.complement)
    w1 = op1.n;
  if (op2.complement)
    w2 = op1.n;

  let comp = (w1 + op1.a) - (w2 + op2.a);

  if (comp === 0) {
    comp = op1.t - op2.t;
  }
  return comp;
}

compareTo(other) {
  return MusaicPcsOperation.compare(this, other)
}

addFixedPcs(ipcs) {
  if (!this.fixedPcs.find(p => p.id() === ipcs.id())) {
    this.fixedPcs.push(ipcs);
  }
}

getFixedPcs() {
  return this.fixedPcs;
}

getHashCode() {
  if (!this._hashcode) {
    this._hashcode = this._makeHashCode()
  }
  return this._hashcode
}


// // test en vue de supprimer  la coll fixedPcs
// // qui est gourmande en mémoire inutule
// // pour que ça marche il faut ajouter une liaison
// // vers les stabilizers ayant cette opération comme stab.
//
// public Set<Pcs> getComputeFixedPcs() {
//   Set<Pcs> fixedPcs = new HashSet<Pcs>();
//   for(Stabilizer stab : stabilizers) {
//     fixedPcs.addAll(stab.getFix().pcsset);
//   }
//   return fixedPcs;
// }

}
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

export default class MusaicPcsOperation {
  /*
  public final int n;
  public final int a;
  public final int t;
  public final boolean complement;
  private final int _hashcode;
  protected String _strRepr;
  protected String _strReprWithoutTransp;
  private List<Pcs> fixedPcs;

  private List<Stabilizer> stabilizers;
*/

  /**
   *  ((ax + t) modulo n) . c
   *
   * @param n dimension vector
   * @param a coef mult
   * @param t translation value
   * @param complement boolean
   */
  constructor(n, a, t, complement) {
  this.a = a;
  this.t = t;
  this.n = n;
  this.complement = complement;
  let prefix = complement ? "C" : "";
  this._strRepr = prefix + "M" + a + "-T" + t; // n ?
  this._strReprWithoutTransp = prefix + "M" + a;
  this.fixedPcs = []  // new ArrayList<Pcs>();
  this.stabilizers = [] // new ArrayList<Stabilizer>();
}

_makeHashCode() {
  const prime = 31;
  let _hashcode = 1;
  _hashcode = prime * _hashcode + this.a * this.n * 2;
  _hashcode = prime * _hashcode + (this.complement ? 1231 : 1237);
  _hashcode = prime * _hashcode + this.n;
  _hashcode = prime * _hashcode + this.t;
  return this._hashcode = _hashcode;
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
 * @param {MusaicPcsOperation} other (a',t',c')
 * @return {MusaicPcsOperation} (this.a,this.t,this.c) (a',t',c') = (aa', at' + t, c xor c'), a new instance
 */
compose(other) {
  if (this.n !== other.n)
    throw new Error("MusaicPcsOperation MusaicGroup Exception bad N in compose op");

  return new MusaicPcsOperation(
    this.n,
   (this.a * other.a) % this.n,
   (this.a * other.t + this.t) % this.n,
   (this.complement ^ other.complement) ? true : false)
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
static compareTo( op1, op2) {
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

addFixedPcs(ipcs) {
  if (!this.fixedPcs.contains(ipcs)) {
    this.fixedPcs.add(ipcs);
  }
}

getFixedPcs() {
  return this.fixedPcs;
}

getHashCode() {
  if (!this._hashcode) {
    this._makeHashCode()
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
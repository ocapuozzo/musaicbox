/**
 * Copyright (c) 2019. Olivier Capuozzo
 */

import Utils from "../utils/Utils";
import MusaicPcsOperation from "./MusaicPcsOperation";
import IsMotifStabilizer from "./IsMotifStabilizer";

export default class Stabilizer {

  constructor({fixedPcs = [], operations = []} = {}) {
    this.fixedPcs = fixedPcs
    this.operations = operations;
    this.sumT = 0
    this.metaStabilizer = "";
    this.shortName = ""
    this._hashCode = null
    this.sumT = this.computeSumTNear0();
  }

  /**
   * if n = 12, 9 and 3 are both as close as possible from zero
   *
   * @return {int} sum of step near zero of t
   */
  computeSumTNear0() {
    let sum = 0;
    if (this.operations.length > 0) {
      let delta = this.operations[0].n / 2

      this.operations.forEach((op) => {
        if (op.t > delta)
          sum += op.n - op.t;
        else
          sum += op.t;
        // T10 greater than T2 ? T6 = 6 see Orbit N°74
      })
    }
    return sum;
  }

  addOperation(op) {
    if (!this.operations.find(o => o.getHashCode() === op.getHashCode())) {
      this.operations.push(op);
      this.sumT = this.computeSumTNear0();
      this.operations.sort(MusaicPcsOperation.compareTo);
      this.metaStabilizer = null;
      this._shortName = null;
      this._hashCode = null
      this._isMotifStabilizer = ""
    }
  }

  addFixedPcs(ipcs) {
    if (!this.fixedPcs.find(p => p.id() === ipcs.id())) {
      this.fixedPcs.push(ipcs)
      // this._hashCode = null
    }
  }

  toString() {
    return "Stab = " + this.operations + " #FixedPcs :" + this.fixedPcs.length;
  }

  hashCode() {
    if (!this._hashCode) {
      this._hashCode = Utils.stringHashCode(this.getName())
    }
    return this._hashCode
  }

  // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  arraysEqual(a, b) {
    /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their
        elements are pairwise == to each other recursively under this
        definition.
    */
    if (a instanceof Array && b instanceof Array) {
      if (a.length !== b.length)  // assert same length
        return false;
      for (let i = 0; i < a.length; i++)  // assert each element equal
        if (!this.arraysEqual(a[i], b[i]))
          return false;
      return true;
    } else {
      return a === b;  // if not both arrays, should be the same
    }
  }

  equals(obj) {
    if (this === obj)
      return true;
    if (obj === null)
      return false;
    if (!(obj instanceof Stabilizer))
      return false;
    if (this.operations == null) {
      if (obj.operations != null)
        return false;
    } else if (!this.arraysEqual(this.operations, obj.operations))
      return false;
    return true;
  }

  get motifStabilizer() {
    if (! this._isMotifStabilizer) {
      this._isMotifStabilizer = new IsMotifStabilizer(this.reduceNameByIgnoreTransp())
    }
    return this._isMotifStabilizer
  }

  /**
   * Reduce String name by delete ref to Transposition operation and no
   * duplication examples :
   *
   * <pre>
   * <ul>
   * <li>M1-T0 => M1</li>
   * <li>M1-T1 => M1</li>
   * <li>M1-T3, M1-T4, CM1-T11, CM7-T0 => M1,CM1,CM7 (no duplication)</li>
   * </ul>
   * </pre>
   * @precondition this.operations is sorted
   * @return {string}  name signature without T op
   */
  reduceNameByIgnoreTransp() {
    let res = "";
    let prec = null;
    this.operations.forEach(op => {
      let motif = op.toStringWithoutTransp();
      if (motif !== prec) {
        prec = motif;
        if (res.length >0)
          res += ",";
        res = res + op.toStringWithoutTransp();
      }
    })
    return res;
  }

/*
  public Fix getFix() {
    return fixedPcs;
  }

  public void setOperations(List<MusaicPcsOperation> operations) {
    this.operations = operations;
    metaStabilizer = null;
    _shortName = null;
  }
  */
  cardinal() {
    return this.operations.length;
  }

  clear() {
    this.operations = []
    this.fixedPcs = []
    this.metaStabilizer = null;
    this._shortName = null;
    this._hashCode = null;
    this._isMotifStabilizer = ""
  }

  compareTo(otherStab) {
    // return this.getName().compareTo(o.getName());
    return Stabilizer.compare(this, otherStab)
  }

  static compare(stab1, stab2) {
    let cmp = 0 // stab1.operations.length - stab2.operations.length
    if (cmp ===0) {
      for (let i = 0; i < stab1.operations.length; i++) {
        let op = stab1.operations[i]
        if (i < stab2.operations.length) {
          cmp = op.compare(stab2.operations[i]);
          if (cmp !== 0)
            // and x.operations.length compare ?
            return cmp;
        }
      }
    }
    return cmp;
  }

  /*
  public MetaStabilizer getMetaStabilizer() {
    if (metaStabilizer == null)
      metaStabilizer = new MetaStabilizer(reduceByIgnoreTransp());
    return metaStabilizer;
  }
  */

  getName() {
    let res = "";
    this.operations.forEach(op => res = res + " " + op.toString());
    return res;
    // return this.getShortName() + "";
  }

  getShortName() {
    if (this._shortName == null)
      this._shortName = this.makeShortName();
    return this._shortName;
  }

  /**
   * get short name of recure operations
   * CM1-T0 CM1-T4 CM1-T8 => M1-T0~4*
   * CM1-T3 CM1-T9 => M1-T3~6*
   * CM1-T1 CM1-T3 CM1-T5 CM1-T7 CM1-T9 CM1-T11 => CM1-T1~2*
   * M1-T0 M11-T1 => M1-T0 M11-T1
   * @return {string} short name if possible
   */
  makeShortName() {
    // key="CM5"=, values=[2,4,6] for value of transposition/translation for CM5-T2, CM5-T4, etc.
    // Map<String, List<Integer>> mt = new HashMap<String, List<Integer>>();
    let mt = new Map()
    let isMotifOp = false;
    // assert in : operations is sorted
    this.operations.forEach(op => {
      let nameOp = (op.complement ? "CM" : "M") + op.a;
      if (!mt.has(nameOp)) {
        mt.set(nameOp, []);
      }
      /*
      if (!(op instanceof MusaicMotifOperation) && !isMotifOp) {
        mt.get(nameOp).push(op.t);
      } else {
        isMotifOp = true;
      }
      */
    })

    let res = "";
    let nameOps = Array.from(mt.keys())
    nameOps.sort((o1, o2) => {
      let cplt1 = o1.charAt(0) === 'C';
      let cplt2 = o2.charAt(0) === 'C';
      let w1;
      let w2;
      if (cplt1)
        w1 = 100 + parseInt(o1.substring(2));
      else
        w1 = parseInt(o1.substring(1));

      if (cplt2)
        w2 = 100 + parseInt(o2.substring(2));
      else
        w2 = parseInt(o2.substring(1));

      return w1 - w2;
    })

    // System.out.println("ops :" + Arrays.toString(nameOps));
    nameOps.forEach(nameOp => {
      let shortName = this.tryReduceListByShortName(mt.get(nameOp)) + "";

      if (shortName.length > 0) {
        if (res.length > 0) {
          res += " ";
        }
        res += nameOp + shortName;
      }
      // put -Tx only if a
      mt.get(nameOp).forEach(a => {
        if (res.length > 0) {
          res += " ";
        }
        res += nameOp + "-T" + a;
      })
    })
    return res;
  }

  tryReduceListByShortName(lista) {
    //TODO
    return lista[0]
  }

  /**
   * If recurrence transposition step, reduce this by "Ta~step" Example : n=12
   * [0, 2, 4, 6, 8, 10] return "-T0~2" and empty list Example : n=12 [0, 3]
   * return "" and no action on list
   *
   * @param list
   *           of a (all a value of T) in-out
   * @return String reduce name and reduce list or null and same list
   */

  /*
  private String tryReduceListByShortName(List<Integer> lista) {
    String shortName = "";

    if (lista.size() > 1) {

      boolean multiple = true;

      // get n for modulo below
      int n = operations.get(0).n;

      int step = lista.get(1) - lista.get(0);
      int cpt = 1;
      for (int i = 1; i < lista.size(); i++) {
        if (!lista.contains((lista.get(i) + step) % n)) {
          // multiple = false;
          // break;
        } else {
          cpt++;
        }
      }
      if (multiple && cpt * step == n) {
        shortName = "-T" + lista.get(0) + "~" + step + "*";
        // delete multipe of step element of the list
        // System.out.println("Before remove : step=" + step + " size=" +
        // list.size() + " " + list);

        Integer racineValue = lista.get(0);
        lista.remove(0);
        for (int i = 0; i < lista.size(); i++) {
          Integer value = lista.get(i) - racineValue;
          if (value % step == 0)
            if (lista.remove(lista.get(i))) {
              i -= 1;
            }
        }
        // System.out.println("After remove : step=" + step + " size=" +
        // list.size() + " " + list);
      }

    }
    return shortName;
  }
  */

  /**
   * get if set operations is subset of this
   * @param {Array} ops array of MusaicPcsOperation
   * @return {Boolean} true if ops in this.operations
   */
  isInclude(ops) {
    let includ = true;
    ops.forEach(op => {
      if (!this.operations.find(o => o.equals(op))) {
        includ = false;
      }
    });
    return includ;
  }

}

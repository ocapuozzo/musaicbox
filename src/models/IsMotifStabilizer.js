/**
 * Copyright (c) 2019. Olivier Capuozzo
 */

import Utils from "../utils/Utils";

export default class IsMetaStabilizer  {

  static nullObject = new IsMetaStabilizer("")
  static MAXLENGTH = 25;

  constructor(name) {
    this.name = name;
    this.metaStabOperations = this.name.split(",");
  }

  /*
public String getIconFileName() {
  return iconFileName;
}

public void setIconFileName(String iconFileName) {
  this.iconFileName = iconFileName;
}
*/

toString() {
  // if (name.length()>MAXLENGTH*2.5)
  // return getMiniName() + " [" + nbViews + "]";
  return this.name;// + "__" + nbViews + "__";
}

getMiniName() {
  if (name.length() > IsMetaStabilizer.MAXLENGTH)
    return name.substring(0, 12) + "...";
  return name;
}

equals(obj) {
  if (obj instanceof IsMetaStabilizer) {
    if (obj === this)
      return true;
    return this.name.equals(obj.name);
  }
  return false;
}

hashCode() {
    if (!this._hashCode) {
      this._hashCode = Utils.stringHashCode(this.name)
    }
    return this._hashCode
 }


// TODO test unit + optimize !!!
/**
 * M < C Ma < M(a+1) CMa < CM(a+1) Ma < CM(a-1)
 */
compareTo(o1, o2) {
  let cmp = o1.metaStabOperations.length - o2.metaStabOperations.length;
  if (cmp == 0) {
    for (let i = 0; i < o1.metaStabOperations.length; i++) {
      if (o2.metaStabOperations[i].startsWith("C")) {
        if (!o1.metaStabOperations[i].startsWith("C"))
          return -1;
      } else {
        if (o1.metaStabOperations[i].startsWith("C"))
          return 1;
      }

      let ia1 = o1.metaStabOperations[i].startsWith("C") ? 2 : 1;
      let ia2 = o2.metaStabOperations[i].startsWith("C") ? 2 : 1;
      let a1;
      let a2;
      a1 = parseInt(o1.metaStabOperations[i].substring(ia1));
      if (isNaN(a1)){
        a1 = 0;
      }

      a2 = parseInt(o2.metaStabOperations[i].substring(ia2));
      if (isNaN(a2)) {
        a2 = 0;
      }
      // should compare this only if ia2==ia1 ?
      cmp = a1 - a2;
      if (cmp !== 0)
        return cmp;
    }

    return o1.name.compareTo(o2.name);
  }
  return cmp;
}
/*
public boolean contains(String metaStabOp) {
  for (String op : metaStabOperations)
  if (op.equals(metaStabOp))
    return true;
  return false;
}
*/

}

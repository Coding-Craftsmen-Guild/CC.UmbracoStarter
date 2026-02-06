var Er = Object.defineProperty;
var br = (r, e, t) => e in r ? Er(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var tn = (r, e, t) => (br(r, typeof e != "symbol" ? e + "" : e, t), t);
import { UmbTiptapExtensionApiBase as Cr } from "@umbraco-cms/backoffice/tiptap";
import D, { forwardRef as Or, createContext as Nn, useContext as Tr } from "react";
import Mr, { flushSync as Ar } from "react-dom";
function j(r) {
  this.content = r;
}
j.prototype = {
  constructor: j,
  find: function(r) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === r)
        return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(r) {
    var e = this.find(r);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(r, e, t) {
    var n = t && t != r ? this.remove(t) : this, i = n.find(r), o = n.content.slice();
    return i == -1 ? o.push(t || r, e) : (o[i + 1] = e, t && (o[i] = t)), new j(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(r) {
    var e = this.find(r);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new j(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(r, e) {
    return new j([r, e].concat(this.remove(r).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(r, e) {
    var t = this.remove(r).content.slice();
    return t.push(r, e), new j(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(r, e, t) {
    var n = this.remove(e), i = n.content.slice(), o = n.find(r);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new j(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(r) {
    for (var e = 0; e < this.content.length; e += 2)
      r(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(r) {
    return r = j.from(r), r.size ? new j(r.content.concat(this.subtract(r).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(r) {
    return r = j.from(r), r.size ? new j(this.subtract(r).content.concat(r.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(r) {
    var e = this;
    r = j.from(r);
    for (var t = 0; t < r.content.length; t += 2)
      e = e.remove(r.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var r = {};
    return this.forEach(function(e, t) {
      r[e] = t;
    }), r;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
j.from = function(r) {
  if (r instanceof j)
    return r;
  var e = [];
  if (r)
    for (var t in r)
      e.push(t, r[t]);
  return new j(e);
};
function Rn(r, e, t) {
  for (let n = 0; ; n++) {
    if (n == r.childCount || n == e.childCount)
      return r.childCount == e.childCount ? null : t;
    let i = r.child(n), o = e.child(n);
    if (i == o) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return t;
    if (i.isText && i.text != o.text) {
      for (let s = 0; i.text[s] == o.text[s]; s++)
        t++;
      return t;
    }
    if (i.content.size || o.content.size) {
      let s = Rn(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function In(r, e, t, n) {
  for (let i = r.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: n };
    let s = r.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, n -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: n };
    if (s.isText && s.text != l.text) {
      let c = 0, u = Math.min(s.text.length, l.text.length);
      for (; c < u && s.text[s.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, n--;
      return { a: t, b: n };
    }
    if (s.content.size || l.content.size) {
      let c = In(s.content, l.content, t - 1, n - 1);
      if (c)
        return c;
    }
    t -= a, n -= a;
  }
}
class w {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let n = 0; n < e.length; n++)
        this.size += e[n].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, n, i = 0, o) {
    for (let s = 0, l = 0; l < t; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && n(a, i + l, o || null, s) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), n, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, n, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && n && (s ? s = !1 : o += n), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, n = e.firstChild, i = this.content.slice(), o = 0;
    for (t.isText && t.sameMarkup(n) && (i[i.length - 1] = t.withText(t.text + n.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new w(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let n = [], i = 0;
    if (t > e)
      for (let o = 0, s = 0; s < t; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), n.push(l), i += l.nodeSize), s = a;
      }
    return new w(n, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? w.empty : e == 0 && t == this.content.length ? this : new w(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let n = this.content[e];
    if (n == t)
      return this;
    let i = this.content.slice(), o = this.size + t.nodeSize - n.nodeSize;
    return i[e] = t, new w(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new w([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new w(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, n = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, n, t), n += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Rn(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, n = e.size) {
    return In(this, e, t, n);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return We(0, e);
    if (e == this.size)
      return We(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, n = 0; ; t++) {
      let i = this.child(t), o = n + i.nodeSize;
      if (o >= e)
        return o == e ? We(t + 1, o) : We(t, n);
      n = o;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return w.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new w(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return w.empty;
    let t, n = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      n += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new w(t || e, n);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return w.empty;
    if (e instanceof w)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new w([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
w.empty = new w([], 0);
const pt = { index: 0, offset: 0 };
function We(r, e) {
  return pt.index = r, pt.offset = e, pt;
}
function Xe(r, e) {
  if (r === e)
    return !0;
  if (!(r && typeof r == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(r);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (r.length != e.length)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (!Xe(r[n], e[n]))
        return !1;
  } else {
    for (let n in r)
      if (!(n in e) || !Xe(r[n], e[n]))
        return !1;
    for (let n in e)
      if (!(n in r))
        return !1;
  }
  return !0;
}
class z {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, n = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        t || (t = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !n && o.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), n = !0), t && t.push(o);
      }
    }
    return t || (t = e.slice()), n || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && Xe(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let n = e.marks[t.type];
    if (!n)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = n.create(t.attrs);
    return n.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (!e[n].eq(t[n]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return z.none;
    if (e instanceof z)
      return [e];
    let t = e.slice();
    return t.sort((n, i) => n.type.rank - i.type.rank), t;
  }
}
z.none = [];
class Ze extends Error {
}
class E {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, n) {
    this.content = e, this.openStart = t, this.openEnd = n;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let n = Bn(this.content, e + this.openStart, t);
    return n && new E(n, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new E(zn(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return E.empty;
    let n = t.openStart || 0, i = t.openEnd || 0;
    if (typeof n != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new E(w.fromJSON(e, t.content), n, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let n = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.firstChild)
      n++;
    for (let o = e.lastChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new E(e, n, i);
  }
}
E.empty = new E(w.empty, 0, 0);
function zn(r, e, t) {
  let { index: n, offset: i } = r.findIndex(e), o = r.maybeChild(n), { index: s, offset: l } = r.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !r.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return r.cut(0, e).append(r.cut(t));
  }
  if (n != s)
    throw new RangeError("Removing non-flat range");
  return r.replaceChild(n, o.copy(zn(o.content, e - i - 1, t - i - 1)));
}
function Bn(r, e, t, n) {
  let { index: i, offset: o } = r.findIndex(e), s = r.maybeChild(i);
  if (o == e || s.isText)
    return n && !n.canReplace(i, i, t) ? null : r.cut(0, e).append(t).append(r.cut(e));
  let l = Bn(s.content, e - o - 1, t, s);
  return l && r.replaceChild(i, s.copy(l));
}
function Nr(r, e, t) {
  if (t.openStart > r.depth)
    throw new Ze("Inserted content deeper than insertion position");
  if (r.depth - t.openStart != e.depth - t.openEnd)
    throw new Ze("Inconsistent open depths");
  return Pn(r, e, t, 0);
}
function Pn(r, e, t, n) {
  let i = r.index(n), o = r.node(n);
  if (i == e.index(n) && n < r.depth - t.openStart) {
    let s = Pn(r, e, t, n + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && r.depth == n && e.depth == n) {
      let s = r.parent, l = s.content;
      return me(s, l.cut(0, r.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Rr(t, r);
      return me(o, Dn(r, s, l, e, n));
    }
  else
    return me(o, Qe(r, e, n));
}
function _n(r, e) {
  if (!e.type.compatibleContent(r.type))
    throw new Ze("Cannot join " + e.type.name + " onto " + r.type.name);
}
function Ot(r, e, t) {
  let n = r.node(t);
  return _n(n, e.node(t)), n;
}
function pe(r, e) {
  let t = e.length - 1;
  t >= 0 && r.isText && r.sameMarkup(e[t]) ? e[t] = r.withText(e[t].text + r.text) : e.push(r);
}
function _e(r, e, t, n) {
  let i = (e || r).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  r && (o = r.index(t), r.depth > t ? o++ : r.textOffset && (pe(r.nodeAfter, n), o++));
  for (let l = o; l < s; l++)
    pe(i.child(l), n);
  e && e.depth == t && e.textOffset && pe(e.nodeBefore, n);
}
function me(r, e) {
  return r.type.checkContent(e), r.copy(e);
}
function Dn(r, e, t, n, i) {
  let o = r.depth > i && Ot(r, e, i + 1), s = n.depth > i && Ot(t, n, i + 1), l = [];
  return _e(null, r, i, l), o && s && e.index(i) == t.index(i) ? (_n(o, s), pe(me(o, Dn(r, e, t, n, i + 1)), l)) : (o && pe(me(o, Qe(r, e, i + 1)), l), _e(e, t, i, l), s && pe(me(s, Qe(t, n, i + 1)), l)), _e(n, null, i, l), new w(l);
}
function Qe(r, e, t) {
  let n = [];
  if (_e(null, r, t, n), r.depth > t) {
    let i = Ot(r, e, t + 1);
    pe(me(i, Qe(r, e, t + 1)), n);
  }
  return _e(e, null, t, n), new w(n);
}
function Rr(r, e) {
  let t = e.depth - r.openStart, i = e.node(t).copy(r.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(w.from(i));
  return {
    start: i.resolveNoCache(r.openStart + t),
    end: i.resolveNoCache(i.content.size - r.openEnd - t)
  };
}
class Le {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.pos = e, this.path = t, this.parentOffset = n, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let n = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return n ? e.child(t).cut(n) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let n = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += n.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return z.none;
    if (this.textOffset)
      return e.child(t).marks;
    let n = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!n) {
      let l = n;
      n = i, i = l;
    }
    let o = n.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let n = t.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < n.length; o++)
      n[o].type.spec.inclusive === !1 && (!i || !n[o].isInSet(i.marks)) && (n = n[o--].removeFromSet(n));
    return n;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let n = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); n >= 0; n--)
      if (e.pos <= this.end(n) && (!t || t(this.node(n))))
        return new et(this, e, n);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let n = [], i = 0, o = t;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (n.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new Le(t, n, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let n = nn.get(e);
    if (n)
      for (let o = 0; o < n.elts.length; o++) {
        let s = n.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      nn.set(e, n = new Ir());
    let i = n.elts[n.i] = Le.resolve(e, t);
    return n.i = (n.i + 1) % zr, i;
  }
}
class Ir {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const zr = 12, nn = /* @__PURE__ */ new WeakMap();
class et {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, n) {
    this.$from = e, this.$to = t, this.depth = n;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Br = /* @__PURE__ */ Object.create(null);
let ge = class Tt {
  /**
  @internal
  */
  constructor(e, t, n, i = z.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = n || w.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, n, i = 0) {
    this.content.nodesBetween(e, t, n, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, n, i) {
    return this.content.textBetween(e, t, n, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, n) {
    return this.type == e && Xe(this.attrs, t || e.defaultAttrs || Br) && z.sameSet(this.marks, n || z.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Tt(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Tt(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, n = !1) {
    if (e == t)
      return E.empty;
    let i = this.resolve(e), o = this.resolve(t), s = n ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new E(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, n) {
    return Nr(this.resolve(e), this.resolve(t), n);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: n, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(n), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: n } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: n };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: n } = this.content.findIndex(e);
    if (n < e)
      return { node: this.content.child(t), index: t, offset: n };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: n - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return Le.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Le.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, n) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (o) => (n.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Fn(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, n = w.empty, i = 0, o = n.childCount) {
    let s = this.contentMatchAt(e).matchFragment(n, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(n.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, n, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(n), s = o && o.matchFragment(this.content, t);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = z.none;
    for (let t = 0; t < this.marks.length; t++) {
      let n = this.marks[t];
      n.type.checkAttrs(n.attrs), e = n.addToSet(e);
    }
    if (!z.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let n;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      n = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, n);
    }
    let i = w.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, n);
    return o.type.checkAttrs(o.attrs), o;
  }
};
ge.prototype.text = void 0;
class tt extends ge {
  /**
  @internal
  */
  constructor(e, t, n, i) {
    if (super(e, t, null, i), !n)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = n;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Fn(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new tt(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new tt(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function Fn(r, e) {
  for (let t = r.length - 1; t >= 0; t--)
    e = r[t].type.name + "(" + e + ")";
  return e;
}
class ye {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let n = new Pr(e, t);
    if (n.next == null)
      return ye.empty;
    let i = Ln(n);
    n.next && n.err("Unexpected trailing text");
    let o = Jr(Vr(i));
    return $r(o, n), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, n = e.childCount) {
    let i = this;
    for (let o = t; i && o < n; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let n = 0; n < e.next.length; n++)
        if (this.next[t].type == e.next[n].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, n = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, n);
      if (a && (!t || a.validEnd))
        return w.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: h } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(h) == -1) {
          i.push(h);
          let d = o(h, l.concat(u));
          if (d)
            return d;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let n = 0; n < this.wrapCache.length; n += 2)
      if (this.wrapCache[n] == e)
        return this.wrapCache[n + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), n = [{ match: this, type: null, via: null }];
    for (; n.length; ) {
      let i = n.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (n.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(n) {
      e.push(n);
      for (let i = 0; i < n.next.length; i++)
        e.indexOf(n.next[i].next) == -1 && t(n.next[i].next);
    }
    return t(this), e.map((n, i) => {
      let o = i + (n.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < n.next.length; s++)
        o += (s ? ", " : "") + n.next[s].type.name + "->" + e.indexOf(n.next[s].next);
      return o;
    }).join(`
`);
  }
}
ye.empty = new ye(!0);
class Pr {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Ln(r) {
  let e = [];
  do
    e.push(_r(r));
  while (r.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function _r(r) {
  let e = [];
  do
    e.push(Dr(r));
  while (r.next && r.next != ")" && r.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Dr(r) {
  let e = jr(r);
  for (; ; )
    if (r.eat("+"))
      e = { type: "plus", expr: e };
    else if (r.eat("*"))
      e = { type: "star", expr: e };
    else if (r.eat("?"))
      e = { type: "opt", expr: e };
    else if (r.eat("{"))
      e = Fr(r, e);
    else
      break;
  return e;
}
function rn(r) {
  /\D/.test(r.next) && r.err("Expected number, got '" + r.next + "'");
  let e = Number(r.next);
  return r.pos++, e;
}
function Fr(r, e) {
  let t = rn(r), n = t;
  return r.eat(",") && (r.next != "}" ? n = rn(r) : n = -1), r.eat("}") || r.err("Unclosed braced range"), { type: "range", min: t, max: n, expr: e };
}
function Lr(r, e) {
  let t = r.nodeTypes, n = t[e];
  if (n)
    return [n];
  let i = [];
  for (let o in t) {
    let s = t[o];
    s.isInGroup(e) && i.push(s);
  }
  return i.length == 0 && r.err("No node type or group '" + e + "' found"), i;
}
function jr(r) {
  if (r.eat("(")) {
    let e = Ln(r);
    return r.eat(")") || r.err("Missing closing paren"), e;
  } else if (/\W/.test(r.next))
    r.err("Unexpected token '" + r.next + "'");
  else {
    let e = Lr(r, r.next).map((t) => (r.inline == null ? r.inline = t.isInline : r.inline != t.isInline && r.err("Mixing inline and block content"), { type: "name", value: t }));
    return r.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Vr(r) {
  let e = [[]];
  return i(o(r, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function n(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return n(l, a), i(o(s.expr, a), a), [n(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [n(a)];
    } else {
      if (s.type == "opt")
        return [n(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let u = t();
          i(o(s.expr, a), u), a = u;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = t();
            n(a, u), i(o(s.expr, a), u), a = u;
          }
        return [n(a)];
      } else {
        if (s.type == "name")
          return [n(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function jn(r, e) {
  return e - r;
}
function on(r, e) {
  let t = [];
  return n(e), t.sort(jn);
  function n(i) {
    let o = r[i];
    if (o.length == 1 && !o[0].term)
      return n(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && n(a);
    }
  }
}
function Jr(r) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(on(r, 0));
  function t(n) {
    let i = [];
    n.forEach((s) => {
      r[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        on(r, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[n.join(",")] = new ye(n.indexOf(r.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(jn);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function $r(r, e) {
  for (let t = 0, n = [r]; t < n.length; t++) {
    let i = n[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), n.indexOf(c) == -1 && n.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Vn(r) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in r) {
    let n = r[t];
    if (!n.hasDefault)
      return null;
    e[t] = n.default;
  }
  return e;
}
function Jn(r, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n in r) {
    let i = e && e[n];
    if (i === void 0) {
      let o = r[n];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + n);
    }
    t[n] = i;
  }
  return t;
}
function $n(r, e, t, n) {
  for (let i in e)
    if (!(i in r))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${i}`);
  for (let i in r) {
    let o = r[i];
    o.validate && o.validate(e[i]);
  }
}
function Wn(r, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let n in e)
      t[n] = new Ur(r, n, e[n]);
  return t;
}
class nt {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.name = e, this.schema = t, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = Wn(e, n.attrs), this.defaultAttrs = Vn(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == ye.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : Jn(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, n) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new ge(this, this.computeAttrs(e), w.from(t), z.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, n) {
    return t = w.from(t), this.checkContent(t), new ge(this, this.computeAttrs(e), t, z.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, n) {
    if (e = this.computeAttrs(e), t = w.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(w.empty, !0);
    return o ? new ge(this, e, t.append(o), z.setFrom(n)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let n = 0; n < e.childCount; n++)
      if (!this.allowsMarks(e.child(n).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    $n(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let n = 0; n < e.length; n++)
      this.allowsMarkType(e[n].type) ? t && t.push(e[n]) : t || (t = e.slice(0, n));
    return t ? t.length ? t : z.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let n = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => n[o] = new nt(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!n[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!n.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in n.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return n;
  }
}
function Wr(r, e, t) {
  let n = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (n.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${n} for attribute ${e} on type ${r}, got ${o}`);
  };
}
class Ur {
  constructor(e, t, n) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? Wr(e, t, n.validate) : n.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class It {
  /**
  @internal
  */
  constructor(e, t, n, i) {
    this.name = e, this.rank = t, this.schema = n, this.spec = i, this.attrs = Wn(e, i.attrs), this.excluded = null;
    let o = Vn(this.attrs);
    this.instance = o ? new z(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new z(this, Jn(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let n = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => n[o] = new It(o, i++, t, s)), n;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    $n(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class qr {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = j.from(e.nodes), t.marks = j.from(e.marks || {}), this.nodes = nt.compile(this.spec.nodes, this), this.marks = It.compile(this.spec.marks, this);
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = n[s] || (n[s] = ye.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? sn(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : sn(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => ge.fromJSON(this, i), this.markFromJSON = (i) => z.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, n, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof nt) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, n, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let n = this.nodes.text;
    return new tt(n, n.defaultAttrs, e, z.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function sn(r, e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let i = e[n], o = r.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in r.marks) {
        let a = r.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[n] + "'");
  }
  return t;
}
function Hr(r) {
  return r.tag != null;
}
function Gr(r) {
  return r.style != null;
}
class be {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let n = this.matchedStyles = [];
    t.forEach((i) => {
      if (Hr(i))
        this.tags.push(i);
      else if (Gr(i)) {
        let o = /[^=]*/.exec(i.style)[0];
        n.indexOf(o) < 0 && n.push(o), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let o = e.nodes[i.node];
      return o.contentMatch.matchType(o);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let n = new an(this, t, !1);
    return n.addAll(e, z.none, t.from, t.to), n.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let n = new an(this, t, !0);
    return n.addAll(e, z.none, t.from, t.to), E.maxOpen(n.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, n) {
    for (let i = n ? this.tags.indexOf(n) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Xr(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, n, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !n.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (s.getAttrs) {
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function n(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < t.length; s++) {
        let l = t[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      t.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        n(s = cn(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        n(s = cn(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new be(e, be.schemaRules(e)));
  }
}
const Un = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Kr = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, qn = { ol: !0, ul: !0 }, je = 1, Mt = 2, De = 4;
function ln(r, e, t) {
  return e != null ? (e ? je : 0) | (e === "full" ? Mt : 0) : r && r.whitespace == "pre" ? je | Mt : t & ~De;
}
class Ue {
  constructor(e, t, n, i, o, s) {
    this.type = e, this.attrs = t, this.marks = n, this.solid = i, this.options = s, this.content = [], this.activeMarks = z.none, this.match = o || (s & De ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(w.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let n = this.type.contentMatch, i;
        return (i = n.findWrapping(e.type)) ? (this.match = n, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & je)) {
      let n = this.content[this.content.length - 1], i;
      if (n && n.isText && (i = /[ \t\r\n\u000c]+$/.exec(n.text))) {
        let o = n;
        n.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = w.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(w.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Un.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class an {
  constructor(e, t, n) {
    this.parser = e, this.options = t, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = ln(null, t.preserveWhitespace, 0) | (n ? De : 0);
    i ? o = new Ue(i.type, i.attrs, z.none, !0, t.topMatch || i.type.contentMatch, s) : n ? o = new Ue(null, null, z.none, !0, null, s) : o = new Ue(e.schema.topNodeType, null, z.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let n = e.nodeValue, i = this.top, o = i.options & Mt ? "full" : this.localPreserveWS || (i.options & je) > 0, { schema: s } = this.parser;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(n)) {
      if (o)
        if (o === "full")
          n = n.replace(/\r\n?/g, `
`);
        else if (s.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(s.linebreakReplacement.create())) {
          let l = n.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(s.linebreakReplacement.create(), t, !0), l[a] && this.insertNode(s.text(l[a]), t, !/\S/.test(l[a]));
          n = "";
        } else
          n = n.replace(/\r?\n|\r/g, " ");
      else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (n = n.slice(1));
      }
      n && this.insertNode(s.text(n), t, !/\S/.test(n)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, n) {
    let i = this.localPreserveWS, o = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let s = e.nodeName.toLowerCase(), l;
    qn.hasOwnProperty(s) && this.parser.normalizeLists && Yr(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, n));
    e:
      if (a ? a.ignore : Kr.hasOwnProperty(s))
        this.findInside(e), this.ignoreFallback(e, t);
      else if (!a || a.skip || a.closeParent) {
        a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
        let c, u = this.needsBlock;
        if (Un.hasOwnProperty(s))
          o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
        else if (!e.firstChild) {
          this.leafFallback(e, t);
          break e;
        }
        let h = a && a.skip ? t : this.readStyles(e, t);
        h && this.addAll(e, h), c && this.sync(o), this.needsBlock = u;
      } else {
        let c = this.readStyles(e, t);
        c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
      }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let n = e.style;
    if (n && n.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let o = this.parser.matchedStyles[i], s = n.getPropertyValue(o);
        if (s)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, n, i) {
    let o, s;
    if (t.node)
      if (s = this.parser.schema.nodes[t.node], s.isLeaf)
        this.insertNode(s.create(t.attrs), n, e.nodeName == "BR") || this.leafFallback(e, n);
      else {
        let a = this.enter(s, t.attrs || null, n, t.preserveWhitespace);
        a && (o = !0, n = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      n = n.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, n, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, n, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, n), this.findAround(e, a, !1);
    }
    o && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, n, i) {
    let o = n || 0;
    for (let s = n ? e.childNodes[n] : e.firstChild, l = i == null ? null : e.childNodes[i]; s != l; s = s.nextSibling, ++o)
      this.findAtPoint(e, o), this.addDOM(s, t);
    this.findAtPoint(e, o);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, n) {
    let i, o;
    for (let s = this.open, l = 0; s >= 0; s--) {
      let a = this.nodes[s], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, o = a, !c.length))
        break;
      if (a.solid) {
        if (n)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(o);
    for (let s = 0; s < i.length; s++)
      t = this.enterInner(i[s], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, n) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let o = this.textblockFromContext();
      o && (t = this.enterInner(o, null, t));
    }
    let i = this.findPlace(e, t, n);
    if (i) {
      this.closeExtra();
      let o = this.top;
      o.match && (o.match = o.match.matchType(e.type));
      let s = z.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : un(l.type, e.type)) && (s = l.addToSet(s));
      return o.content.push(e.mark(s)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, n, i) {
    let o = this.findPlace(e.create(t), n, !1);
    return o && (o = this.enterInner(e, t, n, !0, i)), o;
  }
  // Open a node of the given type
  enterInner(e, t, n, i = !1, o) {
    this.closeExtra();
    let s = this.top;
    s.match = s.match && s.match.matchType(e);
    let l = ln(e, o, s.options);
    s.options & De && s.content.length == 0 && (l |= De);
    let a = z.none;
    return n = n.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : un(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Ue(e, t, a, i, null, l)), this.open++, n;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= je);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let n = this.nodes[t].content;
      for (let i = n.length - 1; i >= 0; i--)
        e += n[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == e && this.find[n].offset == t && (this.find[n].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, n) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (n ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), n = this.options.context, i = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), o = -(n ? n.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : n && a >= o ? n.node(a - o).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let n = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (n && n.isTextblock && n.defaultAttrs)
          return n;
      }
    for (let t in this.parser.schema.nodes) {
      let n = this.parser.schema.nodes[t];
      if (n.isTextblock && n.defaultAttrs)
        return n;
    }
  }
}
function Yr(r) {
  for (let e = r.firstChild, t = null; e; e = e.nextSibling) {
    let n = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    n && qn.hasOwnProperty(n) && t ? (t.appendChild(e), e = t) : n == "li" ? t = e : n && (t = null);
  }
}
function Xr(r, e) {
  return (r.matches || r.msMatchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector).call(r, e);
}
function cn(r) {
  let e = {};
  for (let t in r)
    e[t] = r[t];
  return e;
}
function un(r, e) {
  let t = e.schema.nodes;
  for (let n in t) {
    let i = t[n];
    if (!i.allowsMarkType(r))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Hn = 65535, Gn = Math.pow(2, 16);
function Zr(r, e) {
  return r + e * Gn;
}
function fn(r) {
  return r & Hn;
}
function Qr(r) {
  return (r - (r & Hn)) / Gn;
}
const Kn = 1, Yn = 2, Ke = 4, Xn = 8;
class hn {
  /**
  @internal
  */
  constructor(e, t, n) {
    this.pos = e, this.delInfo = t, this.recover = n;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Xn) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Kn | Ke)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Yn | Ke)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Ke) > 0;
  }
}
class H {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && H.empty)
      return H.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, n = fn(e);
    if (!this.inverted)
      for (let i = 0; i < n; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[n * 3] + t + Qr(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, n) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = this.ranges[l + s], h = a + c;
      if (e <= h) {
        let d = c ? e == a ? -1 : e == h ? 1 : t : t, p = a + i + (d < 0 ? 0 : u);
        if (n)
          return p;
        let g = e == (t < 0 ? a : h) ? null : Zr(l / 3, e - a), m = e == a ? Yn : e == h ? Kn : Ke;
        return (t < 0 ? e != a : e != h) && (m |= Xn), new hn(p, m, g);
      }
      i += u - c;
    }
    return n ? e + i : new hn(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let n = 0, i = fn(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? n : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      n += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], u = this.ranges[i + n];
      e(l, l + c, a, a + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new H(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? H.empty : new H(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
H.empty = new H([]);
const mt = /* @__PURE__ */ Object.create(null);
class $ {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return H.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let n = mt[t.stepType];
    if (!n)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return n.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in mt)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return mt[e] = t, t.prototype.jsonID = e, t;
  }
}
class F {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new F(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new F(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, n, i) {
    try {
      return F.ok(e.replace(t, n, i));
    } catch (o) {
      if (o instanceof Ze)
        return F.fail(o.message);
      throw o;
    }
  }
}
function zt(r, e, t) {
  let n = [];
  for (let i = 0; i < r.childCount; i++) {
    let o = r.child(i);
    o.content.size && (o = o.copy(zt(o.content, e, o))), o.isInline && (o = e(o, t, i)), n.push(o);
  }
  return w.fromArray(n);
}
class ue extends $ {
  /**
  Create a mark step.
  */
  constructor(e, t, n) {
    super(), this.from = e, this.to = t, this.mark = n;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), n = e.resolve(this.from), i = n.node(n.sharedDepth(this.to)), o = new E(zt(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return F.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new fe(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deleted && n.deleted || t.pos >= n.pos ? null : new ue(t.pos, n.pos, this.mark);
  }
  merge(e) {
    return e instanceof ue && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ue(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new ue(t.from, t.to, e.markFromJSON(t.mark));
  }
}
$.jsonID("addMark", ue);
class fe extends $ {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, n) {
    super(), this.from = e, this.to = t, this.mark = n;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), n = new E(zt(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return F.fromReplace(e, this.from, this.to, n);
  }
  invert() {
    return new ue(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deleted && n.deleted || t.pos >= n.pos ? null : new fe(t.pos, n.pos, this.mark);
  }
  merge(e) {
    return e instanceof fe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new fe(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new fe(t.from, t.to, e.markFromJSON(t.mark));
  }
}
$.jsonID("removeMark", fe);
class he extends $ {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return F.fail("No node at mark step's position");
    let n = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return F.fromReplace(e, this.pos, this.pos + 1, new E(w.from(n), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let n = this.mark.addToSet(t.marks);
      if (n.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(n))
            return new he(this.pos, t.marks[i]);
        return new he(this.pos, this.mark);
      }
    }
    return new Ve(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new he(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new he(t.pos, e.markFromJSON(t.mark));
  }
}
$.jsonID("addNodeMark", he);
class Ve extends $ {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return F.fail("No node at mark step's position");
    let n = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return F.fromReplace(e, this.pos, this.pos + 1, new E(w.from(n), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new he(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ve(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Ve(t.pos, e.markFromJSON(t.mark));
  }
}
$.jsonID("removeNodeMark", Ve);
class q extends $ {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, n, i = !1) {
    super(), this.from = e, this.to = t, this.slice = n, this.structure = i;
  }
  apply(e) {
    return this.structure && At(e, this.from, this.to) ? F.fail("Structure replace would overwrite content") : F.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new H([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new q(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1);
    return t.deletedAcross && n.deletedAcross ? null : new q(t.pos, Math.max(t.pos, n.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof q) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? E.empty : new E(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new q(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? E.empty : new E(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new q(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new q(t.from, t.to, E.fromJSON(e, t.slice), !!t.structure);
  }
}
$.jsonID("replace", q);
class U extends $ {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, n, i, o, s, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = n, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (At(e, this.from, this.gapFrom) || At(e, this.gapTo, this.to)))
      return F.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return F.fail("Gap is not a flat range");
    let n = this.slice.insertAt(this.insert, t.content);
    return n ? F.fromReplace(e, this.from, this.to, n) : F.fail("Content does not fit in gap");
  }
  getMap() {
    return new H([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new U(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), n = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? n.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && n.deletedAcross || i < t.pos || o > n.pos ? null : new U(t.pos, n.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new U(t.from, t.to, t.gapFrom, t.gapTo, E.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
$.jsonID("replaceAround", U);
function At(r, e, t) {
  let n = r.resolve(e), i = t - e, o = n.depth;
  for (; i > 0 && o > 0 && n.indexAfter(o) == n.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = n.node(o).maybeChild(n.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function ei(r, e, t) {
  return (e == 0 || r.canReplace(e, r.childCount)) && (t == r.childCount || r.canReplace(0, t));
}
function Te(r) {
  let t = r.parent.content.cutByIndex(r.startIndex, r.endIndex);
  for (let n = r.depth, i = 0, o = 0; ; --n) {
    let s = r.$from.node(n), l = r.$from.index(n) + i, a = r.$to.indexAfter(n) - o;
    if (n < r.depth && s.canReplace(l, a, t))
      return n;
    if (n == 0 || s.type.spec.isolating || !ei(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function Zn(r, e, t = null, n = r) {
  let i = ti(r, e), o = i && ni(n, e);
  return o ? i.map(dn).concat({ type: e, attrs: t }).concat(o.map(dn)) : null;
}
function dn(r) {
  return { type: r, attrs: null };
}
function ti(r, e) {
  let { parent: t, startIndex: n, endIndex: i } = r, o = t.contentMatchAt(n).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(n, i, s) ? o : null;
}
function ni(r, e) {
  let { parent: t, startIndex: n, endIndex: i } = r, o = t.child(n), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = n; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Ce(r, e, t = 1, n) {
  let i = r.resolve(e), o = i.depth - t, s = n && n[n.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let h = i.node(c), d = i.index(c);
    if (h.type.spec.isolating)
      return !1;
    let p = h.content.cutByIndex(d, h.childCount), g = n && n[u + 1];
    g && (p = p.replaceChild(0, g.type.create(g.attrs)));
    let m = n && n[u] || h;
    if (!h.canReplace(d + 1, h.childCount) || !m.type.validContent(p))
      return !1;
  }
  let l = i.indexAfter(o), a = n && n[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function we(r, e) {
  let t = r.resolve(e), n = t.index();
  return Qn(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(n, n + 1);
}
function ri(r, e) {
  e.content.size || r.type.compatibleContent(e.type);
  let t = r.contentMatchAt(r.childCount), { linebreakReplacement: n } = r.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == n ? r.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !r.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Qn(r, e) {
  return !!(r && e && !r.isLeaf && ri(r, e));
}
function lt(r, e, t = -1) {
  let n = r.resolve(e);
  for (let i = n.depth; ; i--) {
    let o, s, l = n.index(i);
    if (i == n.depth ? (o = n.nodeBefore, s = n.nodeAfter) : t > 0 ? (o = n.node(i + 1), l++, s = n.node(i).maybeChild(l)) : (o = n.node(i).maybeChild(l - 1), s = n.node(i + 1)), o && !o.isTextblock && Qn(o, s) && n.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? n.before(i) : n.after(i);
  }
}
function Bt(r, e, t = e, n = E.empty) {
  if (e == t && !n.size)
    return null;
  let i = r.resolve(e), o = r.resolve(t);
  return ii(i, o, n) ? new q(e, t, n) : new oi(i, o, n).fit();
}
function ii(r, e, t) {
  return !t.openStart && !t.openEnd && r.start() == e.start() && r.parent.canReplace(r.index(), e.index(), t.content);
}
class oi {
  constructor(e, t, n) {
    this.$from = e, this.$to = t, this.unplaced = n, this.frontier = [], this.placed = w.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = w.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, n = this.$from, i = this.close(e < 0 ? this.$to : n.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = n.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new E(o, s, l);
    return e > -1 ? new U(n.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || n.pos != this.$to.pos ? new q(n.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, n = 0, i = this.unplaced.openEnd; n < e; n++) {
      let o = t.firstChild;
      if (t.childCount > 1 && (i = 0), o.type.spec.isolating && i <= n) {
        e = n;
        break;
      }
      t = o.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let n = t == 1 ? e : this.unplaced.openStart; n >= 0; n--) {
        let i, o = null;
        n ? (o = gt(this.unplaced.content, n - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, h = null;
          if (t == 1 && (s ? c.matchType(s.type) || (h = c.fillBefore(w.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: n, frontierDepth: l, parent: o, inject: h };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: n, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced, i = gt(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new E(e, t + 1, Math.max(n, i.size + t >= e.size - n ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: n } = this.unplaced, i = gt(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new E(Be(e, t - 1, 1), t - 1, o ? t - 1 : n);
    } else
      this.unplaced = new E(Be(e, t, 1), t, n);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let m = 0; m < o.length; m++)
        this.openFrontierNode(o[m]);
    let s = this.unplaced, l = n ? n.content : s.content, a = s.openStart - e, c = 0, u = [], { match: h, type: d } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      h = h.matchFragment(i);
    }
    let p = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), y = h.matchType(m.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (h = y, u.push(er(m.mark(d.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? p : -1)));
    }
    let g = c == l.childCount;
    g || (p = -1), this.placed = Pe(this.placed, t, w.from(u)), this.frontier[t].match = h, g && p < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < p; m++) {
      let S = y.lastChild;
      this.frontier.push({ type: S.type, match: S.contentMatchAt(S.childCount) }), y = S.content;
    }
    this.unplaced = g ? e == 0 ? E.empty : new E(Be(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new E(Be(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !yt(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: n } = this.$to, i = this.$to.after(n);
    for (; n > 1 && i == this.$to.end(--n); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: n, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = yt(e, t, i, n, o);
        if (s) {
          for (let l = t - 1; l >= 0; l--) {
            let { match: a, type: c } = this.frontier[l], u = yt(e, l, c, a, !0);
            if (!u || u.childCount)
              continue e;
          }
          return { depth: t, fit: s, move: o ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = Pe(this.placed, t.depth, t.fit)), e = t.move;
    for (let n = t.depth + 1; n <= e.depth; n++) {
      let i = e.node(n), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(n));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, n) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Pe(this.placed, this.depth, w.from(e.create(t, n))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(w.empty, !0);
    t.childCount && (this.placed = Pe(this.placed, this.frontier.length, t));
  }
}
function Be(r, e, t) {
  return e == 0 ? r.cutByIndex(t, r.childCount) : r.replaceChild(0, r.firstChild.copy(Be(r.firstChild.content, e - 1, t)));
}
function Pe(r, e, t) {
  return e == 0 ? r.append(t) : r.replaceChild(r.childCount - 1, r.lastChild.copy(Pe(r.lastChild.content, e - 1, t)));
}
function gt(r, e) {
  for (let t = 0; t < e; t++)
    r = r.firstChild.content;
  return r;
}
function er(r, e, t) {
  if (e <= 0)
    return r;
  let n = r.content;
  return e > 1 && (n = n.replaceChild(0, er(n.firstChild, e - 1, n.childCount == 1 ? t - 1 : 0))), e > 0 && (n = r.type.contentMatch.fillBefore(n).append(n), t <= 0 && (n = n.append(r.type.contentMatch.matchFragment(n).fillBefore(w.empty, !0)))), r.copy(n);
}
function yt(r, e, t, n, i) {
  let o = r.node(e), s = i ? r.indexAfter(e) : r.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = n.fillBefore(o.content, !0, s);
  return l && !si(t, o.content, s) ? l : null;
}
function si(r, e, t) {
  for (let n = t; n < e.childCount; n++)
    if (!r.allowsMarks(e.child(n).marks))
      return !0;
  return !1;
}
class Fe extends $ {
  /**
  Construct an attribute step.
  */
  constructor(e, t, n) {
    super(), this.pos = e, this.attr = t, this.value = n;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return F.fail("No node at attribute step's position");
    let n = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      n[o] = t.attrs[o];
    n[this.attr] = this.value;
    let i = t.type.create(n, null, t.marks);
    return F.fromReplace(e, this.pos, this.pos + 1, new E(w.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return H.empty;
  }
  invert(e) {
    return new Fe(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Fe(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Fe(t.pos, t.attr, t.value);
  }
}
$.jsonID("attr", Fe);
class rt extends $ {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let n = e.type.create(t, e.content, e.marks);
    return F.ok(n);
  }
  getMap() {
    return H.empty;
  }
  invert(e) {
    return new rt(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new rt(t.attr, t.value);
  }
}
$.jsonID("docAttr", rt);
let Je = class extends Error {
};
Je = function r(e) {
  let t = Error.call(this, e);
  return t.__proto__ = r.prototype, t;
};
Je.prototype = Object.create(Error.prototype);
Je.prototype.constructor = Je;
Je.prototype.name = "TransformError";
const wt = /* @__PURE__ */ Object.create(null);
class A {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, n) {
    this.$anchor = e, this.$head = t, this.ranges = n || [new li(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = E.empty) {
    let n = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = n, n = n.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? E.empty : t), l == 0 && gn(e, o, (n ? n.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let n = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(n), c = a.map(s.pos), u = a.map(l.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), gn(e, n, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, n = !1) {
    let i = e.parent.inlineContent ? new _(e) : Ee(e.node(0), e.parent, e.pos, e.index(), t, n);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Ee(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, n) : Ee(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, n);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new K(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Ee(e, e, 0, 0, 1) || new K(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Ee(e, e, e.content.size, e.childCount, -1) || new K(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let n = wt[t.type];
    if (!n)
      throw new RangeError(`No selection type ${t.type} defined`);
    return n.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in wt)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return wt[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return _.between(this.$anchor, this.$head).getBookmark();
  }
}
A.prototype.visible = !0;
class li {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let pn = !1;
function mn(r) {
  !pn && !r.parent.inlineContent && (pn = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + r.parent.type.name + ")"));
}
class _ extends A {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    mn(e), mn(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let n = e.resolve(t.map(this.head));
    if (!n.parent.inlineContent)
      return A.near(n);
    let i = e.resolve(t.map(this.anchor));
    return new _(i.parent.inlineContent ? i : n, n);
  }
  replace(e, t = E.empty) {
    if (super.replace(e, t), t == E.empty) {
      let n = this.$from.marksAcross(this.$to);
      n && e.ensureMarks(n);
    }
  }
  eq(e) {
    return e instanceof _ && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new at(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new _(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, n = t) {
    let i = e.resolve(t);
    return new this(i, n == t ? i : e.resolve(n));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, n) {
    let i = e.pos - t.pos;
    if ((!n || i) && (n = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let o = A.findFrom(t, n, !0) || A.findFrom(t, -n, !0);
      if (o)
        t = o.$head;
      else
        return A.near(t, n);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (A.findFrom(e, -n, !0) || A.findFrom(e, n, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new _(e, t);
  }
}
A.jsonID("text", _);
class at {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new at(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return _.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class R extends A {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, n = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, n), this.node = t;
  }
  map(e, t) {
    let { deleted: n, pos: i } = t.mapResult(this.anchor), o = e.resolve(i);
    return n ? A.near(o) : new R(o);
  }
  content() {
    return new E(w.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof R && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Pt(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new R(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new R(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
R.prototype.visible = !1;
A.jsonID("node", R);
class Pt {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: n } = e.mapResult(this.anchor);
    return t ? new at(n, n) : new Pt(n);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), n = t.nodeAfter;
    return n && R.isSelectable(n) ? new R(t) : A.near(t);
  }
}
class K extends A {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = E.empty) {
    if (t == E.empty) {
      e.delete(0, e.doc.content.size);
      let n = A.atStart(e.doc);
      n.eq(e.selection) || e.setSelection(n);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new K(e);
  }
  map(e) {
    return new K(e);
  }
  eq(e) {
    return e instanceof K;
  }
  getBookmark() {
    return ai;
  }
}
A.jsonID("all", K);
const ai = {
  map() {
    return this;
  },
  resolve(r) {
    return new K(r);
  }
};
function Ee(r, e, t, n, i, o = !1) {
  if (e.inlineContent)
    return _.create(r, t);
  for (let s = n - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && R.isSelectable(l))
        return R.create(r, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Ee(r, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function gn(r, e, t) {
  let n = r.steps.length - 1;
  if (n < e)
    return;
  let i = r.steps[n];
  if (!(i instanceof q || i instanceof U))
    return;
  let o = r.mapping.maps[n], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), r.setSelection(A.near(r.doc.resolve(s), t));
}
function yn(r, e) {
  return !e || !r ? r : r.bind(e);
}
class qe {
  constructor(e, t, n) {
    this.name = e, this.init = yn(t.init, n), this.apply = yn(t.apply, n);
  }
}
new qe("doc", {
  init(r) {
    return r.doc || r.schema.topNodeType.createAndFill();
  },
  apply(r) {
    return r.doc;
  }
}), new qe("selection", {
  init(r, e) {
    return r.selection || A.atStart(e.doc);
  },
  apply(r) {
    return r.selection;
  }
}), new qe("storedMarks", {
  init(r) {
    return r.storedMarks || null;
  },
  apply(r, e, t, n) {
    return n.selection.$cursor ? r.storedMarks : null;
  }
}), new qe("scrollToSelection", {
  init() {
    return 0;
  },
  apply(r, e) {
    return r.scrolledIntoView ? e + 1 : e;
  }
});
function tr(r, e, t) {
  for (let n in r) {
    let i = r[n];
    i instanceof Function ? i = i.bind(e) : n == "handleDOMEvents" && (i = tr(i, e, {})), t[n] = i;
  }
  return t;
}
class xe {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && tr(e.props, this, this.props), this.key = e.key ? e.key.key : nr("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const xt = /* @__PURE__ */ Object.create(null);
function nr(r) {
  return r in xt ? r + "$" + ++xt[r] : (xt[r] = 0, r + "$");
}
class ve {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = nr(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const ci = (r, e) => r.selection.empty ? !1 : (e && e(r.tr.deleteSelection().scrollIntoView()), !0);
function rr(r, e) {
  let { $cursor: t } = r.selection;
  return !t || (e ? !e.endOfTextblock("backward", r) : t.parentOffset > 0) ? null : t;
}
const ui = (r, e, t) => {
  let n = rr(r, t);
  if (!n)
    return !1;
  let i = _t(n);
  if (!i) {
    let s = n.blockRange(), l = s && Te(s);
    return l == null ? !1 : (e && e(r.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (lr(r, i, e, -1))
    return !0;
  if (n.parent.content.size == 0 && (Oe(o, "end") || R.isSelectable(o)))
    for (let s = n.depth; ; s--) {
      let l = Bt(r.doc, n.before(s), n.after(s), E.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = r.tr.step(l);
          a.setSelection(Oe(o, "end") ? A.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : R.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || n.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, fi = (r, e, t) => {
  let n = rr(r, t);
  if (!n)
    return !1;
  let i = _t(n);
  return i ? ir(r, i, e) : !1;
}, hi = (r, e, t) => {
  let n = or(r, t);
  if (!n)
    return !1;
  let i = Dt(n);
  return i ? ir(r, i, e) : !1;
};
function ir(r, e, t) {
  let n = e.nodeBefore, i = n, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = Bt(r.doc, o, a, E.empty);
  if (!c || c.from != o || c instanceof q && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = r.tr.step(c);
    u.setSelection(_.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Oe(r, e, t = !1) {
  for (let n = r; n; n = e == "start" ? n.firstChild : n.lastChild) {
    if (n.isTextblock)
      return !0;
    if (t && n.childCount != 1)
      return !1;
  }
  return !1;
}
const di = (r, e, t) => {
  let { $head: n, empty: i } = r.selection, o = n;
  if (!i)
    return !1;
  if (n.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", r) : n.parentOffset > 0)
      return !1;
    o = _t(n);
  }
  let s = o && o.nodeBefore;
  return !s || !R.isSelectable(s) ? !1 : (e && e(r.tr.setSelection(R.create(r.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function _t(r) {
  if (!r.parent.type.spec.isolating)
    for (let e = r.depth - 1; e >= 0; e--) {
      if (r.index(e) > 0)
        return r.doc.resolve(r.before(e + 1));
      if (r.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function or(r, e) {
  let { $cursor: t } = r.selection;
  return !t || (e ? !e.endOfTextblock("forward", r) : t.parentOffset < t.parent.content.size) ? null : t;
}
const pi = (r, e, t) => {
  let n = or(r, t);
  if (!n)
    return !1;
  let i = Dt(n);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (lr(r, i, e, 1))
    return !0;
  if (n.parent.content.size == 0 && (Oe(o, "start") || R.isSelectable(o))) {
    let s = Bt(r.doc, n.before(), n.after(), E.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = r.tr.step(s);
        l.setSelection(Oe(o, "start") ? A.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : R.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == n.depth - 1 ? (e && e(r.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, mi = (r, e, t) => {
  let { $head: n, empty: i } = r.selection, o = n;
  if (!i)
    return !1;
  if (n.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", r) : n.parentOffset < n.parent.content.size)
      return !1;
    o = Dt(n);
  }
  let s = o && o.nodeAfter;
  return !s || !R.isSelectable(s) ? !1 : (e && e(r.tr.setSelection(R.create(r.doc, o.pos)).scrollIntoView()), !0);
};
function Dt(r) {
  if (!r.parent.type.spec.isolating)
    for (let e = r.depth - 1; e >= 0; e--) {
      let t = r.node(e);
      if (r.index(e) + 1 < t.childCount)
        return r.doc.resolve(r.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const gi = (r, e) => {
  let t = r.selection, n = t instanceof R, i;
  if (n) {
    if (t.node.isTextblock || !we(r.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = lt(r.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = r.tr.join(i);
    n && o.setSelection(R.create(o.doc, i - r.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, yi = (r, e) => {
  let t = r.selection, n;
  if (t instanceof R) {
    if (t.node.isTextblock || !we(r.doc, t.to))
      return !1;
    n = t.to;
  } else if (n = lt(r.doc, t.to, 1), n == null)
    return !1;
  return e && e(r.tr.join(n).scrollIntoView()), !0;
}, wi = (r, e) => {
  let { $from: t, $to: n } = r.selection, i = t.blockRange(n), o = i && Te(i);
  return o == null ? !1 : (e && e(r.tr.lift(i, o).scrollIntoView()), !0);
}, xi = (r, e) => {
  let { $head: t, $anchor: n } = r.selection;
  return !t.parent.type.spec.code || !t.sameParent(n) ? !1 : (e && e(r.tr.insertText(`
`).scrollIntoView()), !0);
};
function sr(r) {
  for (let e = 0; e < r.edgeCount; e++) {
    let { type: t } = r.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const vi = (r, e) => {
  let { $head: t, $anchor: n } = r.selection;
  if (!t.parent.type.spec.code || !t.sameParent(n))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = sr(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = r.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(A.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Si = (r, e) => {
  let t = r.selection, { $from: n, $to: i } = t;
  if (t instanceof K || n.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = sr(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!n.parentOffset && i.index() < i.parent.childCount ? n : i).pos, l = r.tr.insert(s, o.createAndFill());
    l.setSelection(_.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ki = (r, e) => {
  let { $cursor: t } = r.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Ce(r.doc, o))
      return e && e(r.tr.split(o).scrollIntoView()), !0;
  }
  let n = t.blockRange(), i = n && Te(n);
  return i == null ? !1 : (e && e(r.tr.lift(n, i).scrollIntoView()), !0);
}, Ei = (r, e) => {
  let { $from: t, to: n } = r.selection, i, o = t.sharedDepth(n);
  return o == 0 ? !1 : (i = t.before(o), e && e(r.tr.setSelection(R.create(r.doc, i))), !0);
};
function bi(r, e, t) {
  let n = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !n || !i || !n.type.compatibleContent(i.type) ? !1 : !n.content.size && e.parent.canReplace(o - 1, o) ? (t && t(r.tr.delete(e.pos - n.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || we(r.doc, e.pos)) ? !1 : (t && t(r.tr.join(e.pos).scrollIntoView()), !0);
}
function lr(r, e, t, n) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && bi(r, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, g = w.empty;
      for (let S = s.length - 1; S >= 0; S--)
        g = w.from(s[S].create(null, g));
      g = w.from(i.copy(g));
      let m = r.tr.step(new U(e.pos - 1, p, e.pos, p, new E(g, 1, 0), s.length, !0)), y = m.doc.resolve(p + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && we(m.doc, y.pos) && m.join(y.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || n > 0 && a ? null : A.findFrom(e, 1), h = u && u.$from.blockRange(u.$to), d = h && Te(h);
  if (d != null && d >= e.depth)
    return t && t(r.tr.lift(h, d).scrollIntoView()), !0;
  if (c && Oe(o, "start", !0) && Oe(i, "end")) {
    let p = i, g = [];
    for (; g.push(p), !p.isTextblock; )
      p = p.lastChild;
    let m = o, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (p.canReplace(p.childCount, p.childCount, m.content)) {
      if (t) {
        let S = w.empty;
        for (let b = g.length - 1; b >= 0; b--)
          S = w.from(g[b].copy(S));
        let I = r.tr.step(new U(e.pos - g.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new E(S, g.length, 0), 0, !0));
        t(I.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ar(r) {
  return function(e, t) {
    let n = e.selection, i = r < 0 ? n.$from : n.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(_.create(e.doc, r < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Ci = ar(-1), Oi = ar(1);
function Ti(r, e = null) {
  return function(t, n) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Zn(s, r, e);
    return l ? (n && n(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function wn(r, e = null) {
  return function(t, n) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(r, e)))
          if (a.type == r)
            i = !0;
          else {
            let u = t.doc.resolve(c), h = u.index();
            i = u.parent.canReplaceWith(h, h + 1, r);
          }
      });
    }
    if (!i)
      return !1;
    if (n) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, r, e);
      }
      n(o.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Mi(r, e = null) {
  return function(t, n) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = n ? t.tr : null;
    return Ai(l, s, r, e) ? (n && n(l.scrollIntoView()), !0) : !1;
  };
}
function Ai(r, e, t, n = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new et(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new et(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Zn(o, t, n, e);
  return l ? (r && Ni(r, e, l, i, t), !0) : !1;
}
function Ni(r, e, t, n, i) {
  let o = w.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = w.from(t[u].type.create(t[u].attrs, o));
  r.step(new U(e.start - (n ? 2 : 0), e.end, e.start, e.end, new E(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (n ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, h = e.endIndex, d = !0; u < h; u++, d = !1)
    !d && Ce(r.doc, a, l) && (r.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return r;
}
function Ri(r) {
  return function(e, t) {
    let { $from: n, $to: i } = e.selection, o = n.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == r);
    return o ? t ? n.node(o.depth - 1).type == r ? Ii(e, t, r, o) : zi(e, t, o) : !0 : !1;
  };
}
function Ii(r, e, t, n) {
  let i = r.tr, o = n.end, s = n.$to.end(n.depth);
  o < s && (i.step(new U(o - 1, s, o, s, new E(w.from(t.create(null, n.parent.copy())), 1, 0), 1, !0)), n = new et(i.doc.resolve(n.$from.pos), i.doc.resolve(s), n.depth));
  const l = Te(n);
  if (l == null)
    return !1;
  i.lift(n, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return we(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function zi(r, e, t) {
  let n = r.tr, i = t.parent;
  for (let p = t.end, g = t.endIndex - 1, m = t.startIndex; g > m; g--)
    p -= i.child(g).nodeSize, n.delete(p - 1, p + 1);
  let o = n.doc.resolve(t.start), s = o.nodeAfter;
  if (n.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? w.empty : w.from(i))))
    return !1;
  let h = o.pos, d = h + s.nodeSize;
  return n.step(new U(h - (l ? 1 : 0), d + (a ? 1 : 0), h + 1, d - 1, new E((l ? w.empty : w.from(i.copy(w.empty))).append(a ? w.empty : w.from(i.copy(w.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(n.scrollIntoView()), !0;
}
function Bi(r) {
  return function(e, t) {
    let { $from: n, $to: i } = e.selection, o = n.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == r);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != r)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = w.from(c ? r.create() : null), h = new E(w.from(r.create(null, w.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, p = o.end;
      t(e.tr.step(new U(d - (c ? 3 : 1), p, d, p, h, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function cr(r) {
  const { state: e, transaction: t } = r;
  let { selection: n } = t, { doc: i } = t, { storedMarks: o } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return o;
    },
    get selection() {
      return n;
    },
    get doc() {
      return i;
    },
    get tr() {
      return n = t.selection, i = t.doc, o = t.storedMarks, t;
    }
  };
}
class Pi {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: n } = this, { view: i } = t, { tr: o } = n, s = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const h = a(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), h;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: n, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((d) => d === !0)), h = {
      ...Object.fromEntries(Object.entries(n).map(([d, p]) => [d, (...m) => {
        const y = this.buildProps(c, t), S = p(...m)(y);
        return l.push(S), h;
      }])),
      run: u
    };
    return h;
  }
  createCan(e) {
    const { rawCommands: t, state: n } = this, i = !1, o = e || n.tr, s = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...u) => c(...u)({ ...s, dispatch: void 0 })])),
      chain: () => this.createChain(o, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: n, editor: i, state: o } = this, { view: s } = i, l = {
      tr: e,
      editor: i,
      view: s,
      state: cr({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(n).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
}
function G(r, e, t) {
  return r.config[e] === void 0 && r.parent ? G(r.parent, e, t) : typeof r.config[e] == "function" ? r.config[e].bind({
    ...t,
    parent: r.parent ? G(r.parent, e, t) : null
  }) : r.config[e];
}
function _i(r) {
  const e = r.filter((i) => i.type === "extension"), t = r.filter((i) => i.type === "node"), n = r.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: n
  };
}
function J(r, e) {
  if (typeof r == "string") {
    if (!e.nodes[r])
      throw Error(`There is no node type named '${r}'. Maybe you forgot to add the extension?`);
    return e.nodes[r];
  }
  return r;
}
function ur(...r) {
  return r.filter((e) => !!e).reduce((e, t) => {
    const n = { ...e };
    return Object.entries(t).forEach(([i, o]) => {
      if (!n[i]) {
        n[i] = o;
        return;
      }
      if (i === "class") {
        const l = o ? String(o).split(" ") : [], a = n[i] ? n[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        n[i] = [...a, ...c].join(" ");
      } else if (i === "style") {
        const l = o ? o.split(";").map((u) => u.trim()).filter(Boolean) : [], a = n[i] ? n[i].split(";").map((u) => u.trim()).filter(Boolean) : [], c = /* @__PURE__ */ new Map();
        a.forEach((u) => {
          const [h, d] = u.split(":").map((p) => p.trim());
          c.set(h, d);
        }), l.forEach((u) => {
          const [h, d] = u.split(":").map((p) => p.trim());
          c.set(h, d);
        }), n[i] = Array.from(c.entries()).map(([u, h]) => `${u}: ${h}`).join("; ");
      } else
        n[i] = o;
    }), n;
  }, {});
}
function Di(r, e) {
  return e.filter((t) => t.type === r.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(r.attrs) || {} : {
    [t.name]: r.attrs[t.name]
  }).reduce((t, n) => ur(t, n), {});
}
function Fi(r) {
  return typeof r == "function";
}
function ee(r, e = void 0, ...t) {
  return Fi(r) ? e ? r.bind(e)(...t) : r(...t) : r;
}
function Li(r) {
  return Object.prototype.toString.call(r) === "[object RegExp]";
}
function ji(r) {
  return Object.prototype.toString.call(r).slice(8, -1);
}
function He(r) {
  return ji(r) !== "Object" ? !1 : r.constructor === Object && Object.getPrototypeOf(r) === Object.prototype;
}
function Ft(r, e) {
  const t = { ...r };
  return He(r) && He(e) && Object.keys(e).forEach((n) => {
    He(e[n]) && He(r[n]) ? t[n] = Ft(r[n], e[n]) : t[n] = e[n];
  }), t;
}
class Y {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = ee(G(this, "addOptions", {
      name: this.name
    }))), this.storage = ee(G(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Y(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Ft(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new Y({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = ee(G(t, "addOptions", {
      name: t.name
    })), t.storage = ee(G(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Vi(r, e, t) {
  const { from: n, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return r.nodesBetween(n, i, (a, c, u, h) => {
    var d;
    a.isBlock && c > n && (l += o);
    const p = s == null ? void 0 : s[a.type.name];
    if (p)
      return u && (l += p({
        node: a,
        pos: c,
        parent: u,
        index: h,
        range: e
      })), !1;
    a.isText && (l += (d = a == null ? void 0 : a.text) === null || d === void 0 ? void 0 : d.slice(Math.max(n, c) - c, i - c));
  }), l;
}
function Ji(r) {
  return Object.fromEntries(Object.entries(r.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
Y.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new xe({
        key: new ve("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: r } = this, { state: e, schema: t } = r, { doc: n, selection: i } = e, { ranges: o } = i, s = Math.min(...o.map((u) => u.$from.pos)), l = Math.max(...o.map((u) => u.$to.pos)), a = Ji(t);
            return Vi(n, { from: s, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
});
const $i = () => ({ editor: r, view: e }) => (requestAnimationFrame(() => {
  var t;
  r.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), Wi = (r = !1) => ({ commands: e }) => e.setContent("", r), Ui = () => ({ state: r, tr: e, dispatch: t }) => {
  const { selection: n } = e, { ranges: i } = n;
  return t && i.forEach(({ $from: o, $to: s }) => {
    r.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, h = c.resolve(u.map(a)), d = c.resolve(u.map(a + l.nodeSize)), p = h.blockRange(d);
      if (!p)
        return;
      const g = Te(p);
      if (l.type.isTextblock) {
        const { defaultType: m } = h.parent.contentMatchAt(h.index());
        e.setNodeMarkup(p.start, m);
      }
      (g || g === 0) && e.lift(p, g);
    });
  }), !0;
}, qi = (r) => (e) => r(e), Hi = () => ({ state: r, dispatch: e }) => Si(r, e), Gi = (r, e) => ({ editor: t, tr: n }) => {
  const { state: i } = t, o = i.doc.slice(r.from, r.to);
  n.deleteRange(r.from, r.to);
  const s = n.mapping.map(e);
  return n.insert(s, o.content), n.setSelection(new _(n.doc.resolve(s - 1))), !0;
}, Ki = () => ({ tr: r, dispatch: e }) => {
  const { selection: t } = r, n = t.$anchor.node();
  if (n.content.size > 0)
    return !1;
  const i = r.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === n.type) {
      if (e) {
        const l = i.before(o), a = i.after(o);
        r.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Yi = (r) => ({ tr: e, state: t, dispatch: n }) => {
  const i = J(r, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (n) {
        const a = o.before(s), c = o.after(s);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Xi = (r) => ({ tr: e, dispatch: t }) => {
  const { from: n, to: i } = r;
  return t && e.delete(n, i), !0;
}, Zi = () => ({ state: r, dispatch: e }) => ci(r, e), Qi = () => ({ commands: r }) => r.keyboardShortcut("Enter"), eo = () => ({ state: r, dispatch: e }) => vi(r, e);
function it(r, e, t = { strict: !0 }) {
  const n = Object.keys(e);
  return n.length ? n.every((i) => t.strict ? e[i] === r[i] : Li(e[i]) ? e[i].test(r[i]) : e[i] === r[i]) : !0;
}
function fr(r, e, t = {}) {
  return r.find((n) => n.type === e && it(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, n.attrs[i]])),
    t
  ));
}
function xn(r, e, t = {}) {
  return !!fr(r, e, t);
}
function hr(r, e, t) {
  var n;
  if (!r || !e)
    return;
  let i = r.parent.childAfter(r.parentOffset);
  if ((!i.node || !i.node.marks.some((u) => u.type === e)) && (i = r.parent.childBefore(r.parentOffset)), !i.node || !i.node.marks.some((u) => u.type === e) || (t = t || ((n = i.node.marks[0]) === null || n === void 0 ? void 0 : n.attrs), !fr([...i.node.marks], e, t)))
    return;
  let s = i.index, l = r.start() + i.offset, a = s + 1, c = l + i.node.nodeSize;
  for (; s > 0 && xn([...r.parent.child(s - 1).marks], e, t); )
    s -= 1, l -= r.parent.child(s).nodeSize;
  for (; a < r.parent.childCount && xn([...r.parent.child(a).marks], e, t); )
    c += r.parent.child(a).nodeSize, a += 1;
  return {
    from: l,
    to: c
  };
}
function re(r, e) {
  if (typeof r == "string") {
    if (!e.marks[r])
      throw Error(`There is no mark type named '${r}'. Maybe you forgot to add the extension?`);
    return e.marks[r];
  }
  return r;
}
const to = (r, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  const o = re(r, n.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const h = hr(a, o, e);
    if (h && h.from <= c && h.to >= u) {
      const d = _.create(s, h.from, h.to);
      t.setSelection(d);
    }
  }
  return !0;
}, no = (r) => (e) => {
  const t = typeof r == "function" ? r(e) : r;
  for (let n = 0; n < t.length; n += 1)
    if (t[n](e))
      return !0;
  return !1;
};
function dr(r) {
  return r instanceof _;
}
function de(r = 0, e = 0, t = 0) {
  return Math.min(Math.max(r, e), t);
}
function ro(r, e = null) {
  if (!e)
    return null;
  const t = A.atStart(r), n = A.atEnd(r);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return n;
  const i = t.from, o = n.to;
  return e === "all" ? _.create(r, de(0, i, o), de(r.content.size, i, o)) : _.create(r, de(e, i, o), de(e, i, o));
}
function pr() {
  return navigator.platform === "Android" || /android/i.test(navigator.userAgent);
}
function ct() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const io = (r = null, e = {}) => ({ editor: t, view: n, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (ct() || pr()) && n.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (n.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (n.hasFocus() && r === null || r === !1)
    return !0;
  if (o && r === null && !dr(t.state.selection))
    return s(), !0;
  const l = ro(i.doc, r) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, oo = (r, e) => (t) => r.every((n, i) => e(n, { ...t, index: i })), so = (r, e) => ({ tr: t, commands: n }) => n.insertContentAt({ from: t.selection.from, to: t.selection.to }, r, e), mr = (r) => {
  const e = r.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const n = e[t];
    n.nodeType === 3 && n.nodeValue && /^(\n\s\s|\n)$/.test(n.nodeValue) ? r.removeChild(n) : n.nodeType === 1 && mr(n);
  }
  return r;
};
function Ge(r) {
  const e = `<body>${r}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return mr(t);
}
function ot(r, e, t) {
  if (r instanceof ge || r instanceof w)
    return r;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const n = typeof r == "object" && r !== null, i = typeof r == "string";
  if (n)
    try {
      if (Array.isArray(r) && r.length > 0)
        return w.fromArray(r.map((l) => e.nodeFromJSON(l)));
      const s = e.nodeFromJSON(r);
      return t.errorOnInvalidContent && s.check(), s;
    } catch (o) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", r, "Error:", o), ot("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new qr({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (c) => (s = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? be.fromSchema(a).parseSlice(Ge(r), t.parseOptions) : be.fromSchema(a).parse(Ge(r), t.parseOptions), t.errorOnInvalidContent && s)
        throw new Error("[tiptap error]: Invalid HTML content", { cause: new Error(`Invalid element found: ${l}`) });
    }
    const o = be.fromSchema(e);
    return t.slice ? o.parseSlice(Ge(r), t.parseOptions).content : o.parse(Ge(r), t.parseOptions);
  }
  return ot("", e, t);
}
function lo(r, e, t) {
  const n = r.steps.length - 1;
  if (n < e)
    return;
  const i = r.steps[n];
  if (!(i instanceof q || i instanceof U))
    return;
  const o = r.mapping.maps[n];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), r.setSelection(A.near(r.doc.resolve(s), t));
}
const ao = (r) => !("type" in r), co = (r, e, t) => ({ tr: n, dispatch: i, editor: o }) => {
  var s;
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    try {
      l = ot(e, o.schema, {
        parseOptions: {
          preserveWhitespace: "full",
          ...t.parseOptions
        },
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (g) {
      return o.emit("contentError", {
        editor: o,
        error: g,
        disableCollaboration: () => {
          o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      }), !1;
    }
    let { from: a, to: c } = typeof r == "number" ? { from: r, to: r } : { from: r.from, to: r.to }, u = !0, h = !0;
    if ((ao(l) ? l : [l]).forEach((g) => {
      g.check(), u = u ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), a === c && h) {
      const { parent: g } = n.doc.resolve(a);
      g.isTextblock && !g.type.spec.code && !g.childCount && (a -= 1, c += 1);
    }
    let p;
    if (u) {
      if (Array.isArray(e))
        p = e.map((g) => g.text || "").join("");
      else if (e instanceof w) {
        let g = "";
        e.forEach((m) => {
          m.text && (g += m.text);
        }), p = g;
      } else
        typeof e == "object" && e && e.text ? p = e.text : p = e;
      n.insertText(p, a, c);
    } else
      p = l, n.replaceWith(a, c, p);
    t.updateSelection && lo(n, n.steps.length - 1, -1), t.applyInputRules && n.setMeta("applyInputRules", { from: a, text: p }), t.applyPasteRules && n.setMeta("applyPasteRules", { from: a, text: p });
  }
  return !0;
}, uo = () => ({ state: r, dispatch: e }) => gi(r, e), fo = () => ({ state: r, dispatch: e }) => yi(r, e), ho = () => ({ state: r, dispatch: e }) => ui(r, e), po = () => ({ state: r, dispatch: e }) => pi(r, e), mo = () => ({ state: r, dispatch: e, tr: t }) => {
  try {
    const n = lt(r.doc, r.selection.$from.pos, -1);
    return n == null ? !1 : (t.join(n, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, go = () => ({ state: r, dispatch: e, tr: t }) => {
  try {
    const n = lt(r.doc, r.selection.$from.pos, 1);
    return n == null ? !1 : (t.join(n, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, yo = () => ({ state: r, dispatch: e }) => fi(r, e), wo = () => ({ state: r, dispatch: e }) => hi(r, e);
function gr() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function xo(r) {
  const e = r.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let n, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      ct() || gr() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return n && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const vo = (r) => ({ editor: e, view: t, tr: n, dispatch: i }) => {
  const o = xo(r).split(/-(?!$)/), s = o.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(n.mapping);
    u && i && n.maybeStep(u);
  }), !0;
};
function Lt(r, e, t = {}) {
  const { from: n, to: i, empty: o } = r.selection, s = e ? J(e, r.schema) : null, l = [];
  r.doc.nodesBetween(n, i, (h, d) => {
    if (h.isText)
      return;
    const p = Math.max(n, d), g = Math.min(i, d + h.nodeSize);
    l.push({
      node: h,
      from: p,
      to: g
    });
  });
  const a = i - n, c = l.filter((h) => s ? s.name === h.node.type.name : !0).filter((h) => it(h.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((h, d) => h + d.to - d.from, 0) >= a;
}
const So = (r, e = {}) => ({ state: t, dispatch: n }) => {
  const i = J(r, t.schema);
  return Lt(t, i, e) ? wi(t, n) : !1;
}, ko = () => ({ state: r, dispatch: e }) => ki(r, e), Eo = (r) => ({ state: e, dispatch: t }) => {
  const n = J(r, e.schema);
  return Ri(n)(e, t);
}, bo = () => ({ state: r, dispatch: e }) => xi(r, e);
function yr(r, e) {
  return e.nodes[r] ? "node" : e.marks[r] ? "mark" : null;
}
function vn(r, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(r).reduce((n, i) => (t.includes(i) || (n[i] = r[i]), n), {});
}
const Co = (r, e) => ({ tr: t, state: n, dispatch: i }) => {
  let o = null, s = null;
  const l = yr(typeof r == "string" ? r : r.name, n.schema);
  return l ? (l === "node" && (o = J(r, n.schema)), l === "mark" && (s = re(r, n.schema)), i && t.selection.ranges.forEach((a) => {
    n.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      o && o === c.type && t.setNodeMarkup(u, void 0, vn(c.attrs, e)), s && c.marks.length && c.marks.forEach((h) => {
        s === h.type && t.addMark(u, u + c.nodeSize, s.create(vn(h.attrs, e)));
      });
    });
  }), !0) : !1;
}, Oo = () => ({ tr: r, dispatch: e }) => (e && r.scrollIntoView(), !0), To = () => ({ tr: r, dispatch: e }) => {
  if (e) {
    const t = new K(r.doc);
    r.setSelection(t);
  }
  return !0;
}, Mo = () => ({ state: r, dispatch: e }) => di(r, e), Ao = () => ({ state: r, dispatch: e }) => mi(r, e), No = () => ({ state: r, dispatch: e }) => Ei(r, e), Ro = () => ({ state: r, dispatch: e }) => Oi(r, e), Io = () => ({ state: r, dispatch: e }) => Ci(r, e);
function zo(r, e, t = {}, n = {}) {
  return ot(r, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: n.errorOnInvalidContent
  });
}
const Bo = (r, e = !1, t = {}, n = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  var a, c;
  const { doc: u } = o;
  if (t.preserveWhitespace !== "full") {
    const h = zo(r, i.schema, t, {
      errorOnInvalidContent: (a = n.errorOnInvalidContent) !== null && a !== void 0 ? a : i.options.enableContentCheck
    });
    return s && o.replaceWith(0, u.content.size, h).setMeta("preventUpdate", !e), !0;
  }
  return s && o.setMeta("preventUpdate", !e), l.insertContentAt({ from: 0, to: u.content.size }, r, {
    parseOptions: t,
    errorOnInvalidContent: (c = n.errorOnInvalidContent) !== null && c !== void 0 ? c : i.options.enableContentCheck
  });
};
function Po(r, e) {
  const t = re(e, r.schema), { from: n, to: i, empty: o } = r.selection, s = [];
  o ? (r.storedMarks && s.push(...r.storedMarks), s.push(...r.selection.$head.marks())) : r.doc.nodesBetween(n, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function _o(r) {
  for (let e = 0; e < r.edgeCount; e += 1) {
    const { type: t } = r.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function Do(r, e) {
  for (let t = r.depth; t > 0; t -= 1) {
    const n = r.node(t);
    if (e(n))
      return {
        pos: t > 0 ? r.before(t) : 0,
        start: r.start(t),
        depth: t,
        node: n
      };
  }
}
function jt(r) {
  return (e) => Do(e.$from, r);
}
function Ye(r, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([n]) => {
    const i = r.find((o) => o.type === e && o.name === n);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Fo(r, e, t = {}) {
  const { empty: n, ranges: i } = r.selection, o = e ? re(e, r.schema) : null;
  if (n)
    return !!(r.storedMarks || r.selection.$from.marks()).filter((h) => o ? o.name === h.type.name : !0).find((h) => it(h.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: h, $to: d }) => {
    const p = h.pos, g = d.pos;
    r.doc.nodesBetween(p, g, (m, y) => {
      if (!m.isText && !m.marks.length)
        return;
      const S = Math.max(p, y), I = Math.min(g, y + m.nodeSize), b = I - S;
      s += b, l.push(...m.marks.map((k) => ({
        mark: k,
        from: S,
        to: I
      })));
    });
  }), s === 0)
    return !1;
  const a = l.filter((h) => o ? o.name === h.mark.type.name : !0).filter((h) => it(h.mark.attrs, t, { strict: !1 })).reduce((h, d) => h + d.to - d.from, 0), c = l.filter((h) => o ? h.mark.type !== o && h.mark.type.excludes(o) : !0).reduce((h, d) => h + d.to - d.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function Sn(r, e) {
  const { nodeExtensions: t } = _i(e), n = t.find((s) => s.name === r);
  if (!n)
    return !1;
  const i = {
    name: n.name,
    options: n.options,
    storage: n.storage
  }, o = ee(G(n, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function wr(r, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  var n;
  if (t) {
    if (r.type.name === "hardBreak")
      return !0;
    if (r.isText)
      return /^\s*$/m.test((n = r.text) !== null && n !== void 0 ? n : "");
  }
  if (r.isText)
    return !r.text;
  if (r.isAtom || r.isLeaf)
    return !1;
  if (r.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return r.content.forEach((o) => {
      i !== !1 && (wr(o, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function Lo(r, e, t) {
  var n;
  const { selection: i } = e;
  let o = null;
  if (dr(i) && (o = i.$cursor), o) {
    const l = (n = r.storedMarks) !== null && n !== void 0 ? n : o.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? r.doc.inlineContent && r.doc.type.allowsMarkType(t) : !1;
    return r.doc.nodesBetween(l.pos, a.pos, (u, h, d) => {
      if (c)
        return !1;
      if (u.isInline) {
        const p = !d || d.type.allowsMarkType(t), g = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = p && g;
      }
      return !c;
    }), c;
  });
}
const jo = (r, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = re(r, n.schema);
  if (i)
    if (s) {
      const c = Po(n, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const u = c.$from.pos, h = c.$to.pos;
        n.doc.nodesBetween(u, h, (d, p) => {
          const g = Math.max(p, u), m = Math.min(p + d.nodeSize, h);
          d.marks.find((S) => S.type === a) ? d.marks.forEach((S) => {
            a === S.type && t.addMark(g, m, a.create({
              ...S.attrs,
              ...e
            }));
          }) : t.addMark(g, m, a.create(e));
        });
      });
  return Lo(n, t, a);
}, Vo = (r, e) => ({ tr: t }) => (t.setMeta(r, e), !0), Jo = (r, e = {}) => ({ state: t, dispatch: n, chain: i }) => {
  const o = J(r, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => wn(o, { ...s, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => wn(o, { ...s, ...e })(l, n)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, $o = (r) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: n } = e, i = de(r, 0, n.content.size), o = R.create(n, i);
    e.setSelection(o);
  }
  return !0;
}, Wo = (r) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: n } = e, { from: i, to: o } = typeof r == "number" ? { from: r, to: r } : r, s = _.atStart(n).from, l = _.atEnd(n).to, a = de(i, s, l), c = de(o, s, l), u = _.create(n, a, c);
    e.setSelection(u);
  }
  return !0;
}, Uo = (r) => ({ state: e, dispatch: t }) => {
  const n = J(r, e.schema);
  return Bi(n)(e, t);
};
function kn(r, e) {
  const t = r.storedMarks || r.selection.$to.parentOffset && r.selection.$from.marks();
  if (t) {
    const n = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    r.tr.ensureMarks(n);
  }
}
const qo = ({ keepMarks: r = !0 } = {}) => ({ tr: e, state: t, dispatch: n, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Ye(c, l.node().type.name, l.node().attrs);
  if (o instanceof R && o.node.isBlock)
    return !l.parentOffset || !Ce(s, l.pos) ? !1 : (n && (r && kn(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const h = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : _o(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = h && d ? [
    {
      type: d,
      attrs: u
    }
  ] : void 0, g = Ce(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !g && Ce(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (g = !0, p = d ? [
    {
      type: d,
      attrs: u
    }
  ] : void 0), n) {
    if (g && (o instanceof _ && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), d && !h && !l.parentOffset && l.parent.type !== d)) {
      const m = e.mapping.map(l.before()), y = e.doc.resolve(m);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    r && kn(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return g;
}, Ho = (r, e = {}) => ({ tr: t, state: n, dispatch: i, editor: o }) => {
  var s;
  const l = J(r, n.schema), { $from: a, $to: c } = n.selection, u = n.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const h = a.node(-1);
  if (h.type !== l)
    return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let S = w.empty;
      const I = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let B = a.depth - I; B >= a.depth - 3; B -= 1)
        S = w.from(a.node(B).copy(S));
      const b = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, k = {
        ...Ye(d, a.node().type.name, a.node().attrs),
        ...e
      }, T = ((s = l.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.createAndFill(k)) || void 0;
      S = S.append(w.from(l.createAndFill(null, T) || void 0));
      const C = a.before(a.depth - (I - 1));
      t.replace(C, a.after(-b), new E(S, 4 - I, 0));
      let N = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (B, L) => {
        if (N > -1)
          return !1;
        B.isTextblock && B.content.size === 0 && (N = L + 1);
      }), N > -1 && t.setSelection(_.near(t.doc.resolve(N))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === a.end() ? h.contentMatchAt(0).defaultType : null, g = {
    ...Ye(d, h.type.name, h.attrs),
    ...e
  }, m = {
    ...Ye(d, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const y = p ? [
    { type: l, attrs: g },
    { type: p, attrs: m }
  ] : [{ type: l, attrs: g }];
  if (!Ce(t.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: S, storedMarks: I } = n, { splittableMarks: b } = o.extensionManager, k = I || S.$to.parentOffset && S.$from.marks();
    if (t.split(a.pos, 2, y).scrollIntoView(), !k || !i)
      return !0;
    const T = k.filter((C) => b.includes(C.type.name));
    t.ensureMarks(T);
  }
  return !0;
}, vt = (r, e) => {
  const t = jt((s) => s.type === e)(r.selection);
  if (!t)
    return !0;
  const n = r.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (n === void 0)
    return !0;
  const i = r.doc.nodeAt(n);
  return t.node.type === (i == null ? void 0 : i.type) && we(r.doc, t.pos) && r.join(t.pos), !0;
}, St = (r, e) => {
  const t = jt((s) => s.type === e)(r.selection);
  if (!t)
    return !0;
  const n = r.doc.resolve(t.start).after(t.depth);
  if (n === void 0)
    return !0;
  const i = r.doc.nodeAt(n);
  return t.node.type === (i == null ? void 0 : i.type) && we(r.doc, n) && r.join(n), !0;
}, Go = (r, e, t, n = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: h, splittableMarks: d } = i.extensionManager, p = J(r, s.schema), g = J(e, s.schema), { selection: m, storedMarks: y } = s, { $from: S, $to: I } = m, b = S.blockRange(I), k = y || m.$to.parentOffset && m.$from.marks();
  if (!b)
    return !1;
  const T = jt((C) => Sn(C.type.name, h))(m);
  if (b.depth >= 1 && T && b.depth - T.depth <= 1) {
    if (T.node.type === p)
      return c.liftListItem(g);
    if (Sn(T.node.type.name, h) && p.validContent(T.node.content) && l)
      return a().command(() => (o.setNodeMarkup(T.pos, p), !0)).command(() => vt(o, p)).command(() => St(o, p)).run();
  }
  return !t || !k || !l ? a().command(() => u().wrapInList(p, n) ? !0 : c.clearNodes()).wrapInList(p, n).command(() => vt(o, p)).command(() => St(o, p)).run() : a().command(() => {
    const C = u().wrapInList(p, n), N = k.filter((B) => d.includes(B.type.name));
    return o.ensureMarks(N), C ? !0 : c.clearNodes();
  }).wrapInList(p, n).command(() => vt(o, p)).command(() => St(o, p)).run();
}, Ko = (r, e = {}, t = {}) => ({ state: n, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = re(r, n.schema);
  return Fo(n, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Yo = (r, e, t = {}) => ({ state: n, commands: i }) => {
  const o = J(r, n.schema), s = J(e, n.schema), l = Lt(n, o, t);
  let a;
  return n.selection.$anchor.sameParent(n.selection.$head) && (a = n.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, { ...a, ...t });
}, Xo = (r, e = {}) => ({ state: t, commands: n }) => {
  const i = J(r, t.schema);
  return Lt(t, i, e) ? n.lift(i) : n.wrapIn(i, e);
}, Zo = () => ({ state: r, dispatch: e }) => {
  const t = r.plugins;
  for (let n = 0; n < t.length; n += 1) {
    const i = t[n];
    let o;
    if (i.spec.isInputRules && (o = i.getState(r))) {
      if (e) {
        const s = r.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, r.schema.text(o.text, a));
        } else
          s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, Qo = () => ({ tr: r, dispatch: e }) => {
  const { selection: t } = r, { empty: n, ranges: i } = t;
  return n || e && i.forEach((o) => {
    r.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, es = (r, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, a = re(r, n.schema), { $from: c, empty: u, ranges: h } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: d, to: p } = l;
    const g = (o = c.marks().find((y) => y.type === a)) === null || o === void 0 ? void 0 : o.attrs, m = hr(c, a, g);
    m && (d = m.from, p = m.to), t.removeMark(d, p, a);
  } else
    h.forEach((d) => {
      t.removeMark(d.$from.pos, d.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, ts = (r, e = {}) => ({ tr: t, state: n, dispatch: i }) => {
  let o = null, s = null;
  const l = yr(typeof r == "string" ? r : r.name, n.schema);
  return l ? (l === "node" && (o = J(r, n.schema)), l === "mark" && (s = re(r, n.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    let h, d, p, g;
    t.selection.empty ? n.doc.nodesBetween(c, u, (m, y) => {
      o && o === m.type && (p = Math.max(y, c), g = Math.min(y + m.nodeSize, u), h = y, d = m);
    }) : n.doc.nodesBetween(c, u, (m, y) => {
      y < c && o && o === m.type && (p = Math.max(y, c), g = Math.min(y + m.nodeSize, u), h = y, d = m), y >= c && y <= u && (o && o === m.type && t.setNodeMarkup(y, void 0, {
        ...m.attrs,
        ...e
      }), s && m.marks.length && m.marks.forEach((S) => {
        if (s === S.type) {
          const I = Math.max(y, c), b = Math.min(y + m.nodeSize, u);
          t.addMark(I, b, s.create({
            ...S.attrs,
            ...e
          }));
        }
      }));
    }), d && (h !== void 0 && t.setNodeMarkup(h, void 0, {
      ...d.attrs,
      ...e
    }), s && d.marks.length && d.marks.forEach((m) => {
      s === m.type && t.addMark(p, g, s.create({
        ...m.attrs,
        ...e
      }));
    }));
  }), !0) : !1;
}, ns = (r, e = {}) => ({ state: t, dispatch: n }) => {
  const i = J(r, t.schema);
  return Ti(i, e)(t, n);
}, rs = (r, e = {}) => ({ state: t, dispatch: n }) => {
  const i = J(r, t.schema);
  return Mi(i, e)(t, n);
};
var is = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: $i,
  clearContent: Wi,
  clearNodes: Ui,
  command: qi,
  createParagraphNear: Hi,
  cut: Gi,
  deleteCurrentNode: Ki,
  deleteNode: Yi,
  deleteRange: Xi,
  deleteSelection: Zi,
  enter: Qi,
  exitCode: eo,
  extendMarkRange: to,
  first: no,
  focus: io,
  forEach: oo,
  insertContent: so,
  insertContentAt: co,
  joinBackward: ho,
  joinDown: fo,
  joinForward: po,
  joinItemBackward: mo,
  joinItemForward: go,
  joinTextblockBackward: yo,
  joinTextblockForward: wo,
  joinUp: uo,
  keyboardShortcut: vo,
  lift: So,
  liftEmptyBlock: ko,
  liftListItem: Eo,
  newlineInCode: bo,
  resetAttributes: Co,
  scrollIntoView: Oo,
  selectAll: To,
  selectNodeBackward: Mo,
  selectNodeForward: Ao,
  selectParentNode: No,
  selectTextblockEnd: Ro,
  selectTextblockStart: Io,
  setContent: Bo,
  setMark: jo,
  setMeta: Vo,
  setNode: Jo,
  setNodeSelection: $o,
  setTextSelection: Wo,
  sinkListItem: Uo,
  splitBlock: qo,
  splitListItem: Ho,
  toggleList: Go,
  toggleMark: Ko,
  toggleNode: Yo,
  toggleWrap: Xo,
  undoInputRule: Zo,
  unsetAllMarks: Qo,
  unsetMark: es,
  updateAttributes: ts,
  wrapIn: ns,
  wrapInList: rs
});
Y.create({
  name: "commands",
  addCommands() {
    return {
      ...is
    };
  }
});
Y.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: new ve("tiptapDrop"),
        props: {
          handleDrop: (r, e, t, n) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: n
            });
          }
        }
      })
    ];
  }
});
Y.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: new ve("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
});
const ss = new ve("focusEvents");
Y.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: r } = this;
    return [
      new xe({
        key: ss,
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              r.isFocused = !0;
              const n = r.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(n), !1;
            },
            blur: (e, t) => {
              r.isFocused = !1;
              const n = r.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(n), !1;
            }
          }
        }
      })
    ];
  }
});
Y.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const r = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: h } = a, { pos: d, parent: p } = h, g = h.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : h, m = g.parent.type.spec.isolating, y = h.pos - h.parentOffset, S = m && g.parent.childCount === 1 ? y === h.pos : A.atStart(c).from === d;
        return !u || !p.type.isTextblock || p.textContent.length || !S || S && h.parent.type.name === "paragraph" ? !1 : s.clearNodes();
      }),
      () => s.deleteSelection(),
      () => s.joinBackward(),
      () => s.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: s }) => [
      () => s.deleteSelection(),
      () => s.deleteCurrentNode(),
      () => s.joinForward(),
      () => s.selectNodeForward()
    ]), n = {
      Enter: () => this.editor.commands.first(({ commands: s }) => [
        () => s.newlineInCode(),
        () => s.createParagraphNear(),
        () => s.liftEmptyBlock(),
        () => s.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: r,
      "Mod-Backspace": r,
      "Shift-Backspace": r,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...n
    }, o = {
      ...n,
      "Ctrl-h": r,
      "Alt-Backspace": r,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return ct() || gr() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new xe({
        key: new ve("clearDocument"),
        appendTransaction: (r, e, t) => {
          if (r.some((m) => m.getMeta("composition")))
            return;
          const n = r.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = r.some((m) => m.getMeta("preventClearDocument"));
          if (!n || i)
            return;
          const { empty: o, from: s, to: l } = e.selection, a = A.atStart(e.doc).from, c = A.atEnd(e.doc).to;
          if (o || !(s === a && l === c) || !wr(t.doc))
            return;
          const d = t.tr, p = cr({
            state: t,
            transaction: d
          }), { commands: g } = new Pi({
            editor: this.editor,
            state: p
          });
          if (g.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
});
Y.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: new ve("tiptapPaste"),
        props: {
          handlePaste: (r, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
});
Y.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new xe({
        key: new ve("tabindex"),
        props: {
          attributes: () => this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class st {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = ee(G(this, "addOptions", {
      name: this.name
    }))), this.storage = ee(G(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new st(e);
  }
  configure(e = {}) {
    const t = this.extend({
      ...this.config,
      addOptions: () => Ft(this.options, e)
    });
    return t.name = this.name, t.parent = this.parent, t;
  }
  extend(e = {}) {
    const t = new st(e);
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = ee(G(t, "addOptions", {
      name: t.name
    })), t.storage = ee(G(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
class ls {
  constructor(e, t, n) {
    this.isDragging = !1, this.component = e, this.editor = t.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...n
    }, this.extension = t.extension, this.node = t.node, this.decorations = t.decorations, this.innerDecorations = t.innerDecorations, this.view = t.view, this.HTMLAttributes = t.HTMLAttributes, this.getPos = t.getPos, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(e) {
    var t, n, i, o, s, l, a;
    const { view: c } = this.editor, u = e.target, h = u.nodeType === 3 ? (t = u.parentElement) === null || t === void 0 ? void 0 : t.closest("[data-drag-handle]") : u.closest("[data-drag-handle]");
    if (!this.dom || !((n = this.contentDOM) === null || n === void 0) && n.contains(u) || !h)
      return;
    let d = 0, p = 0;
    if (this.dom !== h) {
      const I = this.dom.getBoundingClientRect(), b = h.getBoundingClientRect(), k = (i = e.offsetX) !== null && i !== void 0 ? i : (o = e.nativeEvent) === null || o === void 0 ? void 0 : o.offsetX, T = (s = e.offsetY) !== null && s !== void 0 ? s : (l = e.nativeEvent) === null || l === void 0 ? void 0 : l.offsetY;
      d = b.x - I.x + k, p = b.y - I.y + T;
    }
    const g = this.dom.cloneNode(!0);
    (a = e.dataTransfer) === null || a === void 0 || a.setDragImage(g, d, p);
    const m = this.getPos();
    if (typeof m != "number")
      return;
    const y = R.create(c.state.doc, m), S = c.state.tr.setSelection(y);
    c.dispatch(S);
  }
  stopEvent(e) {
    var t;
    if (!this.dom)
      return !1;
    if (typeof this.options.stopEvent == "function")
      return this.options.stopEvent({ event: e });
    const n = e.target;
    if (!(this.dom.contains(n) && !(!((t = this.contentDOM) === null || t === void 0) && t.contains(n))))
      return !1;
    const o = e.type.startsWith("drag"), s = e.type === "drop";
    if ((["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(n.tagName) || n.isContentEditable) && !s && !o)
      return !0;
    const { isEditable: a } = this.editor, { isDragging: c } = this, u = !!this.node.type.spec.draggable, h = R.isSelectable(this.node), d = e.type === "copy", p = e.type === "paste", g = e.type === "cut", m = e.type === "mousedown";
    if (!u && h && o && e.target === this.dom && e.preventDefault(), u && o && !c && e.target === this.dom)
      return e.preventDefault(), !1;
    if (u && a && !c && m) {
      const y = n.closest("[data-drag-handle]");
      y && (this.dom === y || this.dom.contains(y)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(c || s || d || p || g || m && h);
  }
  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(e) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: e }) : this.node.isLeaf || this.node.isAtom ? !0 : e.type === "selection" || this.dom.contains(e.target) && e.type === "childList" && (ct() || pr()) && this.editor.isFocused && [
      ...Array.from(e.addedNodes),
      ...Array.from(e.removedNodes)
    ].every((n) => n.isContentEditable) ? !1 : this.contentDOM === e.target && e.type === "attributes" ? !0 : !this.contentDOM.contains(e.target);
  }
  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(e) {
    this.editor.commands.command(({ tr: t }) => {
      const n = this.getPos();
      return typeof n != "number" ? !1 : (t.setNodeMarkup(n, void 0, {
        ...this.node.attrs,
        ...e
      }), !0);
    });
  }
  /**
   * Delete the node.
   */
  deleteNode() {
    const e = this.getPos();
    if (typeof e != "number")
      return;
    const t = e + this.node.nodeSize;
    this.editor.commands.deleteRange({ from: e, to: t });
  }
}
var Nt = { exports: {} }, kt = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var En;
function as() {
  if (En)
    return kt;
  En = 1;
  var r = D;
  function e(h, d) {
    return h === d && (h !== 0 || 1 / h === 1 / d) || h !== h && d !== d;
  }
  var t = typeof Object.is == "function" ? Object.is : e, n = r.useState, i = r.useEffect, o = r.useLayoutEffect, s = r.useDebugValue;
  function l(h, d) {
    var p = d(), g = n({ inst: { value: p, getSnapshot: d } }), m = g[0].inst, y = g[1];
    return o(function() {
      m.value = p, m.getSnapshot = d, a(m) && y({ inst: m });
    }, [h, p, d]), i(function() {
      return a(m) && y({ inst: m }), h(function() {
        a(m) && y({ inst: m });
      });
    }, [h]), s(p), p;
  }
  function a(h) {
    var d = h.getSnapshot;
    h = h.value;
    try {
      var p = d();
      return !t(h, p);
    } catch {
      return !0;
    }
  }
  function c(h, d) {
    return d();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? c : l;
  return kt.useSyncExternalStore = r.useSyncExternalStore !== void 0 ? r.useSyncExternalStore : u, kt;
}
var Et = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bn;
function cs() {
  return bn || (bn = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var r = D, e = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function t(b) {
      {
        for (var k = arguments.length, T = new Array(k > 1 ? k - 1 : 0), C = 1; C < k; C++)
          T[C - 1] = arguments[C];
        n("error", b, T);
      }
    }
    function n(b, k, T) {
      {
        var C = e.ReactDebugCurrentFrame, N = C.getStackAddendum();
        N !== "" && (k += "%s", T = T.concat([N]));
        var B = T.map(function(L) {
          return String(L);
        });
        B.unshift("Warning: " + k), Function.prototype.apply.call(console[b], console, B);
      }
    }
    function i(b, k) {
      return b === k && (b !== 0 || 1 / b === 1 / k) || b !== b && k !== k;
    }
    var o = typeof Object.is == "function" ? Object.is : i, s = r.useState, l = r.useEffect, a = r.useLayoutEffect, c = r.useDebugValue, u = !1, h = !1;
    function d(b, k, T) {
      u || r.startTransition !== void 0 && (u = !0, t("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var C = k();
      if (!h) {
        var N = k();
        o(C, N) || (t("The result of getSnapshot should be cached to avoid an infinite loop"), h = !0);
      }
      var B = s({
        inst: {
          value: C,
          getSnapshot: k
        }
      }), L = B[0].inst, te = B[1];
      return a(function() {
        L.value = C, L.getSnapshot = k, p(L) && te({
          inst: L
        });
      }, [b, C, k]), l(function() {
        p(L) && te({
          inst: L
        });
        var ie = function() {
          p(L) && te({
            inst: L
          });
        };
        return b(ie);
      }, [b]), c(C), C;
    }
    function p(b) {
      var k = b.getSnapshot, T = b.value;
      try {
        var C = k();
        return !o(T, C);
      } catch {
        return !0;
      }
    }
    function g(b, k, T) {
      return k();
    }
    var m = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", y = !m, S = y ? g : d, I = r.useSyncExternalStore !== void 0 ? r.useSyncExternalStore : S;
    Et.useSyncExternalStore = I, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Et;
}
process.env.NODE_ENV === "production" ? Nt.exports = as() : Nt.exports = cs();
var Vt = Nt.exports;
const us = (...r) => (e) => {
  r.forEach((t) => {
    typeof t == "function" ? t(e) : t && (t.current = e);
  });
}, fs = ({ contentComponent: r }) => {
  const e = Vt.useSyncExternalStore(r.subscribe, r.getSnapshot, r.getServerSnapshot);
  return D.createElement(D.Fragment, null, Object.values(e));
};
function hs() {
  const r = /* @__PURE__ */ new Set();
  let e = {};
  return {
    /**
     * Subscribe to the editor instance's changes.
     */
    subscribe(t) {
      return r.add(t), () => {
        r.delete(t);
      };
    },
    getSnapshot() {
      return e;
    },
    getServerSnapshot() {
      return e;
    },
    /**
     * Adds a new NodeView Renderer to the editor.
     */
    setRenderer(t, n) {
      e = {
        ...e,
        [t]: Mr.createPortal(n.reactElement, n.element, t)
      }, r.forEach((i) => i());
    },
    /**
     * Removes a NodeView Renderer from the editor.
     */
    removeRenderer(t) {
      const n = { ...e };
      delete n[t], e = n, r.forEach((i) => i());
    }
  };
}
class ds extends D.Component {
  constructor(e) {
    var t;
    super(e), this.editorContentRef = D.createRef(), this.initialized = !1, this.state = {
      hasContentComponentInitialized: !!(!((t = e.editor) === null || t === void 0) && t.contentComponent)
    };
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    const e = this.props.editor;
    if (e && !e.isDestroyed && e.options.element) {
      if (e.contentComponent)
        return;
      const t = this.editorContentRef.current;
      t.append(...e.options.element.childNodes), e.setOptions({
        element: t
      }), e.contentComponent = hs(), this.state.hasContentComponentInitialized || (this.unsubscribeToContentComponent = e.contentComponent.subscribe(() => {
        this.setState((n) => n.hasContentComponentInitialized ? n : {
          hasContentComponentInitialized: !0
        }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent();
      })), e.createNodeViews(), this.initialized = !0;
    }
  }
  componentWillUnmount() {
    const e = this.props.editor;
    if (!e || (this.initialized = !1, e.isDestroyed || e.view.setProps({
      nodeViews: {}
    }), this.unsubscribeToContentComponent && this.unsubscribeToContentComponent(), e.contentComponent = null, !e.options.element.firstChild))
      return;
    const t = document.createElement("div");
    t.append(...e.options.element.childNodes), e.setOptions({
      element: t
    });
  }
  render() {
    const { editor: e, innerRef: t, ...n } = this.props;
    return D.createElement(
      D.Fragment,
      null,
      D.createElement("div", { ref: us(t, this.editorContentRef), ...n }),
      (e == null ? void 0 : e.contentComponent) && D.createElement(fs, { contentComponent: e.contentComponent })
    );
  }
}
const ps = Or((r, e) => {
  const t = D.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [r.editor]);
  return D.createElement(ds, {
    key: t,
    innerRef: e,
    ...r
  });
});
D.memo(ps);
var bt = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cn;
function ms() {
  if (Cn)
    return bt;
  Cn = 1;
  var r = D, e = Vt;
  function t(c, u) {
    return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
  }
  var n = typeof Object.is == "function" ? Object.is : t, i = e.useSyncExternalStore, o = r.useRef, s = r.useEffect, l = r.useMemo, a = r.useDebugValue;
  return bt.useSyncExternalStoreWithSelector = function(c, u, h, d, p) {
    var g = o(null);
    if (g.current === null) {
      var m = { hasValue: !1, value: null };
      g.current = m;
    } else
      m = g.current;
    g = l(function() {
      function S(C) {
        if (!I) {
          if (I = !0, b = C, C = d(C), p !== void 0 && m.hasValue) {
            var N = m.value;
            if (p(N, C))
              return k = N;
          }
          return k = C;
        }
        if (N = k, n(b, C))
          return N;
        var B = d(C);
        return p !== void 0 && p(N, B) ? N : (b = C, k = B);
      }
      var I = !1, b, k, T = h === void 0 ? null : h;
      return [function() {
        return S(u());
      }, T === null ? void 0 : function() {
        return S(T());
      }];
    }, [u, h, d, p]);
    var y = i(c, g[0], g[1]);
    return s(function() {
      m.hasValue = !0, m.value = y;
    }, [y]), a(y), y;
  }, bt;
}
var Ct = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var On;
function gs() {
  return On || (On = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var r = D, e = Vt;
    function t(u, h) {
      return u === h && (u !== 0 || 1 / u === 1 / h) || u !== u && h !== h;
    }
    var n = typeof Object.is == "function" ? Object.is : t, i = e.useSyncExternalStore, o = r.useRef, s = r.useEffect, l = r.useMemo, a = r.useDebugValue;
    function c(u, h, d, p, g) {
      var m = o(null), y;
      m.current === null ? (y = {
        hasValue: !1,
        value: null
      }, m.current = y) : y = m.current;
      var S = l(function() {
        var T = !1, C, N, B = function(X) {
          if (!T) {
            T = !0, C = X;
            var oe = p(X);
            if (g !== void 0 && y.hasValue) {
              var se = y.value;
              if (g(se, oe))
                return N = se, se;
            }
            return N = oe, oe;
          }
          var Me = C, Ae = N;
          if (n(Me, X))
            return Ae;
          var Se = p(X);
          return g !== void 0 && g(Ae, Se) ? Ae : (C = X, N = Se, Se);
        }, L = d === void 0 ? null : d, te = function() {
          return B(h());
        }, ie = L === null ? void 0 : function() {
          return B(L());
        };
        return [te, ie];
      }, [h, d, p, g]), I = S[0], b = S[1], k = i(u, I, b);
      return s(function() {
        y.hasValue = !0, y.value = k;
      }, [k]), a(k), k;
    }
    Ct.useSyncExternalStoreWithSelector = c, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ct;
}
process.env.NODE_ENV === "production" ? ms() : gs();
process.env.NODE_ENV;
const ys = Nn({
  editor: null
});
ys.Consumer;
const xr = Nn({
  onDragStart: void 0
}), ws = () => Tr(xr);
D.forwardRef((r, e) => {
  const { onDragStart: t } = ws(), n = r.as || "div";
  return (
    // @ts-ignore
    D.createElement(n, { ...r, ref: e, "data-node-view-wrapper": "", onDragStart: t, style: {
      whiteSpace: "normal",
      ...r.style
    } })
  );
});
function xs(r) {
  return !!(typeof r == "function" && r.prototype && r.prototype.isReactComponent);
}
function vs(r) {
  var e;
  return typeof r == "object" && ((e = r.$$typeof) === null || e === void 0 ? void 0 : e.toString()) === "Symbol(react.forward_ref)";
}
class Ss {
  /**
   * Immediately creates element and renders the provided React component.
   */
  constructor(e, { editor: t, props: n = {}, as: i = "div", className: o = "" }) {
    this.ref = null, this.id = Math.floor(Math.random() * 4294967295).toString(), this.component = e, this.editor = t, this.props = n, this.element = document.createElement(i), this.element.classList.add("react-renderer"), o && this.element.classList.add(...o.split(" ")), this.editor.isInitialized ? Ar(() => {
      this.render();
    }) : this.render();
  }
  /**
   * Render the React component.
   */
  render() {
    var e;
    const t = this.component, n = this.props, i = this.editor;
    (xs(t) || vs(t)) && (n.ref = (o) => {
      this.ref = o;
    }), this.reactElement = D.createElement(t, { ...n }), (e = i == null ? void 0 : i.contentComponent) === null || e === void 0 || e.setRenderer(this.id, this);
  }
  /**
   * Re-renders the React component with new props.
   */
  updateProps(e = {}) {
    this.props = {
      ...this.props,
      ...e
    }, this.render();
  }
  /**
   * Destroy the React component.
   */
  destroy() {
    var e;
    const t = this.editor;
    (e = t == null ? void 0 : t.contentComponent) === null || e === void 0 || e.removeRenderer(this.id);
  }
  /**
   * Update the attributes of the element that holds the React component.
   */
  updateAttributes(e) {
    Object.keys(e).forEach((t) => {
      this.element.setAttribute(t, e[t]);
    });
  }
}
class ks extends ls {
  /**
   * Setup the React component.
   * Called on initialization.
   */
  mount() {
    const e = {
      editor: this.editor,
      node: this.node,
      decorations: this.decorations,
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: !1,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (c = {}) => this.updateAttributes(c),
      deleteNode: () => this.deleteNode()
    };
    if (!this.component.displayName) {
      const c = (u) => u.charAt(0).toUpperCase() + u.substring(1);
      this.component.displayName = c(this.extension.name);
    }
    const i = { onDragStart: this.onDragStart.bind(this), nodeViewContentRef: (c) => {
      c && this.contentDOMElement && c.firstChild !== this.contentDOMElement && c.appendChild(this.contentDOMElement);
    } }, o = this.component, s = D.memo((c) => D.createElement(xr.Provider, { value: i }, D.createElement(o, c)));
    s.displayName = "ReactNodeView", this.node.isLeaf ? this.contentDOMElement = null : this.options.contentDOMElementTag ? this.contentDOMElement = document.createElement(this.options.contentDOMElementTag) : this.contentDOMElement = document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement && (this.contentDOMElement.dataset.nodeViewContentReact = "", this.contentDOMElement.style.whiteSpace = "inherit");
    let l = this.node.isInline ? "span" : "div";
    this.options.as && (l = this.options.as);
    const { className: a = "" } = this.options;
    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.renderer = new Ss(s, {
      editor: this.editor,
      props: e,
      as: l,
      className: `node-${this.node.type.name} ${a}`.trim()
    }), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.updateElementAttributes();
  }
  /**
   * Return the DOM element.
   * This is the element that will be used to display the node view.
   */
  get dom() {
    var e;
    if (this.renderer.element.firstElementChild && !(!((e = this.renderer.element.firstElementChild) === null || e === void 0) && e.hasAttribute("data-node-view-wrapper")))
      throw Error("Please use the NodeViewWrapper component for your node view.");
    return this.renderer.element;
  }
  /**
   * Return the content DOM element.
   * This is the element that will be used to display the rich-text content of the node.
   */
  get contentDOM() {
    return this.node.isLeaf ? null : this.contentDOMElement;
  }
  /**
   * On editor selection update, check if the node is selected.
   * If it is, call `selectNode`, otherwise call `deselectNode`.
   */
  handleSelectionUpdate() {
    const { from: e, to: t } = this.editor.state.selection, n = this.getPos();
    if (typeof n == "number")
      if (e <= n && t >= n + this.node.nodeSize) {
        if (this.renderer.props.selected)
          return;
        this.selectNode();
      } else {
        if (!this.renderer.props.selected)
          return;
        this.deselectNode();
      }
  }
  /**
   * On update, update the React component.
   * To prevent unnecessary updates, the `update` option can be used.
   */
  update(e, t, n) {
    const i = (o) => {
      this.renderer.updateProps(o), typeof this.options.attrs == "function" && this.updateElementAttributes();
    };
    if (e.type !== this.node.type)
      return !1;
    if (typeof this.options.update == "function") {
      const o = this.node, s = this.decorations, l = this.innerDecorations;
      return this.node = e, this.decorations = t, this.innerDecorations = n, this.options.update({
        oldNode: o,
        oldDecorations: s,
        newNode: e,
        newDecorations: t,
        oldInnerDecorations: l,
        innerDecorations: n,
        updateProps: () => i({ node: e, decorations: t, innerDecorations: n })
      });
    }
    return e === this.node && this.decorations === t && this.innerDecorations === n || (this.node = e, this.decorations = t, this.innerDecorations = n, i({ node: e, decorations: t, innerDecorations: n })), !0;
  }
  /**
   * Select the node.
   * Add the `selected` prop and the `ProseMirror-selectednode` class.
   */
  selectNode() {
    this.renderer.updateProps({
      selected: !0
    }), this.renderer.element.classList.add("ProseMirror-selectednode");
  }
  /**
   * Deselect the node.
   * Remove the `selected` prop and the `ProseMirror-selectednode` class.
   */
  deselectNode() {
    this.renderer.updateProps({
      selected: !1
    }), this.renderer.element.classList.remove("ProseMirror-selectednode");
  }
  /**
   * Destroy the React component instance.
   */
  destroy() {
    this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate), this.contentDOMElement = null;
  }
  /**
   * Update the attributes of the top-level element that holds the React component.
   * Applying the attributes defined in the `attrs` option.
   */
  updateElementAttributes() {
    if (this.options.attrs) {
      let e = {};
      if (typeof this.options.attrs == "function") {
        const t = this.editor.extensionManager.attributes, n = Di(this.node, t);
        e = this.options.attrs({ node: this.node, HTMLAttributes: n });
      } else
        e = this.options.attrs;
      this.renderer.updateAttributes(e);
    }
  }
}
function Es(r, e) {
  return (t) => t.editor.contentComponent ? new ks(r, t, e) : {};
}
var Rt = { exports: {} }, Ie = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tn;
function bs() {
  if (Tn)
    return Ie;
  Tn = 1;
  var r = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function t(n, i, o) {
    var s = null;
    if (o !== void 0 && (s = "" + o), i.key !== void 0 && (s = "" + i.key), "key" in i) {
      o = {};
      for (var l in i)
        l !== "key" && (o[l] = i[l]);
    } else
      o = i;
    return i = o.ref, {
      $$typeof: r,
      type: n,
      key: s,
      ref: i !== void 0 ? i : null,
      props: o
    };
  }
  return Ie.Fragment = e, Ie.jsx = t, Ie.jsxs = t, Ie;
}
var ze = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mn;
function Cs() {
  return Mn || (Mn = 1, process.env.NODE_ENV !== "production" && function() {
    function r(f) {
      if (f == null)
        return null;
      if (typeof f == "function")
        return f.$$typeof === vr ? null : f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case C:
          return "Fragment";
        case T:
          return "Portal";
        case B:
          return "Profiler";
        case N:
          return "StrictMode";
        case X:
          return "Suspense";
        case oe:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (typeof f.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), f.$$typeof) {
          case te:
            return (f.displayName || "Context") + ".Provider";
          case L:
            return (f._context.displayName || "Context") + ".Consumer";
          case ie:
            var x = f.render;
            return f = f.displayName, f || (f = x.displayName || x.name || "", f = f !== "" ? "ForwardRef(" + f + ")" : "ForwardRef"), f;
          case se:
            return x = f.displayName || null, x !== null ? x : r(f.type) || "Memo";
          case Me:
            x = f._payload, f = f._init;
            try {
              return r(f(x));
            } catch {
            }
        }
      return null;
    }
    function e(f) {
      return "" + f;
    }
    function t(f) {
      try {
        e(f);
        var x = !1;
      } catch {
        x = !0;
      }
      if (x) {
        x = console;
        var v = x.error, M = typeof Symbol == "function" && Symbol.toStringTag && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return v.call(
          x,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          M
        ), e(f);
      }
    }
    function n() {
    }
    function i() {
      if (Ne === 0) {
        $t = console.log, Wt = console.info, Ut = console.warn, qt = console.error, Ht = console.group, Gt = console.groupCollapsed, Kt = console.groupEnd;
        var f = {
          configurable: !0,
          enumerable: !0,
          value: n,
          writable: !0
        };
        Object.defineProperties(console, {
          info: f,
          log: f,
          warn: f,
          error: f,
          group: f,
          groupCollapsed: f,
          groupEnd: f
        });
      }
      Ne++;
    }
    function o() {
      if (Ne--, Ne === 0) {
        var f = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: ae({}, f, { value: $t }),
          info: ae({}, f, { value: Wt }),
          warn: ae({}, f, { value: Ut }),
          error: ae({}, f, { value: qt }),
          group: ae({}, f, { value: Ht }),
          groupCollapsed: ae({}, f, { value: Gt }),
          groupEnd: ae({}, f, { value: Kt })
        });
      }
      0 > Ne && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function s(f) {
      if (ft === void 0)
        try {
          throw Error();
        } catch (v) {
          var x = v.stack.trim().match(/\n( *(at )?)/);
          ft = x && x[1] || "", Yt = -1 < v.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < v.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + ft + f + Yt;
    }
    function l(f, x) {
      if (!f || ht)
        return "";
      var v = dt.get(f);
      if (v !== void 0)
        return v;
      ht = !0, v = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var M = null;
      M = le.H, le.H = null, i();
      try {
        var V = {
          DetermineComponentFrameRoot: function() {
            try {
              if (x) {
                var ne = function() {
                  throw Error();
                };
                if (Object.defineProperty(ne.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(ne, []);
                  } catch (Q) {
                    var $e = Q;
                  }
                  Reflect.construct(f, [], ne);
                } else {
                  try {
                    ne.call();
                  } catch (Q) {
                    $e = Q;
                  }
                  f.call(ne.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Q) {
                  $e = Q;
                }
                (ne = f()) && typeof ne.catch == "function" && ne.catch(function() {
                });
              }
            } catch (Q) {
              if (Q && $e && typeof Q.stack == "string")
                return [Q.stack, $e.stack];
            }
            return [null, null];
          }
        };
        V.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var P = Object.getOwnPropertyDescriptor(
          V.DetermineComponentFrameRoot,
          "name"
        );
        P && P.configurable && Object.defineProperty(
          V.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var O = V.DetermineComponentFrameRoot(), Z = O[0], ke = O[1];
        if (Z && ke) {
          var W = Z.split(`
`), ce = ke.split(`
`);
          for (O = P = 0; P < W.length && !W[P].includes(
            "DetermineComponentFrameRoot"
          ); )
            P++;
          for (; O < ce.length && !ce[O].includes(
            "DetermineComponentFrameRoot"
          ); )
            O++;
          if (P === W.length || O === ce.length)
            for (P = W.length - 1, O = ce.length - 1; 1 <= P && 0 <= O && W[P] !== ce[O]; )
              O--;
          for (; 1 <= P && 0 <= O; P--, O--)
            if (W[P] !== ce[O]) {
              if (P !== 1 || O !== 1)
                do
                  if (P--, O--, 0 > O || W[P] !== ce[O]) {
                    var Re = `
` + W[P].replace(
                      " at new ",
                      " at "
                    );
                    return f.displayName && Re.includes("<anonymous>") && (Re = Re.replace("<anonymous>", f.displayName)), typeof f == "function" && dt.set(f, Re), Re;
                  }
                while (1 <= P && 0 <= O);
              break;
            }
        }
      } finally {
        ht = !1, le.H = M, o(), Error.prepareStackTrace = v;
      }
      return W = (W = f ? f.displayName || f.name : "") ? s(W) : "", typeof f == "function" && dt.set(f, W), W;
    }
    function a(f) {
      if (f == null)
        return "";
      if (typeof f == "function") {
        var x = f.prototype;
        return l(
          f,
          !(!x || !x.isReactComponent)
        );
      }
      if (typeof f == "string")
        return s(f);
      switch (f) {
        case X:
          return s("Suspense");
        case oe:
          return s("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case ie:
            return f = l(f.render, !1), f;
          case se:
            return a(f.type);
          case Me:
            x = f._payload, f = f._init;
            try {
              return a(f(x));
            } catch {
            }
        }
      return "";
    }
    function c() {
      var f = le.A;
      return f === null ? null : f.getOwner();
    }
    function u(f) {
      if (Jt.call(f, "key")) {
        var x = Object.getOwnPropertyDescriptor(f, "key").get;
        if (x && x.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function h(f, x) {
      function v() {
        Xt || (Xt = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          x
        ));
      }
      v.isReactWarning = !0, Object.defineProperty(f, "key", {
        get: v,
        configurable: !0
      });
    }
    function d() {
      var f = r(this.type);
      return Zt[f] || (Zt[f] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), f = this.props.ref, f !== void 0 ? f : null;
    }
    function p(f, x, v, M, V, P) {
      return v = P.ref, f = {
        $$typeof: k,
        type: f,
        key: x,
        props: P,
        _owner: V
      }, (v !== void 0 ? v : null) !== null ? Object.defineProperty(f, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(f, "ref", { enumerable: !1, value: null }), f._store = {}, Object.defineProperty(f._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(f, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    }
    function g(f, x, v, M, V, P) {
      if (typeof f == "string" || typeof f == "function" || f === C || f === B || f === N || f === X || f === oe || f === Ae || typeof f == "object" && f !== null && (f.$$typeof === Me || f.$$typeof === se || f.$$typeof === te || f.$$typeof === L || f.$$typeof === ie || f.$$typeof === Sr || f.getModuleId !== void 0)) {
        var O = x.children;
        if (O !== void 0)
          if (M)
            if (ut(O)) {
              for (M = 0; M < O.length; M++)
                m(O[M], f);
              Object.freeze && Object.freeze(O);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else
            m(O, f);
      } else
        O = "", (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), f === null ? M = "null" : ut(f) ? M = "array" : f !== void 0 && f.$$typeof === k ? (M = "<" + (r(f.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : M = typeof f, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          M,
          O
        );
      if (Jt.call(x, "key")) {
        O = r(f);
        var Z = Object.keys(x).filter(function(W) {
          return W !== "key";
        });
        M = 0 < Z.length ? "{key: someKey, " + Z.join(": ..., ") + ": ...}" : "{key: someKey}", Qt[O + M] || (Z = 0 < Z.length ? "{" + Z.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          M,
          O,
          Z,
          O
        ), Qt[O + M] = !0);
      }
      if (O = null, v !== void 0 && (t(v), O = "" + v), u(x) && (t(x.key), O = "" + x.key), "key" in x) {
        v = {};
        for (var ke in x)
          ke !== "key" && (v[ke] = x[ke]);
      } else
        v = x;
      return O && h(
        v,
        typeof f == "function" ? f.displayName || f.name || "Unknown" : f
      ), p(f, O, P, V, c(), v);
    }
    function m(f, x) {
      if (typeof f == "object" && f && f.$$typeof !== kr) {
        if (ut(f))
          for (var v = 0; v < f.length; v++) {
            var M = f[v];
            y(M) && S(M, x);
          }
        else if (y(f))
          f._store && (f._store.validated = 1);
        else if (f === null || typeof f != "object" ? v = null : (v = Se && f[Se] || f["@@iterator"], v = typeof v == "function" ? v : null), typeof v == "function" && v !== f.entries && (v = v.call(f), v !== f))
          for (; !(f = v.next()).done; )
            y(f.value) && S(f.value, x);
      }
    }
    function y(f) {
      return typeof f == "object" && f !== null && f.$$typeof === k;
    }
    function S(f, x) {
      if (f._store && !f._store.validated && f.key == null && (f._store.validated = 1, x = I(x), !en[x])) {
        en[x] = !0;
        var v = "";
        f && f._owner != null && f._owner !== c() && (v = null, typeof f._owner.tag == "number" ? v = r(f._owner.type) : typeof f._owner.name == "string" && (v = f._owner.name), v = " It was passed a child from " + v + ".");
        var M = le.getCurrentStack;
        le.getCurrentStack = function() {
          var V = a(f.type);
          return M && (V += M() || ""), V;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          x,
          v
        ), le.getCurrentStack = M;
      }
    }
    function I(f) {
      var x = "", v = c();
      return v && (v = r(v.type)) && (x = `

Check the render method of \`` + v + "`."), x || (f = r(f)) && (x = `

Check the top-level render call using <` + f + ">."), x;
    }
    var b = D, k = Symbol.for("react.transitional.element"), T = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), B = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), te = Symbol.for("react.context"), ie = Symbol.for("react.forward_ref"), X = Symbol.for("react.suspense"), oe = Symbol.for("react.suspense_list"), se = Symbol.for("react.memo"), Me = Symbol.for("react.lazy"), Ae = Symbol.for("react.offscreen"), Se = Symbol.iterator, vr = Symbol.for("react.client.reference"), le = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jt = Object.prototype.hasOwnProperty, ae = Object.assign, Sr = Symbol.for("react.client.reference"), ut = Array.isArray, Ne = 0, $t, Wt, Ut, qt, Ht, Gt, Kt;
    n.__reactDisabledLog = !0;
    var ft, Yt, ht = !1, dt = new (typeof WeakMap == "function" ? WeakMap : Map)(), kr = Symbol.for("react.client.reference"), Xt, Zt = {}, Qt = {}, en = {};
    ze.Fragment = C, ze.jsx = function(f, x, v, M, V) {
      return g(f, x, v, !1, M, V);
    }, ze.jsxs = function(f, x, v, M, V) {
      return g(f, x, v, !0, M, V);
    };
  }()), ze;
}
process.env.NODE_ENV === "production" ? Rt.exports = bs() : Rt.exports = Cs();
var An = Rt.exports;
const Os = (r) => {
  const { node: e } = r, t = e.attrs.label ?? "Click me", n = e.attrs.href, i = (o) => {
    o.preventDefault(), console.log("Button in editor clicked", e), n && window.open(n, "_blank");
  };
  return /* @__PURE__ */ An.jsx("div", { "data-custom-button-view": !0, className: "inline-block", children: /* @__PURE__ */ An.jsx(
    "button",
    {
      className: "px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors",
      onClick: i,
      type: "button",
      children: t
    }
  ) });
}, Ts = st.create({
  name: "customButton",
  group: "inline",
  inline: !0,
  atom: !0,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      label: {
        default: "Click me",
        parseHTML: (r) => r.getAttribute("data-label"),
        renderHTML: (r) => r.label ? { "data-label": r.label } : {}
      },
      href: {
        default: null,
        parseHTML: (r) => r.getAttribute("href"),
        renderHTML: (r) => r.href ? { href: r.href } : {}
      }
    };
  },
  parseHTML() {
    return [{ tag: "button[data-custom-button]" }];
  },
  renderHTML({ HTMLAttributes: r }) {
    return [
      "button",
      ur(this.options.HTMLAttributes, r, {
        "data-custom-button": "",
        class: "umb-button"
      }),
      r.label || "Button"
    ];
  },
  addNodeView() {
    return Es(Os);
  },
  addCommands() {
    return {
      setButton: (r) => ({ commands: e }) => e.insertContent({
        type: this.name,
        attrs: r
      })
    };
  }
});
class Is extends Cr {
  constructor() {
    super(...arguments);
    tn(this, "getTiptapExtensions", () => [Ts]);
  }
}
export {
  Is as default
};
//# sourceMappingURL=button.tiptap-api-690e48e0.mjs.map

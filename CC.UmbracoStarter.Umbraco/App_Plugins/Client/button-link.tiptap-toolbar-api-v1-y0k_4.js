var g = (i) => {
  throw TypeError(i);
};
var U = (i, o, t) => o.has(i) || g("Cannot " + t);
var A = (i, o, t) => o.has(i) ? g("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(i) : o.set(i, t);
var c = (i, o, t) => (U(i, o, "access private method"), t);
import { UmbLink as d } from "@umbraco-cms/backoffice/external/tiptap";
import { UmbModalToken as O, UMB_MODAL_MANAGER_CONTEXT as _ } from "@umbraco-cms/backoffice/modal";
import { UmbTiptapToolbarElementApiBase as w } from "@umbraco-cms/backoffice/tiptap";
import { B as N } from "./manifests-D-Uks58K.js";
const v = new O(N, {
  modal: {
    type: "sidebar",
    size: "medium"
  }
});
var e, L, b, k, x, T, M, B;
class I extends w {
  constructor() {
    super(...arguments);
    A(this, e);
  }
  async execute(t) {
    var u;
    const s = (t == null ? void 0 : t.getAttributes(d.name)) ?? {};
    let n = c(this, e, L).call(this, s);
    const m = { config: {}, index: null, isNew: (n == null ? void 0 : n.url) === void 0 }, r = { link: n }, p = ((u = this.configuration) == null ? void 0 : u.getValueByAlias("overlaySize")) ?? "small", a = (await this.getContext(_)).open(this, v, {
      data: m,
      value: r,
      modal: { size: p }
    });
    if (!a) return;
    const l = await a.onSubmit().catch(() => {
    });
    if (!(l != null && l.link)) return;
    n = l.link;
    const h = c(this, e, b).call(this, n);
    h ? t == null || t.chain().focus().extendMarkRange(d.name).setButtonLink(h).run() : t == null || t.chain().focus().extendMarkRange(d.name).unsetButtonLink().run();
  }
}
e = new WeakSet(), L = function(t) {
  var r;
  const s = t["data-anchor"], n = (r = t.href) == null ? void 0 : r.substring(
    0,
    t.href.length - ((s == null ? void 0 : s.length) ?? 0)
  ), m = n != null && n.includes("localLink:") ? n.substring(n.indexOf(":") + 1, n.indexOf("}")) : null;
  return {
    name: t.title,
    queryString: s,
    target: t.target,
    type: t.type,
    unique: m,
    url: n
  };
}, b = function(t) {
  const { name: s, target: n, type: m, unique: r, backgroundColor: p } = t;
  let { queryString: f, url: a } = t;
  if (f = c(this, e, B).call(this, f), !f) {
    const u = c(this, e, k).call(this, a, f);
    a = u.url, f = u.queryString;
  }
  r ? a = `/{localLink:${r}}` : (a = c(this, e, T).call(this, a), a = c(this, e, x).call(this, a));
  const l = c(this, e, M).call(this, f);
  if (l && (a = (a ?? "") + l), !a) return null;
  const h = {};
  return p && (h["--color-background"] = p), {
    type: m ?? "external",
    href: a,
    class: "btn",
    style: h,
    "data-anchor": l,
    target: n,
    title: s ?? a
  };
}, k = function(t, s) {
  const n = t == null ? void 0 : t.split(/([#?])/);
  return (n == null ? void 0 : n.length) === 3 && (t = n[0], s = n[1] + n[2]), { url: t, queryString: s };
}, /**
 * If the URL is prefixed "www.", then prepend "http://" protocol scheme.
 * @param url
 */
x = function(t) {
  return t ? (/^\s*www\./i.test(t) && (t = `http://${t}`), t) : null;
}, /**
 * If the URL is an email address, then prepend "mailto:" protocol scheme.
 * @param url
 */
T = function(t) {
  return t ? (t != null && t.includes("@") && !t.includes("//") && !t.includes(":") && (t = `mailto:${t}`), t) : null;
}, /**
 * If the URL contains an anchor, then return the anchor.
 * @param queryString
 */
M = function(t) {
  return t && (t.startsWith("#") || t.startsWith("?")) ? t : null;
}, /**
 * If the query string does not start with "?" or "#", then prepend it.
 * @param queryString
 */
B = function(t) {
  return t ? (!t.startsWith("?") && !t.startsWith("#") && (t = (t.startsWith("=") ? "#" : "?") + t), t) : null;
};
export {
  I as default
};
//# sourceMappingURL=button-link.tiptap-toolbar-api-v1-y0k_4.js.map

var Ce = Object.defineProperty;
var Re = (n, l, c) => l in n ? Ce(n, l, { enumerable: !0, configurable: !0, writable: !0, value: c }) : n[l] = c;
var ce = (n, l, c) => (Re(n, typeof l != "symbol" ? l + "" : l, c), c);
import { UmbTiptapExtensionApiBase as ke } from "@umbraco-cms/backoffice/tiptap";
import { Node as Ae, mergeAttributes as je } from "@tiptap/core";
import { ReactNodeViewRenderer as Ne } from "@tiptap/react";
import Oe from "react";
var L = { exports: {} }, C = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe;
function Se() {
  if (fe)
    return C;
  fe = 1;
  var n = Symbol.for("react.transitional.element"), l = Symbol.for("react.fragment");
  function c(g, f, d) {
    var v = null;
    if (d !== void 0 && (v = "" + d), f.key !== void 0 && (v = "" + f.key), "key" in f) {
      d = {};
      for (var w in f)
        w !== "key" && (d[w] = f[w]);
    } else
      d = f;
    return f = d.ref, {
      $$typeof: n,
      type: g,
      key: v,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return C.Fragment = l, C.jsx = c, C.jsxs = c, C;
}
var R = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var de;
function Pe() {
  return de || (de = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null)
        return null;
      if (typeof e == "function")
        return e.$$typeof === xe ? null : e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case S:
          return "Fragment";
        case _e:
          return "Portal";
        case X:
          return "Profiler";
        case J:
          return "StrictMode";
        case M:
          return "Suspense";
        case Y:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case Z:
            return (e.displayName || "Context") + ".Provider";
          case F:
            return (e._context.displayName || "Context") + ".Consumer";
          case P:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case $:
            return r = e.displayName || null, r !== null ? r : n(e.type) || "Memo";
          case W:
            r = e._payload, e = e._init;
            try {
              return n(e(r));
            } catch {
            }
        }
      return null;
    }
    function l(e) {
      return "" + e;
    }
    function c(e) {
      try {
        l(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, a = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          a
        ), l(e);
      }
    }
    function g() {
    }
    function f() {
      if (h === 0) {
        K = console.log, D = console.info, ee = console.warn, re = console.error, te = console.group, oe = console.groupCollapsed, ne = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: g,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      h++;
    }
    function d() {
      if (h--, h === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: T({}, e, { value: K }),
          info: T({}, e, { value: D }),
          warn: T({}, e, { value: ee }),
          error: T({}, e, { value: re }),
          group: T({}, e, { value: te }),
          groupCollapsed: T({}, e, { value: oe }),
          groupEnd: T({}, e, { value: ne })
        });
      }
      0 > h && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function v(e) {
      if (B === void 0)
        try {
          throw Error();
        } catch (t) {
          var r = t.stack.trim().match(/\n( *(at )?)/);
          B = r && r[1] || "", ae = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + B + e + ae;
    }
    function w(e, r) {
      if (!e || H)
        return "";
      var t = V.get(e);
      if (t !== void 0)
        return t;
      H = !0, t = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var a = null;
      a = p.H, p.H = null, f();
      try {
        var i = {
          DetermineComponentFrameRoot: function() {
            try {
              if (r) {
                var m = function() {
                  throw Error();
                };
                if (Object.defineProperty(m.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(m, []);
                  } catch (E) {
                    var k = E;
                  }
                  Reflect.construct(e, [], m);
                } else {
                  try {
                    m.call();
                  } catch (E) {
                    k = E;
                  }
                  e.call(m.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (E) {
                  k = E;
                }
                (m = e()) && typeof m.catch == "function" && m.catch(function() {
                });
              }
            } catch (E) {
              if (E && k && typeof E.stack == "string")
                return [E.stack, k.stack];
            }
            return [null, null];
          }
        };
        i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var u = Object.getOwnPropertyDescriptor(
          i.DetermineComponentFrameRoot,
          "name"
        );
        u && u.configurable && Object.defineProperty(
          i.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var o = i.DetermineComponentFrameRoot(), b = o[0], x = o[1];
        if (b && x) {
          var s = b.split(`
`), _ = x.split(`
`);
          for (o = u = 0; u < s.length && !s[u].includes(
            "DetermineComponentFrameRoot"
          ); )
            u++;
          for (; o < _.length && !_[o].includes(
            "DetermineComponentFrameRoot"
          ); )
            o++;
          if (u === s.length || o === _.length)
            for (u = s.length - 1, o = _.length - 1; 1 <= u && 0 <= o && s[u] !== _[o]; )
              o--;
          for (; 1 <= u && 0 <= o; u--, o--)
            if (s[u] !== _[o]) {
              if (u !== 1 || o !== 1)
                do
                  if (u--, o--, 0 > o || s[u] !== _[o]) {
                    var y = `
` + s[u].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && y.includes("<anonymous>") && (y = y.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, y), y;
                  }
                while (1 <= u && 0 <= o);
              break;
            }
        }
      } finally {
        H = !1, p.H = a, d(), Error.prepareStackTrace = t;
      }
      return s = (s = e ? e.displayName || e.name : "") ? v(s) : "", typeof e == "function" && V.set(e, s), s;
    }
    function A(e) {
      if (e == null)
        return "";
      if (typeof e == "function") {
        var r = e.prototype;
        return w(
          e,
          !(!r || !r.isReactComponent)
        );
      }
      if (typeof e == "string")
        return v(e);
      switch (e) {
        case M:
          return v("Suspense");
        case Y:
          return v("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case P:
            return e = w(e.render, !1), e;
          case $:
            return A(e.type);
          case W:
            r = e._payload, e = e._init;
            try {
              return A(e(r));
            } catch {
            }
        }
      return "";
    }
    function j() {
      var e = p.A;
      return e === null ? null : e.getOwner();
    }
    function Ee(e) {
      if (Q.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ve(e, r) {
      function t() {
        ue || (ue = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function me() {
      var e = n(this.type);
      return le[e] || (le[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function ge(e, r, t, a, i, u) {
      return t = u.ref, e = {
        $$typeof: O,
        type: e,
        key: r,
        props: u,
        _owner: i
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: me
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function z(e, r, t, a, i, u) {
      if (typeof e == "string" || typeof e == "function" || e === S || e === X || e === J || e === M || e === Y || e === we || typeof e == "object" && e !== null && (e.$$typeof === W || e.$$typeof === $ || e.$$typeof === Z || e.$$typeof === F || e.$$typeof === P || e.$$typeof === he || e.getModuleId !== void 0)) {
        var o = r.children;
        if (o !== void 0)
          if (a)
            if (U(o)) {
              for (a = 0; a < o.length; a++)
                q(o[a], e);
              Object.freeze && Object.freeze(o);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else
            q(o, e);
      } else
        o = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : U(e) ? a = "array" : e !== void 0 && e.$$typeof === O ? (a = "<" + (n(e.type) || "Unknown") + " />", o = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          a,
          o
        );
      if (Q.call(r, "key")) {
        o = n(e);
        var b = Object.keys(r).filter(function(s) {
          return s !== "key";
        });
        a = 0 < b.length ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}", ie[o + a] || (b = 0 < b.length ? "{" + b.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          a,
          o,
          b,
          o
        ), ie[o + a] = !0);
      }
      if (o = null, t !== void 0 && (c(t), o = "" + t), Ee(r) && (c(r.key), o = "" + r.key), "key" in r) {
        t = {};
        for (var x in r)
          x !== "key" && (t[x] = r[x]);
      } else
        t = r;
      return o && ve(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), ge(e, o, u, i, j(), t);
    }
    function q(e, r) {
      if (typeof e == "object" && e && e.$$typeof !== ye) {
        if (U(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            N(a) && G(a, r);
          }
        else if (N(e))
          e._store && (e._store.validated = 1);
        else if (e === null || typeof e != "object" ? t = null : (t = I && e[I] || e["@@iterator"], t = typeof t == "function" ? t : null), typeof t == "function" && t !== e.entries && (t = t.call(e), t !== e))
          for (; !(e = t.next()).done; )
            N(e.value) && G(e.value, r);
      }
    }
    function N(e) {
      return typeof e == "object" && e !== null && e.$$typeof === O;
    }
    function G(e, r) {
      if (e._store && !e._store.validated && e.key == null && (e._store.validated = 1, r = pe(r), !se[r])) {
        se[r] = !0;
        var t = "";
        e && e._owner != null && e._owner !== j() && (t = null, typeof e._owner.tag == "number" ? t = n(e._owner.type) : typeof e._owner.name == "string" && (t = e._owner.name), t = " It was passed a child from " + t + ".");
        var a = p.getCurrentStack;
        p.getCurrentStack = function() {
          var i = A(e.type);
          return a && (i += a() || ""), i;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          r,
          t
        ), p.getCurrentStack = a;
      }
    }
    function pe(e) {
      var r = "", t = j();
      return t && (t = n(t.type)) && (r = `

Check the render method of \`` + t + "`."), r || (e = n(e)) && (r = `

Check the top-level render call using <` + e + ">."), r;
    }
    var Te = Oe, O = Symbol.for("react.transitional.element"), _e = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), J = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), F = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), we = Symbol.for("react.offscreen"), I = Symbol.iterator, xe = Symbol.for("react.client.reference"), p = Te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = Object.prototype.hasOwnProperty, T = Object.assign, he = Symbol.for("react.client.reference"), U = Array.isArray, h = 0, K, D, ee, re, te, oe, ne;
    g.__reactDisabledLog = !0;
    var B, ae, H = !1, V = new (typeof WeakMap == "function" ? WeakMap : Map)(), ye = Symbol.for("react.client.reference"), ue, le = {}, ie = {}, se = {};
    R.Fragment = S, R.jsx = function(e, r, t, a, i) {
      return z(e, r, t, !1, a, i);
    }, R.jsxs = function(e, r, t, a, i) {
      return z(e, r, t, !0, a, i);
    };
  }()), R;
}
process.env.NODE_ENV === "production" ? L.exports = Se() : L.exports = Pe();
var be = L.exports;
const Me = (n) => {
  const { node: l } = n, c = l.attrs.label ?? "Click me", g = l.attrs.href, f = (d) => {
    d.preventDefault(), console.log("Button in editor clicked", l), g && window.open(g, "_blank");
  };
  return /* @__PURE__ */ be.jsx("div", { "data-custom-button-view": !0, className: "inline-block", children: /* @__PURE__ */ be.jsx(
    "button",
    {
      className: "px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors",
      onClick: f,
      type: "button",
      children: c
    }
  ) });
}, Ye = Ae.create({
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
        parseHTML: (n) => n.getAttribute("data-label"),
        renderHTML: (n) => n.label ? { "data-label": n.label } : {}
      },
      href: {
        default: null,
        parseHTML: (n) => n.getAttribute("href"),
        renderHTML: (n) => n.href ? { href: n.href } : {}
      }
    };
  },
  parseHTML() {
    return [{ tag: "button[data-custom-button]" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "button",
      je(this.options.HTMLAttributes, n, {
        "data-custom-button": "",
        class: "umb-button"
      }),
      n.label || "Button"
    ];
  },
  addNodeView() {
    return Ne(Me);
  },
  addCommands() {
    return {
      setButton: (n) => ({ commands: l }) => l.insertContent({
        type: this.name,
        attrs: n
      })
    };
  }
});
class Ve extends ke {
  constructor() {
    super(...arguments);
    ce(this, "getTiptapExtensions", () => [Ye]);
  }
}
export {
  Ve as default
};
//# sourceMappingURL=button.tiptap-api-363cab81.mjs.map

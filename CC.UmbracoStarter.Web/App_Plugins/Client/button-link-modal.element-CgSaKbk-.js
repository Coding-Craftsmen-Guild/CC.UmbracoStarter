import { html as r, nothing as f, when as K, css as Q, state as q, query as g, customElement as X } from "@umbraco-cms/backoffice/external/lit";
import { UmbMediaTypeStructureRepository as Y, isUmbracoFolder as Z } from "@umbraco-cms/backoffice/media-type";
import { UmbValidationContext as j, umbBindToValidation as P } from "@umbraco-cms/backoffice/validation";
import { UmbModalBaseElement as ee, umbConfirmModal as te } from "@umbraco-cms/backoffice/modal";
import { UmbDocumentDetailRepository as ie } from "@umbraco-cms/backoffice/document";
import { UmbMediaDetailRepository as ne } from "@umbraco-cms/backoffice/media";
var ae = Object.defineProperty, le = Object.getOwnPropertyDescriptor, U = (e) => {
  throw TypeError(e);
}, p = (e, t, n, l) => {
  for (var o = l > 1 ? void 0 : l ? le(t, n) : t, s = e.length - 1, k; s >= 0; s--)
    (k = e[s]) && (o = (l ? k(t, n, o) : k(o)) || o);
  return l && o && ae(t, n, o), o;
}, b = (e, t, n) => t.has(e) || U("Cannot " + n), m = (e, t, n) => (b(e, t, "read from private field"), n ? n.call(e) : t.get(e)), y = (e, t, n) => t.has(e) ? U("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), re = (e, t, n, l) => (b(e, t, "write to private field"), t.set(e, n), n), a = (e, t, n) => (b(e, t, "access private method"), n), d, v, i, z, u, L, C, x, M, $, T, E, S, I, R, A, D, O, W, N, B, V, F, G, H, J;
let h = class extends ee {
  constructor() {
    super(...arguments), y(this, i), y(this, d, "vertical"), y(this, v, new j(this)), this._config = {
      hideAnchor: !1,
      hideTarget: !1
    };
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this.data) != null && e.config && (this._config = this.data.config), this.modalContext && this.observe(this.modalContext.size, (t) => {
      (t === "large" || t === "full") && re(this, d, "horizontal");
    }), a(this, i, z).call(this);
  }
  firstUpdated() {
    var e;
    (e = this._linkAnchorInput) == null || e.addValidator(
      "valueMissing",
      () => this.localize.term("linkPicker_modalAnchorValidationMessage"),
      () => !this.value.link.url && !this.value.link.queryString
    );
  }
  render() {
    var e, t;
    return r`
      <umb-body-layout
        headline=${this.localize.term(
      (e = this.modalContext) != null && e.data.isNew ? "defaultdialogs_addLink" : "defaultdialogs_updateLink"
    )}
      >
        <uui-box>
          ${a(this, i, O).call(this)} ${a(this, i, G).call(this)}
          ${a(this, i, H).call(this)} ${a(this, i, J).call(this)}
          ${a(this, i, D).call(this)}
        </uui-box>
        <div slot="actions">
          <uui-button
            label=${this.localize.term("general_close")}
            @click=${this._rejectModal}
          ></uui-button>
          <uui-button
            color="positive"
            look="primary"
            label=${this.localize.term(
      (t = this.modalContext) != null && t.data.isNew ? "general_add" : "general_update"
    )}
            ?disabled=${!this.value.link.type}
            @click=${a(this, i, E)}
          ></uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
d = /* @__PURE__ */ new WeakMap();
v = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
z = async function() {
  const e = new Y(
    this
  ), { data: t } = await e.requestAllowedChildrenOf(null);
  this._allowedMediaTypeUniques = (t == null ? void 0 : t.items.map((n) => n.unique).filter((n) => n && !Z(n))) ?? [];
};
u = function(e) {
  var t;
  (t = this.modalContext) == null || t.updateValue({
    link: { ...this.value.link, ...e }
  });
};
L = function(e) {
  const t = e.target.value ?? "";
  if (t.startsWith("#") || t.startsWith("?")) {
    a(this, i, u).call(this, { queryString: t });
    return;
  }
  t.includes("=") ? a(this, i, u).call(this, { queryString: `?${t}` }) : t ? a(this, i, u).call(this, { queryString: `#${t}` }) : a(this, i, u).call(this, { queryString: "" });
};
C = function(e) {
  a(this, i, u).call(this, { name: e.target.value });
};
x = function(e) {
  a(this, i, u).call(this, {
    target: e.target.checked ? "_blank" : void 0
  });
};
M = function(e) {
  const t = e.target.value;
  let n;
  if (t && !this.value.link.name)
    if (URL.canParse(t)) {
      const l = URL.parse(t);
      n = (l == null ? void 0 : l.hostname) ?? t;
    } else
      n = t;
  a(this, i, u).call(this, {
    name: this.value.link.name || n,
    type: "external",
    url: t
  });
};
$ = async function(e, t) {
  var w;
  let n, l, o;
  const s = e.target.value;
  if (s)
    switch (t) {
      case "document": {
        const _ = new ie(this), { data: c } = await _.requestByUnique(s);
        c && (n = c.documentType.icon, l = c.variants[0].name, o = ((w = c.urls[0]) == null ? void 0 : w.url) ?? "");
        break;
      }
      case "media": {
        const _ = new ne(this), { data: c } = await _.requestByUnique(
          s
        );
        c && (n = c.mediaType.icon, l = c.variants[0].name, o = c.urls[0].url);
        break;
      }
    }
  const k = {
    icon: n,
    name: this.value.link.name || l,
    type: s ? t : void 0,
    unique: s,
    url: o ?? this.value.link.url
  };
  a(this, i, u).call(this, k), await m(this, v).validate();
};
T = async function() {
  this.value.link.url && await te(this, {
    color: "danger",
    headline: this.localize.term("linkPicker_resetUrlHeadline"),
    content: this.localize.term("linkPicker_resetUrlMessage"),
    confirmLabel: this.localize.term("linkPicker_resetUrlLabel")
  }), a(this, i, u).call(this, { type: null, url: null });
};
E = async function() {
  var e;
  await m(this, v).validate(), (e = this.modalContext) == null || e.submit();
};
S = function() {
  var e, t, n;
  (n = (t = (e = this._documentPickerElement) == null ? void 0 : e.shadowRoot) == null ? void 0 : t.querySelector("#btn-add")) == null || n.dispatchEvent(new Event("click"));
};
I = function() {
  var e, t, n;
  (n = (t = (e = this._mediaPickerElement) == null ? void 0 : e.shadowRoot) == null ? void 0 : t.querySelector("#btn-add")) == null || n.dispatchEvent(new Event("click"));
};
R = function() {
  a(this, i, u).call(this, { type: "external" });
};
A = function(e) {
  var t;
  e.stopPropagation(), (t = this.modalContext) == null || t.updateValue({
    link: { ...this.value.link, backgroundColor: e.target.value }
  });
};
D = function() {
  var e;
  return r`<uui-color-picker
      label="Eye dropper"
      .value=${(e = this.modalContext) == null ? void 0 : e.value.backgroundColor}
      @change=${a(this, i, A)}
    >
    </uui-color-picker>`;
};
O = function() {
  return r`
      <umb-property-layout
        orientation=${m(this, d)}
        label=${this.localize.term("linkPicker_modalSource")}
        mandatory
      >
        <div slot="editor">
          ${a(this, i, W).call(this)} ${a(this, i, N).call(this)}
          ${a(this, i, B).call(this)} ${a(this, i, V).call(this)}
          ${a(this, i, F).call(this)}
        </div>
      </umb-property-layout>
    `;
};
W = function() {
  return this.value.link.type ? f : r`
      <uui-button-group>
        <uui-button
          data-mark="action:document"
          look="placeholder"
          label=${this.localize.term("general_content")}
          @click=${a(this, i, S)}
        ></uui-button>
        <uui-button
          data-mark="action:media"
          look="placeholder"
          label=${this.localize.term("general_media")}
          @click=${a(this, i, I)}
        ></uui-button>
        <uui-button
          data-mark="action:external"
          look="placeholder"
          label=${this.localize.term("linkPicker_modalManual")}
          @click=${a(this, i, R)}
        ></uui-button>
      </uui-button-group>
    `;
};
N = function() {
  return r`
      <umb-input-document
        ?hidden=${!this.value.link.unique || this.value.link.type !== "document"}
        .max=${1}
        .showOpenButton=${!0}
        .value=${this.value.link.unique && this.value.link.type === "document" ? this.value.link.unique : ""}
        @change=${(e) => a(this, i, $).call(this, e, "document")}
      >
      </umb-input-document>
    `;
};
B = function() {
  return r`
      <umb-input-media
        ?hidden=${!this.value.link.unique || this.value.link.type !== "media"}
        .allowedContentTypeIds=${this._allowedMediaTypeUniques}
        .max=${1}
        .value=${this.value.link.unique && this.value.link.type === "media" ? this.value.link.unique : ""}
        @change=${(e) => a(this, i, $).call(this, e, "media")}
      ></umb-input-media>
    `;
};
V = function() {
  return this.value.link.type !== "external" ? f : r`
      <uui-input
        data-mark="input:url"
        label=${this.localize.term("placeholders_enterUrl")}
        placeholder=${this.localize.term("placeholders_enterUrl")}
        .value=${this.value.link.url ?? ""}
        ?disabled=${!!this.value.link.unique}
        ?required=${this._config.hideAnchor}
        @change=${a(this, i, M)}
        ${P(this)}
      >
        ${K(
    !this.value.link.unique,
    () => r`
            <div slot="append">
              <uui-button
                slot="append"
                compact
                label=${this.localize.term("general_remove")}
                @click=${a(this, i, T)}
              >
                <uui-icon name="remove"></uui-icon>
              </uui-button>
            </div>
          `
  )}
      </uui-input>
    `;
};
F = function() {
  return !this.value.link.unique || !this.value.link.url ? f : r`<uui-input readonly value=${this.value.link.url}></uui-input>`;
};
G = function() {
  return this._config.hideAnchor ? f : r`
      <umb-property-layout
        orientation=${m(this, d)}
        label=${this.localize.term("defaultdialogs_anchorLinkPicker")}
      >
        <uui-input
          data-mark="input:anchor"
          slot="editor"
          id="link-anchor"
          label=${this.localize.term("placeholders_anchor")}
          placeholder=${this.localize.term("placeholders_anchor")}
          .value=${this.value.link.queryString ?? ""}
          @change=${a(this, i, L)}
          ${P(this)}
        ></uui-input>
      </umb-property-layout>
    `;
};
H = function() {
  return r`
      <umb-property-layout
        orientation=${m(this, d)}
        label=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
      >
        <uui-input
          data-mark="input:title"
          slot="editor"
          label=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
          placeholder=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
          .value=${this.value.link.name ?? ""}
          @change=${a(this, i, C)}
        >
        </uui-input>
      </umb-property-layout>
    `;
};
J = function() {
  return this._config.hideTarget ? f : r`
      <umb-property-layout
        orientation=${m(this, d)}
        label=${this.localize.term("content_target")}
      >
        <uui-toggle
          slot="editor"
          label=${this.localize.term("defaultdialogs_openInNewWindow")}
          .checked=${this.value.link.target === "_blank"}
          @change=${a(this, i, x)}
        >
          ${this.localize.term("defaultdialogs_openInNewWindow")}
        </uui-toggle>
      </umb-property-layout>
    `;
};
h.styles = [
  Q`
      uui-box {
        --uui-box-default-padding: 0 var(--uui-size-space-5);
      }

      uui-button-group {
        width: 100%;
      }

      uui-input {
        width: 100%;

        &[readonly] {
          margin-top: var(--uui-size-space-2);
        }
      }
    `
];
p([
  q()
], h.prototype, "_allowedMediaTypeUniques", 2);
p([
  q()
], h.prototype, "_config", 2);
p([
  g("umb-input-document")
], h.prototype, "_documentPickerElement", 2);
p([
  g("umb-input-media")
], h.prototype, "_mediaPickerElement", 2);
p([
  g("#link-anchor", !0)
], h.prototype, "_linkAnchorInput", 2);
h = p([
  X("button-link-picker-modal")
], h);
const pe = h;
export {
  h as UmbLinkPickerModalElement,
  pe as default,
  h as element
};
//# sourceMappingURL=button-link-modal.element-CgSaKbk-.js.map

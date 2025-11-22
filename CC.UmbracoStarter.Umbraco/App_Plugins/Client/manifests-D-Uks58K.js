const n = "CC.Modal.ButtonLink", t = {
  type: "modal",
  alias: n,
  name: "Property Editor Button Link Modal",
  element: () => import("./button-link-modal.element-CgSaKbk-.js")
}, o = "CC.ButtonLink.Tiptap", i = "CC.ButtonLink.Tiptap.Toolbar", a = [
  t,
  {
    type: "tiptapExtension",
    kind: "button",
    alias: o,
    name: "Button Link",
    api: () => import("./button-link.tiptap-api-BEQCrAea.js"),
    meta: {
      icon: "icon-hand-pointer",
      label: "Button",
      group: "#tiptap_extGroup_formatting"
    }
  },
  {
    type: "tiptapToolbarExtension",
    kind: "button",
    alias: i,
    name: "Button Link",
    js: () => import("./button-link.tiptap-toolbar-api-v1-y0k_4.js"),
    meta: {
      alias: "button",
      icon: "icon-hand-pointer",
      label: "Button Link"
    }
  }
], e = [
  t,
  ...a
], p = [...e];
export {
  n as B,
  p as m
};
//# sourceMappingURL=manifests-D-Uks58K.js.map

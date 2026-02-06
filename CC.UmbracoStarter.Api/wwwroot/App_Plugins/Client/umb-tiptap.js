const t = [
  {
    type: "tiptapExtension",
    kind: "button",
    alias: "My.Tiptap.Button",
    name: "My Button Tiptap Extension",
    api: () => import("./button.tiptap-api-363cab81.mjs"),
    meta: {
      icon: "icon-button",
      label: "Button",
      group: "#tiptap_extGroup_content"
    }
  },
  {
    type: "tiptapToolbarExtension",
    kind: "button",
    alias: "My.Tiptap.Toolbar.Button",
    name: "My Button Tiptap Toolbar Extension",
    js: () => import("./button.tiptap-toolbar-api-a265b4aa.mjs"),
    forExtensions: ["My.Tiptap.Button"],
    meta: {
      alias: "button",
      icon: "icon-button",
      label: "Button"
    }
  }
], n = [...t];
export {
  n as manifests
};
//# sourceMappingURL=umb-tiptap.js.map

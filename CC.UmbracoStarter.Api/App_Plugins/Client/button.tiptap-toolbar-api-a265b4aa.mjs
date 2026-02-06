import { UmbTiptapToolbarElementApiBase as a } from "@umbraco-cms/backoffice/tiptap";
class o extends a {
  execute(t) {
    t == null || t.chain().focus().setButton({ label: "Custom Button" }).run();
  }
}
export {
  o as default
};
//# sourceMappingURL=button.tiptap-toolbar-api-a265b4aa.mjs.map

import { UmbTiptapExtensionApiBase as n } from "@umbraco-cms/backoffice/tiptap";
import { UmbLink as r } from "@umbraco-cms/backoffice/external/tiptap";
const a = r.extend({
  name: "buttonLink",
  addAttributes() {
    var t;
    return {
      ...(t = this.parent) == null ? void 0 : t.call(this),
      "data-anchor": { default: null },
      title: { default: null },
      type: { default: "external" }
    };
  },
  addOptions() {
    var t;
    return {
      ...(t = this.parent) == null ? void 0 : t.call(this),
      HTMLAttributes: {
        target: "",
        "data-router-slot": "disabled"
      }
    };
  },
  addCommands() {
    return {
      setButtonLink: (t) => ({ chain: e }) => e().setMark(this.name, t).setMeta("preventAutolink", !0).run(),
      unsetButtonLink: () => ({ chain: t }) => t().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  }
});
class i extends n {
  constructor() {
    super(...arguments), this.getTiptapExtensions = () => [a];
  }
}
export {
  i as default
};
//# sourceMappingURL=button-link.tiptap-api-BEQCrAea.js.map

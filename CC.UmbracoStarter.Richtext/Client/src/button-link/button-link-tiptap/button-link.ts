import { UmbLink } from "@umbraco-cms/backoffice/external/tiptap";

export type ButtonLinkAttributes = {
  type: string;
  href: string;
  class: string;
  style: { [key: string]: string };
  "data-anchor"?: string | null;
  target?: string | null;
  title?: string | null;
};

export const ButtonLink = UmbLink.extend({
  name: "buttonLink",

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-anchor": { default: null },
      title: { default: null },
      type: { default: "external" },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        target: "",
        "data-router-slot": "disabled",
      },
    };
  },

  addCommands() {
    return {
      setButtonLink: (attributes) => {
        return ({ chain }) => {
          return chain()
            .setMark(this.name, attributes)
            .setMeta("preventAutolink", true)
            .run();
        };
      },
      unsetButtonLink: () => {
        return ({ chain }) => {
          return chain()
            .unsetMark(this.name, { extendEmptyMarkRange: true })
            .setMeta("preventAutolink", true)
            .run();
        };
      },
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    buttonLink: {
      setButtonLink: (options: ButtonLinkAttributes) => ReturnType;
      unsetButtonLink: () => ReturnType;
    };
  }
}

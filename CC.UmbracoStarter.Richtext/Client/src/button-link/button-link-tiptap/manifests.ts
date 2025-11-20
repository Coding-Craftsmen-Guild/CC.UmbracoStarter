import { manifest as buttonLinkModalManifest } from "../button-link-modal/manifest.js";
import {
  BUTTON_LINK_TIPTAP_API,
  BUTTON_LINK_TIPTAP_TOOLBAR_API,
} from "./constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  buttonLinkModalManifest,
  {
    type: "tiptapExtension",
    kind: "button",
    alias: BUTTON_LINK_TIPTAP_API,
    name: "Button Link",
    api: () => import("./button-link.tiptap-api.js"),
    meta: {
      icon: "icon-hand-pointer",
      label: "Button",
      group: "#tiptap_extGroup_formatting",
    },
  },
  {
    type: "tiptapToolbarExtension",
    kind: "button",
    alias: BUTTON_LINK_TIPTAP_TOOLBAR_API,
    name: "Button Link",
    js: () => import("./button-link.tiptap-toolbar-api.js"),
    meta: {
      alias: "button",
      icon: "icon-hand-pointer",
      label: "Button Link",
    },
  },
];

import { BUTTON_LINK_MODAL_ALIAS } from "./constants.js";

export const manifest = {
  type: "modal",
  alias: BUTTON_LINK_MODAL_ALIAS,
  name: "Property Editor Button Link Modal",
  element: () => import("./button-link-modal.element.js"),
};

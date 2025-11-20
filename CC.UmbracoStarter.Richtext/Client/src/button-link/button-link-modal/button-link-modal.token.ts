import { BUTTON_LINK_MODAL_ALIAS } from "./constants.js";
import type { ButtonLinkPickerLink } from "./types.js";
import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface ButtonLinkPickerModalData {
  config: UmbLinkPickerConfig;
  index: number | null;
  isNew: boolean;
}

export type ButtonLinkPickerModalValue = { link: ButtonLinkPickerLink };

export interface UmbLinkPickerConfig {
  hideAnchor?: boolean;
  hideTarget?: boolean;
}

export const BUTTON_LINK_MODAL = new UmbModalToken<
  ButtonLinkPickerModalData,
  ButtonLinkPickerModalValue
>(BUTTON_LINK_MODAL_ALIAS, {
  modal: {
    type: "sidebar",
    size: "medium",
  },
});

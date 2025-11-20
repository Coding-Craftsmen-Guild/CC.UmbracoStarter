export type ButtonLinkPickerLinkType = "document" | "external" | "media";

export interface ButtonLinkPickerLink {
  icon?: string | null;
  name?: string | null;
  published?: boolean | null;
  queryString?: string | null;
  target?: string | null;
  trashed?: boolean | null;
  type?: ButtonLinkPickerLinkType | null;
  unique?: string | null;
  url?: string | null;
  backgroundColor?: string | null;
  foregroundColor?: string | null;
}

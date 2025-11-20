import { UmbTiptapExtensionApiBase } from "@umbraco-cms/backoffice/tiptap";
import { ButtonLink } from "./button-link";

export default class UmbTiptapHighlightExtensionApi extends UmbTiptapExtensionApiBase {
  getTiptapExtensions = () => [ButtonLink];
}

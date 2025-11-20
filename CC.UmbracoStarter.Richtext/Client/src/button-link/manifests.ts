import { manifest as buttonLinkModalManifest } from "./button-link-modal/manifest.js";
import { manifests as tiptapManifests } from "./button-link-tiptap/manifests.js";

export const manifests: Array<UmbExtensionManifest> = [
  buttonLinkModalManifest,
  ...tiptapManifests,
];

import { UmbLink } from "@umbraco-cms/backoffice/external/tiptap";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import type { Editor } from "@umbraco-cms/backoffice/external/tiptap";
import type { UUIModalSidebarSize } from "@umbraco-cms/backoffice/external/uui";
import { UmbTiptapToolbarElementApiBase } from "@umbraco-cms/backoffice/tiptap";
import { ButtonLinkAttributes } from "./button-link";
import { BUTTON_LINK_MODAL, ButtonLinkPickerLink } from "../button-link-modal";

export default class ButtonTiptalToolbarExtensionApi extends UmbTiptapToolbarElementApiBase {
  override async execute(editor?: Editor) {
    const attrs = editor?.getAttributes(UmbLink.name) ?? {};
    let link = this.#getLinkData(attrs);
    const data = { config: {}, index: null, isNew: link?.url === undefined };
    const value = { link };

    const overlaySize =
      this.configuration?.getValueByAlias<UUIModalSidebarSize>("overlaySize") ??
      "small";

    const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    const modalHandler = modalManager.open(this, BUTTON_LINK_MODAL, {
      data,
      value,
      modal: { size: overlaySize },
    });

    if (!modalHandler) return;

    const result = await modalHandler.onSubmit().catch(() => undefined);
    if (!result?.link) return;
    link = result.link;

    const linkAttrs = this.#parseLinkData(link);

    if (linkAttrs) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange(UmbLink.name)
        .setButtonLink(linkAttrs)
        .run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange(UmbLink.name)
        .unsetButtonLink()
        .run();
    }
  }

  #getLinkData(attrs: Record<string, any>): ButtonLinkPickerLink {
    const queryString = attrs["data-anchor"];
    const url = attrs.href?.substring(
      0,
      attrs.href.length - (queryString?.length ?? 0)
    );
    const unique = url?.includes("localLink:")
      ? url.substring(url.indexOf(":") + 1, url.indexOf("}"))
      : null;

    return {
      name: attrs.title,
      queryString,
      target: attrs.target,
      type: attrs.type,
      unique,
      url,
    };
  }

  #parseLinkData(link: ButtonLinkPickerLink): ButtonLinkAttributes | null {
    const { name, target, type, unique, backgroundColor } = link;
    let { queryString, url } = link;

    // If an anchor exists, check that it is appropriately prefixed
    queryString = this.#queryStringFromUrl(queryString);

    // The href might be an external url, so check the value for an anchor/querystring;
    // `href` has the anchor re-appended later, hence the reset here to avoid duplicating the anchor
    if (!queryString) {
      const extractedInfo = this.#extractUrlAndQueryString(url, queryString);
      url = extractedInfo.url;
      queryString = extractedInfo.queryString;
    }

    // If we have a unique id, it must be a `/{localLink:guid}`
    if (unique) {
      url = `/{localLink:${unique}}`;
    } else {
      // If it's an email address and not `//user@domain.com` and protocol (e.g. mailto:, sip:) is not specified;
      // then we'll assume it should be a "mailto" link.
      url = this.#transformURLToMailto(url);

      url = this.#ensureHttpProtocol(url);
    }

    const anchor = this.#getAnchorFromQueryString(queryString);

    if (anchor) {
      url = (url ?? "") + anchor;
    }

    if (!url) return null;
    const styles: { [key: string]: string } = {};

    if (backgroundColor) {
      styles["--color-background"] = backgroundColor;
    }

    return {
      type: type ?? "external",
      href: url,
      class: "btn",
      style: styles,
      "data-anchor": anchor,
      target,
      title: name ?? url,
    };
  }

  #extractUrlAndQueryString(
    url: string | null | undefined,
    queryString: string | null
  ) {
    const urlParts = url?.split(/([#?])/);
    if (urlParts?.length === 3) {
      url = urlParts[0];
      queryString = urlParts[1] + urlParts[2];
    }
    return { url, queryString };
  }

  /**
   * If the URL is prefixed "www.", then prepend "http://" protocol scheme.
   * @param url
   */
  #ensureHttpProtocol(url: string | null | undefined) {
    if (!url) return null;
    if (/^\s*www\./i.test(url)) {
      url = `http://${url}`;
    }
    return url;
  }

  /**
   * If the URL is an email address, then prepend "mailto:" protocol scheme.
   * @param url
   */
  #transformURLToMailto(url: string | null | undefined) {
    if (!url) return null;
    if (url?.includes("@") && !url.includes("//") && !url.includes(":")) {
      url = `mailto:${url}`;
    }
    return url;
  }

  /**
   * If the URL contains an anchor, then return the anchor.
   * @param queryString
   */
  #getAnchorFromQueryString(queryString: string | null) {
    if (!queryString) return null;
    return queryString.startsWith("#") || queryString.startsWith("?")
      ? queryString
      : null;
  }

  /**
   * If the query string does not start with "?" or "#", then prepend it.
   * @param queryString
   */
  #queryStringFromUrl(queryString: string | null | undefined) {
    if (!queryString) return null;
    if (!queryString.startsWith("?") && !queryString.startsWith("#")) {
      queryString = (queryString.startsWith("=") ? "#" : "?") + queryString;
    }
    return queryString;
  }
}

"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("@umbraco-cms/backoffice/external/lit"),$=require("@umbraco-cms/backoffice/media-type"),_=require("@umbraco-cms/backoffice/validation"),q=require("@umbraco-cms/backoffice/modal"),H=require("@umbraco-cms/backoffice/document"),J=require("@umbraco-cms/backoffice/media");var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,w=t=>{throw TypeError(t)},d=(t,e,i,o)=>{for(var r=o>1?void 0:o?Q(e,i):e,s=t.length-1,p;s>=0;s--)(p=t[s])&&(r=(o?p(e,i,r):p(r))||r);return o&&r&&K(e,i,r),r},y=(t,e,i)=>e.has(t)||w("Cannot "+i),m=(t,e,i)=>(y(t,e,"read from private field"),i?i.call(t):e.get(t)),v=(t,e,i)=>e.has(t)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),X=(t,e,i,o)=>(y(t,e,"write to private field"),e.set(t,i),i),l=(t,e,i)=>(y(t,e,"access private method"),i),h,k,n,P,u,U,L,z,C,g,M,x,T,S,E,I,R,A,D,O,W,B,N,V,F,G;exports.element=class extends q.UmbModalBaseElement{constructor(){super(...arguments),v(this,n),v(this,h,"vertical"),v(this,k,new _.UmbValidationContext(this)),this._config={hideAnchor:!1,hideTarget:!1}}connectedCallback(){var e;super.connectedCallback(),(e=this.data)!=null&&e.config&&(this._config=this.data.config),this.modalContext&&this.observe(this.modalContext.size,i=>{(i==="large"||i==="full")&&X(this,h,"horizontal")}),l(this,n,P).call(this)}firstUpdated(){var e;(e=this._linkAnchorInput)==null||e.addValidator("valueMissing",()=>this.localize.term("linkPicker_modalAnchorValidationMessage"),()=>!this.value.link.url&&!this.value.link.queryString)}render(){var e,i;return a.html`
      <umb-body-layout
        headline=${this.localize.term((e=this.modalContext)!=null&&e.data.isNew?"defaultdialogs_addLink":"defaultdialogs_updateLink")}
      >
        <uui-box>
          ${l(this,n,A).call(this)} ${l(this,n,V).call(this)}
          ${l(this,n,F).call(this)} ${l(this,n,G).call(this)}
          ${l(this,n,R).call(this)}
        </uui-box>
        <div slot="actions">
          <uui-button
            label=${this.localize.term("general_close")}
            @click=${this._rejectModal}
          ></uui-button>
          <uui-button
            color="positive"
            look="primary"
            label=${this.localize.term((i=this.modalContext)!=null&&i.data.isNew?"general_add":"general_update")}
            ?disabled=${!this.value.link.type}
            @click=${l(this,n,x)}
          ></uui-button>
        </div>
      </umb-body-layout>
    `}};h=new WeakMap;k=new WeakMap;n=new WeakSet;P=async function(){const t=new $.UmbMediaTypeStructureRepository(this),{data:e}=await t.requestAllowedChildrenOf(null);this._allowedMediaTypeUniques=(e==null?void 0:e.items.map(i=>i.unique).filter(i=>i&&!$.isUmbracoFolder(i)))??[]};u=function(t){var e;(e=this.modalContext)==null||e.updateValue({link:{...this.value.link,...t}})};U=function(t){const e=t.target.value??"";if(e.startsWith("#")||e.startsWith("?")){l(this,n,u).call(this,{queryString:e});return}e.includes("=")?l(this,n,u).call(this,{queryString:`?${e}`}):e?l(this,n,u).call(this,{queryString:`#${e}`}):l(this,n,u).call(this,{queryString:""})};L=function(t){l(this,n,u).call(this,{name:t.target.value})};z=function(t){l(this,n,u).call(this,{target:t.target.checked?"_blank":void 0})};C=function(t){const e=t.target.value;let i;if(e&&!this.value.link.name)if(URL.canParse(e)){const o=URL.parse(e);i=(o==null?void 0:o.hostname)??e}else i=e;l(this,n,u).call(this,{name:this.value.link.name||i,type:"external",url:e})};g=async function(t,e){var b;let i,o,r;const s=t.target.value;if(s)switch(e){case"document":{const f=new H.UmbDocumentDetailRepository(this),{data:c}=await f.requestByUnique(s);c&&(i=c.documentType.icon,o=c.variants[0].name,r=((b=c.urls[0])==null?void 0:b.url)??"");break}case"media":{const f=new J.UmbMediaDetailRepository(this),{data:c}=await f.requestByUnique(s);c&&(i=c.mediaType.icon,o=c.variants[0].name,r=c.urls[0].url);break}}const p={icon:i,name:this.value.link.name||o,type:s?e:void 0,unique:s,url:r??this.value.link.url};l(this,n,u).call(this,p),await m(this,k).validate()};M=async function(){this.value.link.url&&await q.umbConfirmModal(this,{color:"danger",headline:this.localize.term("linkPicker_resetUrlHeadline"),content:this.localize.term("linkPicker_resetUrlMessage"),confirmLabel:this.localize.term("linkPicker_resetUrlLabel")}),l(this,n,u).call(this,{type:null,url:null})};x=async function(){var t;await m(this,k).validate(),(t=this.modalContext)==null||t.submit()};T=function(){var t,e,i;(i=(e=(t=this._documentPickerElement)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("#btn-add"))==null||i.dispatchEvent(new Event("click"))};S=function(){var t,e,i;(i=(e=(t=this._mediaPickerElement)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("#btn-add"))==null||i.dispatchEvent(new Event("click"))};E=function(){l(this,n,u).call(this,{type:"external"})};I=function(t){var e;t.stopPropagation(),(e=this.modalContext)==null||e.updateValue({link:{...this.value.link,backgroundColor:t.target.value}})};R=function(){var t;return a.html`<uui-color-picker
      label="Eye dropper"
      .value=${(t=this.modalContext)==null?void 0:t.value.backgroundColor}
      @change=${l(this,n,I)}
    >
    </uui-color-picker>`};A=function(){return a.html`
      <umb-property-layout
        orientation=${m(this,h)}
        label=${this.localize.term("linkPicker_modalSource")}
        mandatory
      >
        <div slot="editor">
          ${l(this,n,D).call(this)} ${l(this,n,O).call(this)}
          ${l(this,n,W).call(this)} ${l(this,n,B).call(this)}
          ${l(this,n,N).call(this)}
        </div>
      </umb-property-layout>
    `};D=function(){return this.value.link.type?a.nothing:a.html`
      <uui-button-group>
        <uui-button
          data-mark="action:document"
          look="placeholder"
          label=${this.localize.term("general_content")}
          @click=${l(this,n,T)}
        ></uui-button>
        <uui-button
          data-mark="action:media"
          look="placeholder"
          label=${this.localize.term("general_media")}
          @click=${l(this,n,S)}
        ></uui-button>
        <uui-button
          data-mark="action:external"
          look="placeholder"
          label=${this.localize.term("linkPicker_modalManual")}
          @click=${l(this,n,E)}
        ></uui-button>
      </uui-button-group>
    `};O=function(){return a.html`
      <umb-input-document
        ?hidden=${!this.value.link.unique||this.value.link.type!=="document"}
        .max=${1}
        .showOpenButton=${!0}
        .value=${this.value.link.unique&&this.value.link.type==="document"?this.value.link.unique:""}
        @change=${t=>l(this,n,g).call(this,t,"document")}
      >
      </umb-input-document>
    `};W=function(){return a.html`
      <umb-input-media
        ?hidden=${!this.value.link.unique||this.value.link.type!=="media"}
        .allowedContentTypeIds=${this._allowedMediaTypeUniques}
        .max=${1}
        .value=${this.value.link.unique&&this.value.link.type==="media"?this.value.link.unique:""}
        @change=${t=>l(this,n,g).call(this,t,"media")}
      ></umb-input-media>
    `};B=function(){return this.value.link.type!=="external"?a.nothing:a.html`
      <uui-input
        data-mark="input:url"
        label=${this.localize.term("placeholders_enterUrl")}
        placeholder=${this.localize.term("placeholders_enterUrl")}
        .value=${this.value.link.url??""}
        ?disabled=${!!this.value.link.unique}
        ?required=${this._config.hideAnchor}
        @change=${l(this,n,C)}
        ${_.umbBindToValidation(this)}
      >
        ${a.when(!this.value.link.unique,()=>a.html`
            <div slot="append">
              <uui-button
                slot="append"
                compact
                label=${this.localize.term("general_remove")}
                @click=${l(this,n,M)}
              >
                <uui-icon name="remove"></uui-icon>
              </uui-button>
            </div>
          `)}
      </uui-input>
    `};N=function(){return!this.value.link.unique||!this.value.link.url?a.nothing:a.html`<uui-input readonly value=${this.value.link.url}></uui-input>`};V=function(){return this._config.hideAnchor?a.nothing:a.html`
      <umb-property-layout
        orientation=${m(this,h)}
        label=${this.localize.term("defaultdialogs_anchorLinkPicker")}
      >
        <uui-input
          data-mark="input:anchor"
          slot="editor"
          id="link-anchor"
          label=${this.localize.term("placeholders_anchor")}
          placeholder=${this.localize.term("placeholders_anchor")}
          .value=${this.value.link.queryString??""}
          @change=${l(this,n,U)}
          ${_.umbBindToValidation(this)}
        ></uui-input>
      </umb-property-layout>
    `};F=function(){return a.html`
      <umb-property-layout
        orientation=${m(this,h)}
        label=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
      >
        <uui-input
          data-mark="input:title"
          slot="editor"
          label=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
          placeholder=${this.localize.term("defaultdialogs_nodeNameLinkPicker")}
          .value=${this.value.link.name??""}
          @change=${l(this,n,L)}
        >
        </uui-input>
      </umb-property-layout>
    `};G=function(){return this._config.hideTarget?a.nothing:a.html`
      <umb-property-layout
        orientation=${m(this,h)}
        label=${this.localize.term("content_target")}
      >
        <uui-toggle
          slot="editor"
          label=${this.localize.term("defaultdialogs_openInNewWindow")}
          .checked=${this.value.link.target==="_blank"}
          @change=${l(this,n,z)}
        >
          ${this.localize.term("defaultdialogs_openInNewWindow")}
        </uui-toggle>
      </umb-property-layout>
    `};exports.element.styles=[a.css`
      uui-box {
        --uui-box-default-padding: 0 var(--uui-size-space-5);
      }

      uui-button-group {
        width: 100%;
      }

      uui-input {
        width: 100%;

        &[readonly] {
          margin-top: var(--uui-size-space-2);
        }
      }
    `];d([a.state()],exports.element.prototype,"_allowedMediaTypeUniques",2);d([a.state()],exports.element.prototype,"_config",2);d([a.query("umb-input-document")],exports.element.prototype,"_documentPickerElement",2);d([a.query("umb-input-media")],exports.element.prototype,"_mediaPickerElement",2);d([a.query("#link-anchor",!0)],exports.element.prototype,"_linkAnchorInput",2);exports.element=d([a.customElement("button-link-picker-modal")],exports.element);const Y=exports.element;exports.UmbLinkPickerModalElement=exports.element;exports.default=Y;
//# sourceMappingURL=button-link-modal.element-JW6A6vZh.cjs.map

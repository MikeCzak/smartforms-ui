import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-textarea')
export default class MaterialTextarea extends AbstractFormElement {

  render(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p class="info-text">${this.info}</p>`}
      <md-filled-text-field
        class="material-field"
        type="textarea"
        .name=${this.id}
        .supportingText=${this._errorText ?? this.constraints?.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        maxLength=${ifDefined(this.constraints?.maxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        value=${this.value}
        >
      </md-filled-text-field>
    `;
  }

}
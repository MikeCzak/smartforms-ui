import { HTMLTemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-password')
export default class MaterialPassword extends AbstractFormElement {

  protected _maySaveToStorage: boolean = false;

  render(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p class="info-text">${this.info}</p>`}
      <md-filled-text-field
        class="material-field"
        type="password"
        .supportingText=${this._errorText ?? this.constraints?.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        pattern=${ifDefined(this.constraints?.pattern)}
        maxLength=${ifDefined(this.constraints?.maxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        >
      </md-filled-text-field>
    `;
  }

}
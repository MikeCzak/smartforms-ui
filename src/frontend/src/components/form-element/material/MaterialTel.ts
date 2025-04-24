import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import AbstractTel from "../base-class/AbstractTel.js";

@customElement('material-tel')
export default class MaterialTel extends AbstractTel {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="tel"
        .supportingText=${this._errorText ?? this.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        pattern=${ifDefined(this.constraints?.pattern)}
        maxLength=${ifDefined(this.constraints?.maxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        >
      </md-filled-text-field>`
  }

}
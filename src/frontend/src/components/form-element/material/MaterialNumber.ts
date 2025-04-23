import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import AbstractNumber from "../base-class/AbstractNumber.js";

@customElement('material-number')
export default class MaterialNumber extends AbstractNumber {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="number"
        .name=${this.id}
        .supportingText=${this._errorText ?? this.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        pattern=${ifDefined(this.constraints?.pattern)}
        maxLength=${ifDefined(this.constraints?.maxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        min=${(ifDefined(this.constraints?.min))}
        max=${(ifDefined(this.constraints?.max))}
        >
      </md-filled-text-field>
    `;
  }

}
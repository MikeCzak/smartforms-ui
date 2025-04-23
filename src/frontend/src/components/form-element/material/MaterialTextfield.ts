import { HTMLTemplateResult, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('material-textfield')
export default class MaterialTextfield extends AbstractTextfield {

  public render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="text"
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

import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTel from "../base-class/AbstractTel.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement('material-tel')
export default class MaterialTel extends AbstractTel {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="tel"
        .name=${this.id}
        .supportingText=${this.info}
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
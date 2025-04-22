import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import AbstractEmail from "../base-class/AbstractEmail.js";

@customElement('material-email')
export default class MaterialEmail extends AbstractEmail {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="email"
        .name=${this.id}
        .supportingText=${this.info}
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
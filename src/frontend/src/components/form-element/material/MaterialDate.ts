import { HTMLTemplateResult, html, css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement } from "lit/decorators.js";
import AbstractDate from "../base-class/AbstractDate.js";

@customElement('material-date')
export default class MaterialDate extends AbstractDate {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field
        class="material-field"
        type="date"
        .name=${this.id}
        .supportingText=${this.info}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        min=${(ifDefined(this.constraints?.min))}
        max=${(ifDefined(this.constraints?.max))}
        >
      </md-filled-text-field>
      `
  }

}
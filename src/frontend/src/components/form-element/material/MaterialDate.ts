import { HTMLTemplateResult, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-date')
export default class MaterialDate extends AbstractFormElement {

  render(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p class="info-text">${this.info}</p>`}
      <md-filled-text-field
        class="material-field"
        type="date"
        .supportingText=${this._errorText ?? this.constraints?.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        label=${this.label}
        min=${(ifDefined(this.constraints?.min))}
        max=${(ifDefined(this.constraints?.max !== "today" ? this.constraints?.max : undefined))}
        value=${this.value}
        >
      </md-filled-text-field>
      `
  }

}
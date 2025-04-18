import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextarea from "../base-class/AbstractTextarea.js";

@customElement('material-textarea')
export default class MaterialTextarea extends AbstractTextarea {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field type="textarea" .name=${this.id} @input=${this.handleInput} ?required=${this.required} label=${this.label}>
      </md-filled-text-field>
    `;
  }

}
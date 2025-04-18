import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractNumber from "../base-class/AbstractNumber.js";

@customElement('material-number')
export default class MaterialNumber extends AbstractNumber {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field .name=${this.id} @input=${this.handleInput} type=number ?required=${this.required} label="${this.label}">
      </md-filled-text-field>
    `;
  }

}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractDate from "../base-class/AbstractDate.js";

@customElement('material-date')
export default class MaterialDate extends AbstractDate {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field .name=${this.id} @input=${this.handleInput} type=date label="${this.label}"></md-filled-text-field>
      `
  }

}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('material-textfield')
export default class MaterialTextfield extends AbstractTextfield {

  public render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field ?required=${this._required} label="${this.label}">
      </md-filled-text-field>
    `;
  }
}

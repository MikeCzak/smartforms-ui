import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('material-textfield')
export default class MaterialTextfield extends AbstractTextfield {

  public render(): HTMLTemplateResult {
    return html`
      <md-outlined-text-field ?required=${this._required} label="${this._label}">
      </md-outlined-text-field>
    `;
  }
}

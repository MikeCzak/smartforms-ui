import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractPassword from "../base-class/AbstractPassword.js";

@customElement('material-password')
export default class MaterialPassword extends AbstractPassword {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field name=${this.id} type=password ?required=${this._required} label="${this.label}">
      </md-filled-text-field>
    `;
  }

}
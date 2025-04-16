import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractEmail from "../base-class/AbstractEmail.js";

@customElement('material-email')
export default class MaterialEmail extends AbstractEmail {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field type=email ?required=${this._required} label="${this.label}">
      </md-filled-text-field>
    `;
  }

}
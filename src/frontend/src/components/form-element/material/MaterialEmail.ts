import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractEmail from "../base-class/AbstractEmail.js";

@customElement('material-email')
export default class MaterialEmail extends AbstractEmail {

  render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field .name=${this.id} @input=${this.handleInput} type=email ?required=${this.required} label="${this.label}">
      </md-filled-text-field>
    `;
  }

}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('material-textfield')
export default class MaterialTextfield extends AbstractTextfield {



  public render(): HTMLTemplateResult {
    return html`
      <md-filled-text-field .name=${this.id} @input=${this.handleInput} ?required=${this.required} label=${this.label}>
      </md-filled-text-field>
    `;
  }
}

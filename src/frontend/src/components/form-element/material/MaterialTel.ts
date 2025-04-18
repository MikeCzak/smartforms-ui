import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTel from "../base-class/AbstractTel.js";

@customElement('material-tel')
export default class MaterialTel extends AbstractTel {

  render(): HTMLTemplateResult {
    return html`<md-filled-text-field .name=${this.id} @input=${this.handleInput} type=tel ?required=${this.required} label="${this.label}">
    </md-filled-text-field>`
  }

}
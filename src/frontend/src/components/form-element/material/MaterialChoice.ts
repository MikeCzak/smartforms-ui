import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import AbstractChoice from "../base-class/AbstractChoice.js";

@customElement('material-choice')
export default class MaterialChoice extends AbstractChoice {



// TODO: fix CSS issue (setting css in section works)
// TODO: add rules for cb/radio depending on 1 el/more els, etc.

public sc(): HTMLTemplateResult {
  return html`${this.options.map((option, index) => html`
    <div class="choice">
      <label for=${this.id + '-' + index}>
        <md-radio id=${this.id + '-' + index} name=${this.id} value=${option}></md-radio>
        ${option}
      </label>
    </div>
  `)}`
};

public mc(): HTMLTemplateResult {
  return html`${this.options.map((option, index) => html`
    <div class="choice">
      <label for=${this.id + '-' + index}>
        <md-checkbox id=${this.id + '-' + index} name=${this.id} value=${option}></md-checkbox>
        ${option}
      </label>
    </div>
  `)}`
};

  render(): HTMLTemplateResult {
    return html`
    <h4>${this.label}</h4>

      ${choose(this.choiceType, [
        ["single", () => this.sc()],
        ["multiple", () => this.mc()]
      ])}
    `
  }
}
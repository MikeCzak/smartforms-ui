import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import AbstractChoice from "../base-class/AbstractChoice.js";

@customElement('material-choice')
export default class MaterialChoice extends AbstractChoice {



// TODO: fix CSS issue (setting css in section works)
// TODO: add rules for cb/radio depending on 1 el/more els, etc.

  private selectChoiceType() {
    switch(this.choiceType) {
      case "single":
        if(this.options.length < 5) {
          return this.radio();
        }
        return this.dropdown();
      case "multiple": return this.checkbox();

      default: throw new Error(`Invalid choice type on Choice ${this.label}: ${this.choiceType}`);
    }
  }

  static styles = AbstractChoice.styles;

  render(): HTMLTemplateResult {
    return html`
    <h4>${this.label}</h4>
      ${this.selectChoiceType()}
    `
  }
}
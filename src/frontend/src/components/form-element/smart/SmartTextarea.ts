import { HTMLTemplateResult, html, css, CSSResultGroup } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-textarea')
export default class SmartTextarea extends AbstractSmartElement {

  protected inputType: InputType = null;

  static styles: CSSResultGroup = [
    AbstractSmartElement.styles,
    css`
      textarea {
        width: 100%;
        box-sizing: border-box;
      }
      `
    ]

  protected override inputHTML(): HTMLTemplateResult {
    return html`
    <textarea
      rows="5"
      @input=${this.handleInput}
      ?required=${this.required}
      maxLength=${ifDefined(this.formattedMaxLength)}
      minLength=${ifDefined(this.constraints?.minLength)}
      min=${(ifDefined(this.constraints?.min))}
      max=${(ifDefined(this.constraints?.max))}
      .value=${this.formattedValue}
      ></textarea>
    `
  }
}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-textarea')
export default class SmartTextarea extends AbstractSmartElement {

  protected inputType: InputType = "text";

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-range')
export default class SmartRange extends AbstractSmartElement {

  protected inputType: InputType = "range";

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractNumber from "../base-class/AbstractNumber.js";

@customElement('smart-number')
export default class SmartNumber extends AbstractNumber {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
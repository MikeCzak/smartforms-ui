import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('smart-textfield')
export default class SmartTextfield extends AbstractTextfield {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
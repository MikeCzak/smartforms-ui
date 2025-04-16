import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractEmail from "../base-class/AbstractEmail.js";

@customElement('smart-email')
export default class SmartEmail extends AbstractEmail {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
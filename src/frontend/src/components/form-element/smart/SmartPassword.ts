import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractPassword from "../base-class/AbstractPassword.js";

@customElement('smart-password')
export default class SmartPassword extends AbstractPassword {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
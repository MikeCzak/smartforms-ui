import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSubmit from "../base-class/AbstractSubmit.js";

@customElement('smart-submit')
export default class SmartSubmit extends AbstractSubmit {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
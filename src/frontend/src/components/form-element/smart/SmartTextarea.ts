import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextarea from "../base-class/AbstractTextarea.js";

@customElement('smart-textarea')
export default class SmartTextarea extends AbstractTextarea {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
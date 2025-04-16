import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTel from "../base-class/AbstractTel.js";

@customElement('smart-tel')
export default class SmartTel extends AbstractTel {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
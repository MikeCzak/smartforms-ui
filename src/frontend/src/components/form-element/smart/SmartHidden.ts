import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractHidden from "../base-class/AbstractHidden.js";

@customElement('smart-hidden')
export default class SmartHidden extends AbstractHidden {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
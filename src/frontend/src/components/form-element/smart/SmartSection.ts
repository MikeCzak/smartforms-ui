import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSection from "../base-class/AbstractSection.js";

@customElement('smart-section')
export default class SmartSection extends AbstractSection {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
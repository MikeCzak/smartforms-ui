import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSection from "../base-class/AbstractSection.js";
import AbstractSmartElement from "./AbstractSmartElement.js";

@customElement('smart-section')
export default class SmartSection extends AbstractSection {

  static styles = [
    AbstractSmartElement.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;

      }
      .section {
        border: 1px solid transparent;
        border-radius: var(--smart-border-radius);
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 24px;
      }
    `
  ];

public override render(): HTMLTemplateResult {
  return html`
  <div class="section smart-container">
    <div class="section-header">
      <h2>${this.label}</h2>
      ${this.info && html`<p>${this.info}</p>`}
    </div>
    <slot></slot>
  </div>
  `;
}
}
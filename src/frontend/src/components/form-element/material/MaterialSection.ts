import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSection from "../base-class/AbstractSection.js";

@customElement('material-section')
export default class MaterialSection extends AbstractSection {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
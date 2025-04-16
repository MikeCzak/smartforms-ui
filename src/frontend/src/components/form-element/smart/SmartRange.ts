import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractRange from "../base-class/AbstractRange.js";

@customElement('smart-range')
export default class SmartRange extends AbstractRange {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
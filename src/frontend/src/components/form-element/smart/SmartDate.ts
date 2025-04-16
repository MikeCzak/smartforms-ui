import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractDate from "../base-class/AbstractDate.js";

@customElement('smart-date')
export default class SmartDate extends AbstractDate {
  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }
}
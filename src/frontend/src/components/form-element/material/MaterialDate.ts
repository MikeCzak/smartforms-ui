import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractDate from "../base-class/AbstractDate.js";

@customElement('material-date')
export default class MaterialDate extends AbstractDate {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
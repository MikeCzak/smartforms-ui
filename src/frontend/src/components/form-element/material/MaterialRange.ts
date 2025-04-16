import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractRange from "../base-class/AbstractRange.js";

@customElement('material-range')
export default class MaterialRange extends AbstractRange {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-range')
export default class MaterialRange extends AbstractFormElement {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
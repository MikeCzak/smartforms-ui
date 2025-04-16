import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextarea from "../base-class/AbstractTextarea.js";

@customElement('material-textarea')
export default class MaterialTextarea extends AbstractTextarea {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractChoice from "../base-class/AbstractChoice.js";

@customElement('material-choice')
export default class MaterialChoice extends AbstractChoice {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
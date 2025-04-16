import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSubmit from "../base-class/AbstractSubmit.js";

@customElement('material-submit')
export default class MaterialSubmit extends AbstractSubmit {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
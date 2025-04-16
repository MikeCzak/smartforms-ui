import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTel from "../base-class/AbstractTel.js";

@customElement('material-tel')
export default class MaterialTel extends AbstractTel {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
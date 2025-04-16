import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractPassword from "../base-class/AbstractPassword.js";

@customElement('material-password')
export default class MaterialPassword extends AbstractPassword {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
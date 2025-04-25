import { HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-hidden')
export default class MaterialHidden extends AbstractFormElement {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
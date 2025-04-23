import { HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractHidden from "../base-class/AbstractHidden.js";

@customElement('material-hidden')
export default class MaterialHidden extends AbstractHidden {

  render(): HTMLTemplateResult {
    throw new Error("Method not implemented.");
  }

}
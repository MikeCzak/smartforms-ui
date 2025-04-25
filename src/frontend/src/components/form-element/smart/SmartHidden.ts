import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-hidden')
export default class SmartHidden extends AbstractSmartElement {

  protected inputType: InputType = "hidden";
}
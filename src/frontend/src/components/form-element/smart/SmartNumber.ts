import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-number')
export default class SmartNumber extends AbstractSmartElement {

  protected inputType: InputType = "number";
}
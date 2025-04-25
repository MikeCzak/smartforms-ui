import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-tel')
export default class SmartTel extends AbstractSmartElement {

  protected inputType: InputType = "tel";
}
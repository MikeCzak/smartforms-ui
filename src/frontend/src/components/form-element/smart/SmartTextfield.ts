import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-textfield')
export default class SmartTextfield extends AbstractSmartElement {

  protected inputType: InputType = "text";

}
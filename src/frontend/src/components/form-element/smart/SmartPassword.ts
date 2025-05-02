import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-password')
export default class SmartPassword extends AbstractSmartElement {

  protected inputType: InputType = "password";
  protected maySaveToStorage: boolean = false;
}
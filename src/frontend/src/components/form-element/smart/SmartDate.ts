import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-date')
export default class SmartDate extends AbstractSmartElement {

  protected inputType: InputType = "date";

}
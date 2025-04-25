import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-email')
export default class SmartEmail extends AbstractSmartElement {

  protected inputType: InputType = "email";
}
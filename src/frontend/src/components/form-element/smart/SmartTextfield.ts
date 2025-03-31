import AbstractTextfield from "../base-class/AbstractTextfield.js";

export default class SmartTextfield extends AbstractTextfield {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
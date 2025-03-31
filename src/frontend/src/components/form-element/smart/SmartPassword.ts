import AbstractPassword from "../base-class/AbstractPassword.js";

export default class SmartPassword extends AbstractPassword {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
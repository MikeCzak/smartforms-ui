import AbstractEmail from "../base-class/AbstractEmail.js";

export default class SmartEmail extends AbstractEmail {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
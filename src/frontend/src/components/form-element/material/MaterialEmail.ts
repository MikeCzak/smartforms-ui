import AbstractEmail from "../base-class/AbstractEmail.js";

export default class MaterialEmail extends AbstractEmail {

  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }

}
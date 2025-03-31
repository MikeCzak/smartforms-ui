import AbstractTel from "../base-class/AbstractTel.js";

export default class SmartTel extends AbstractTel {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
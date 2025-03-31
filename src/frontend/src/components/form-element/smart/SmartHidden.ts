import AbstractHidden from "../base-class/AbstractHidden.js";

export default class SmartHidden extends AbstractHidden {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
import AbstractTextarea from "../base-class/AbstractTextarea.js";

export default class SmartTextarea extends AbstractTextarea {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
import AbstractSection from "../base-class/AbstractSection.js";

export default class SmartSection extends AbstractSection {
  getHTMLResult(): HTMLElement {
    throw new Error("Method not implemented.");
  }
}
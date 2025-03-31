import AbstractFormElement from "../AbstractFormElement.js";

export default abstract class AbstractTel extends AbstractFormElement {
  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
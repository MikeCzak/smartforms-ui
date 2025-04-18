import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractHidden extends AbstractFormElement {

  protected inputType: InputType = "hidden";

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
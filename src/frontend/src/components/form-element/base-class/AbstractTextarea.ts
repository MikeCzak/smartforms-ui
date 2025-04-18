import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractTextarea extends AbstractFormElement {

  protected inputType: InputType = "text";

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
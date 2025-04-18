import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractPassword extends AbstractFormElement {

  protected inputType: InputType = "password";

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
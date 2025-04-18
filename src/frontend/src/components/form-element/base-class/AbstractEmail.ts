import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractEmail extends AbstractFormElement {

  protected inputType: InputType = "email";

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractDate extends AbstractFormElement {

  protected inputType: InputType = "date";

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
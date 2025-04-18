import AbstractFormElement from "../AbstractFormElement.js";
import { InputType } from "../InputType.js";

export default abstract class AbstractRange extends AbstractFormElement {

  protected inputType: InputType = "range";


  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
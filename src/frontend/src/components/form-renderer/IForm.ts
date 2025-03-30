import { HTMLTemplateResult } from "lit";
import IFormElement from "../form-element/IFormElement.js";

export default interface IForm {
  addFormElement(element: IFormElement): IForm;
  getFormElements(): Array<IFormElement>;
  getFormElementById(id: string): IFormElement;

  render(): HTMLTemplateResult;

}
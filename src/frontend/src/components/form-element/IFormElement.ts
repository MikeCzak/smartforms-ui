import { HTMLTemplateResult } from "lit";
import AbstractSection from "./base-class/AbstractSection.js";

export default interface IFormElement {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly info: string;
  isRequired(): Boolean;
  addDependingField(element: IFormElement|AbstractSection): IFormElement
  addDependingFields(...elements: IFormElement[]): IFormElement
  validate(): Boolean;
  render(): HTMLTemplateResult
}
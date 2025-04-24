import { HTMLTemplateResult } from "lit";
import AbstractSection from "./base-class/AbstractSection.js";

export default interface IFormElement extends HTMLElement {
  readonly id: string;
  value: any;
  readonly name: string;
  readonly label: string;
  readonly info?: string;
  isRequired(): Boolean;
  addDependingField(element: IFormElement|AbstractSection): IFormElement;
  readonly metaData: Map<string, any>;
  /**
   * Returns the element if validation fails, null otherwise.
   */
  validate(): IFormElement | null;
  render(): HTMLTemplateResult
}
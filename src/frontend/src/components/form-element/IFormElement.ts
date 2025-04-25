import { HTMLTemplateResult } from "lit";
import AbstractSection from "./base-class/AbstractSection.js";

export default interface IFormElement extends HTMLElement {
  readonly id: string;
  value: any;
  required: boolean;
  readonly name: string;
  readonly originalName: string;
  readonly label: string;
  readonly info?: string;
  addDependingField(element: IFormElement|AbstractSection): IFormElement;
  readonly metaData: Map<string, any>;
  /**
   * Returns the element if validation fails, null otherwise.
   */
  validate(): IFormElement | null;
  render(): HTMLTemplateResult
}
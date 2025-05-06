import { HTMLTemplateResult } from "lit";
import AbstractSection from "./base-class/AbstractSection.js";
import INavigator from "../../util/INavigator.js";

export default interface IFormElement extends HTMLElement {
  readonly id: string;
  value: any;
  required: boolean;
  readonly name: string;
  readonly originalName: string;
  readonly label: string;
  readonly info?: string;
  next: IFormElement;
  prev: IFormElement
  addDependingField(element: IFormElement|AbstractSection): IFormElement;
  readonly metaData: Map<string, any>;
  willBlockArrowNavigation: () => boolean;
  readonly navigator: INavigator | null;
  setNavigator(navigator: INavigator | null): void
  readonly yPos: number | undefined;
  /**
   * Returns the element if validation fails, null otherwise.
   */
  validate(): IFormElement | null;
  isValid(): boolean;
  render(): HTMLTemplateResult
}
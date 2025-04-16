import { HTMLTemplateResult } from "lit";

export default interface IFormElement {
  readonly id: string;
  readonly label: string;
  isRequired(): Boolean;
  addDependingField(...elements: IFormElement[]): IFormElement
  validate(): Boolean;
  render(): HTMLTemplateResult
  // getHTMLResult(): HTMLElement;  // TODO: delete if render() from inherited lit is enough
}
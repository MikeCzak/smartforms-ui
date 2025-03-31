export default interface IFormElement {
  readonly id: string;
  readonly label: string;
  isRequired(): Boolean;
  addDependingField(...elements: IFormElement[]): IFormElement
  validate(): Boolean;
  getHTMLResult(): HTMLElement;

}
import AbstractFormElement from "../AbstractFormElement.js";
import IFormElement from "../IFormElement.js";

export default abstract class AbstractChoice extends AbstractFormElement {

  private _options: Array<string>;

  private _choiceType: "single"|"multiple";

  constructor(
    id: string,
    name: string,
    label: string,
    info: string,
    options: Array<string>,
    choiceType: "single"|"multiple",
    isRequired: boolean = true,
    constraints: {[key: string]: any}|undefined = undefined,
    dependsOn: IFormElement|undefined = undefined,
  ) {
    super(id, name, label, info, isRequired, constraints, dependsOn);
    this._options = options;
    this._choiceType = choiceType;
  }

  get options() {
    return this._options;
  }

  get choiceType() {
    return this._choiceType;
  }


  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
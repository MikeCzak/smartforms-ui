import AbstractFormElement from "../AbstractFormElement.js";
import IChoiceElementParams from "../IChoiceElementParams.js";

export default abstract class AbstractChoice extends AbstractFormElement {

  private _options: Array<string> | { groupName: string; entries: string[] }[];

  private _choiceType: "single"|"multiple";


  constructor(params: IChoiceElementParams) {
    super(params);
    if(params.options.length === 0) {
      throw new Error("Options must not be empty.");
    }
    this._options = params.options;
    this._choiceType = params.choiceType;
  }

  get options(): Array<string> | { groupName: string; entries: string[] }[] {
    return this._options;
  }

  get choiceType() {
    return this._choiceType;
  }

  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }
}
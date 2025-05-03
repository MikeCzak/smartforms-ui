import AbstractFormElement from "../AbstractFormElement.js";
import IChoiceElementParams from "../IChoiceElementParams.js";

export default abstract class AbstractChoice extends AbstractFormElement {

  private _options: Array<string> | { groupName: string; entries: string[] }[];
  private _numOptions: number = 0;

  private _choiceType: "single"|"multiple";


  constructor(params: IChoiceElementParams) {
    super(params);
    if(params.options.length === 0) {
      throw new Error("Options must not be empty.");
    }
    this._options = params.options;
    this._choiceType = params.choiceType;

    if(typeof this.options[0] === 'string') {
      this._numOptions = this.options.length;
    } else if (typeof this.options[0] === 'object') {
      this.options.forEach(option => {this._numOptions += (option as { groupName: string; entries: string[] }).entries.length})
    }
    if (this._numOptions === 0) {
      throw new Error("Error parsing options array");
    }
  }

  get options(): Array<string> | { groupName: string; entries: string[] }[] {
    return this._options;
  }

  get numOptions(): number {
    return this._numOptions;
  }

  get choiceType() {
    return this._choiceType;
  }

  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }
}
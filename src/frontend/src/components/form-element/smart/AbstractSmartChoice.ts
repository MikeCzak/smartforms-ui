import IChoiceElementParams from "../IChoiceElementParams.js";
import AbstractSmartElement from "./AbstractSmartElement.js";

export default abstract class AbstractSmartChoice extends AbstractSmartElement {

  private _options: Array<string>;

  private _choiceType: "single"|"multiple";


  constructor(params: IChoiceElementParams) {
    super(params);
    this._options = params.options;
    this._choiceType = params.choiceType;
  }

  get options() {
    if(this._options.length > 5)
      {
        this._options.sort()
      }
    return this._options;
  }

  get choiceType() {
    return this._choiceType;
  }

  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }
}
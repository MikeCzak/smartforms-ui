import { query } from "lit/decorators.js";
import IChoiceElementParams from "../IChoiceElementParams.js";
import AbstractSmartElement from "./AbstractSmartElement.js";

export default abstract class AbstractSmartChoice extends AbstractSmartElement {

  private _options: Array<string> | { groupName: string; entries: string[] }[];

  private _choiceType: "single"|"multiple";

  @query('md-checkbox') protected mdCheckbox?: HTMLElement;
  @query('md-radio') protected mdRadio?: HTMLElement;
  @query('md-outlined-select') protected mdSelect?: HTMLElement;


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

  protected override setTabIndexForSafari() {
    this.addEventListener('focus', this.focusDelegation);
  };

  protected focusDelegation(e: FocusEvent) {
    const inputCheckbox = this.mdCheckbox?.shadowRoot?.querySelector('input') as HTMLInputElement;
    const inputRadio = this.mdCheckbox?.shadowRoot?.querySelector('input') as HTMLInputElement;
    const inputSelect = this.mdCheckbox?.shadowRoot?.querySelector('select') as HTMLSelectElement;
    if(inputCheckbox) {
      inputCheckbox.focus();
    }
    if(inputRadio) {
      inputRadio.focus();
    }
    if(inputSelect) {
      inputSelect.focus();
    }
  }
}
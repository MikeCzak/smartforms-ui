import { query } from "lit/decorators.js";
import { HTMLTemplateResult } from "lit";
import IChoiceElementParams from "../IChoiceElementParams.js";
import AbstractSmartElement from "./AbstractSmartElement.js";

export default abstract class AbstractSmartChoice extends AbstractSmartElement {

  private _options: Array<string> | { groupName: string; entries: string[] }[];
  private _numOptions: number = 0;

  private _choiceType: "single"|"multiple";
  private _grouped: boolean;
  protected renderType!: "checkbox" | "radio" | "dropdown" | "searchableDropdown";

  protected renderMap: { [key: string]: (grouped: boolean) => HTMLTemplateResult } = {
    checkbox: (grouped: boolean) => this.checkbox(grouped),
    radio: () => this.radio(),
    dropdown: (grouped: boolean) => this.dropdown(grouped),
    searchableDropdown: (grouped: boolean) => this.searchableDropdown(grouped)
  }

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
    this._grouped = !(typeof this._options[0] === 'string');

    if(typeof this.options[0] === 'string') {
      this._numOptions = this.options.length;
    } else if (typeof this.options[0] === 'object') {
      this.options.forEach(option => {this._numOptions += (option as { groupName: string; entries: string[] }).entries.length})
    }
    if (this._numOptions === 0) {
      throw new Error("Error parsing options array");
    }
    this.setRenderType();
  }

  get options(): Array<string> | { groupName: string; entries: string[] }[] {
    return this._options;
  }

  get grouped(): boolean {
    return this._grouped;
  }

  get choiceType() {
    return this._choiceType;
  }

  protected setRenderType() {
    if (this._numOptions === 1) {
      this.renderType = "checkbox";
    }
    switch(this.choiceType) {
      case "single":
        if(this._numOptions < 5) {
          this.renderType = "radio";
          this._grouped = false;
        }
        if(this._numOptions < 15) {
          this.renderType = "dropdown";
        }
        this.renderType = "searchableDropdown";
        break;
      case "multiple":
        this.renderType = "checkbox";
        break;
      default: throw new Error(`Invalid choice type on Choice ${this.label}: ${this.choiceType}`);
    }
  }

  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }

  protected override setCustomEventListeners() {
    this.addEventListener('focus', this.focusDelegation);
    if(this.renderType === "searchableDropdown") {
      this.addEventListener('focus', this.showDropdown);
      this.addEventListener('click', this.showDropdown);
      this.addEventListener('blur', this.hideDropdown);
    }
  };

  protected override removeCustomEventListeners() {
    if(this.renderType === "searchableDropdown") {
      this.removeEventListener('focus', this.showDropdown);
      this.removeEventListener('click', this.showDropdown);
      this.removeEventListener('blur', this.hideDropdown);
    }
  }

  protected focusDelegation(e: FocusEvent) {
    const inputCheckbox = this.mdCheckbox?.shadowRoot?.querySelector('input') as HTMLInputElement;
    if(inputCheckbox) {
      inputCheckbox.focus();
    }
    if(this.mdRadio) {
      this.mdRadio.focus();
    }
    if(this.mdSelect) {
      this.mdSelect.focus();
    }
  }

  protected abstract checkbox(grouped: boolean): HTMLTemplateResult;
  protected abstract radio(): HTMLTemplateResult;
  protected abstract dropdown(grouped: boolean): HTMLTemplateResult;
  protected abstract searchableDropdown(grouped: boolean): HTMLTemplateResult;
  protected abstract showDropdown(e?: Event): void;
  protected abstract hideDropdown(e?: FocusEvent): void;
}
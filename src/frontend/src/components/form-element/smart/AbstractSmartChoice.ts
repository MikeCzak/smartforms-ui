import { query, state } from "lit/decorators.js";
import { HTMLTemplateResult } from "lit";
import IChoiceElementParams from "../IChoiceElementParams.js";
import AbstractSmartElement from "./AbstractSmartElement.js";

export default abstract class AbstractSmartChoice extends AbstractSmartElement {

  private _options: Array<string> | { groupName: string; entries: string[] }[];
  private _numOptions: number = 0;

  private _choiceType: "single"|"multiple";
  private _grouped: boolean;
  protected renderType!: "checkbox" | "radio" | "dropdown" | "searchableDropdown";
  @state() protected query: string = this.value;

  protected renderMap: { [key: string]: (grouped: boolean) => HTMLTemplateResult } = {
    checkbox: (grouped: boolean) => this.checkbox(grouped),
    radio: () => this.radio(),
    dropdown: (grouped: boolean) => this.dropdown(grouped),
    searchableDropdown: (grouped: boolean) => this.searchableDropdown(grouped)
  }

  @query('md-checkbox') protected mdCheckbox?: HTMLElement;
  @query('input[type=radio checked]') protected smartRadio?: HTMLElement;
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
    if(this.renderType === "checkbox") {
      this.setAttribute('tabindex', '0');
    }
  }

  protected override _attachShadow(): void {
    this.attachShadow({ mode: 'open', delegatesFocus: false });
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

  get inputElement(): HTMLElement {
    let targetInput;
    switch(this.renderType) {
      case "checkbox": targetInput = this.mdCheckbox; break;
      case "radio": targetInput = this.shadowRoot?.querySelector('input[type=radio]:checked') ?? this.shadowRoot?.querySelector('input[type=radio]'); break;
      case "dropdown": targetInput = this.mdSelect; break;
      default: targetInput = this.shadowRoot?.querySelector('input');
    }

    return targetInput as HTMLInputElement;
  }

  get inputElementTagName(): string {
    let inputElementTagName;
    switch(this.renderType) {
      case "checkbox": inputElementTagName = "MD-CHECKBOX" ;break;
      case "dropdown": inputElementTagName = "MD-OUTLINED-SELECT" ;break;
      default: inputElementTagName = "INPUT";
    }
    return inputElementTagName;
  }

  protected setRenderType() {
    if (this._numOptions === 1) {
      this.renderType = "checkbox";
      return;
    }
    switch(this.choiceType) {
      case "single":
        if(this._numOptions <= 5) {
          this.renderType = "radio";
          this._grouped = false;
          return;
        }
        if(this._numOptions <= 15) {
          this.renderType = "dropdown";
          return;
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

  protected override customInitializer() {
    this.query = this.value;
  }

  protected override setCustomEventListeners() {
    if(this.renderType === "searchableDropdown") {
      this.addEventListener('focus', this.showDropdown);
      this.addEventListener('click', this.showDropdown);
      this.addEventListener('blur', this.hideDropdown);
    } else if(this.renderType === "checkbox") {
      this.addEventListener('focus', this.checkboxFocusDelegation);
      this.updateComplete.then(() => {
        this.mdCheckbox?.addEventListener('focus', this.checkboxFocusDelegation);
        this.mdCheckbox?.addEventListener('blur', this.setTabIndex);
      })
    }
  };

  protected override removeCustomEventListeners() {
    if(this.renderType === "searchableDropdown") {
      this.removeEventListener('focus', this.showDropdown);
      this.removeEventListener('click', this.showDropdown);
      this.removeEventListener('blur', this.hideDropdown);
    } else if(this.renderType === "checkbox") {
      this.mdCheckbox?.removeEventListener('focus', this.checkboxFocusDelegation);
      this.mdCheckbox?.removeEventListener('blur', this.setTabIndex);
      this.removeEventListener('focus', this.checkboxFocusDelegation);
    }
  }

  // delegates click only
  protected delegateFocusToInput(e: Event) {
    const path = e.composedPath() as HTMLElement[];
    const clickedInput = path.find(el => el.tagName === this.inputElementTagName);
    if (!clickedInput) {
      this.inputElement.focus({preventScroll: true});
    }
  }

  protected checkboxFocusDelegation(e: FocusEvent) {
    e.stopImmediatePropagation();
    if (this.shadowRoot?.activeElement !== this.mdCheckbox) {
      this.removeAttribute('tabindex');
      this.mdCheckbox?.focus();
    }
  }

  // delegates programmatic focus
  override focus(options?: {preventScroll: boolean, focusVisible: boolean}): void {
    const firstInput = this.shadowRoot?.querySelector('input');
    if (firstInput) {
      firstInput.focus({ preventScroll: true, ...options });
      firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


  protected setTabIndex(e: FocusEvent): void {
    this.setAttribute('tabindex', '0');
  }

  protected abstract checkbox(grouped: boolean): HTMLTemplateResult;
  protected abstract radio(): HTMLTemplateResult;
  protected abstract dropdown(grouped: boolean): HTMLTemplateResult;
  protected abstract searchableDropdown(grouped: boolean): HTMLTemplateResult;
  protected abstract showDropdown(e?: Event): void;
  protected abstract hideDropdown(e?: FocusEvent): void;
}
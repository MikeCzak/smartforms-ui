/* eslint-disable no-param-reassign */
import { when } from "lit/directives/when.js";
import { css, html, HTMLTemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-date')
export default class SmartDate extends AbstractSmartElement {

  public willBlockArrowNavigation = () => this.required;
  protected inputType: InputType = "date";
  @property() private year?: string;
  @property() private month?: string;
  @property() private day?: string;

  protected checkElementConstraints(): void {
    const { min, max } = this.constraints!;
    if(min !== undefined && min !== "today") {
      const minDate = new Date(this.constraints!.min);
      if (Number.isNaN(minDate.getTime())) {
        console.error(this.id, ": Invalid date format in min constraint");
      }
    }
    if(max !== undefined && max !== "today") {
      const maxDate = new Date(this.constraints!.max);
      if (Number.isNaN(maxDate.getTime())) {
        console.error(this.id, ": Invalid date format in max constraint");
      }
    }
  };

  protected override setCustomEventListeners(): void {
    this.addEventListener('blur', this.resumeNavigation)
    this.addEventListener('keydown', this.resumeNavigation)
  }

  private resumeNavigation(e: FocusEvent | KeyboardEvent): void {
    if (e instanceof KeyboardEvent && e.key !== 'Escape') {
      return;
    }
    this.blur();
    this._navigator?.resumeNavigation(this);
  }

  protected handleInput(event: InputEvent): void {
    const part = event.target as HTMLInputElement;
    part.value = part.value.replace(/\D/g, '')
    const partLength = Number(part.getAttribute('maxLength'));

    switch(part.getAttribute('id')?.split('_').pop()) {
      case 'year':
        this.year = part.value;
        if(part.value.length === partLength) {
          if(this.checkYearFormat()) {
            this.focusNextSubfield(part);
          } else {
            this.highlightDatePart(part);
            this.updateComplete.then(() => part.select());
          }
        }
        break;
      case 'month':
        this.month = part.value;
        if(part.value.length === partLength) {
          if(this.checkMonthFormat()) {
            this.focusNextSubfield(part);
          } else {
            this.highlightDatePart(part);
            this.updateComplete.then(() => part.select());
          }
        }
        break;
      case 'day':
        this.day = part.value;
        if(part.value.length === partLength) {
          if(this.checkDayFormat()) {
            this.focusNextSubfield(part);
          } else {
            this.highlightDatePart(part);
            this.updateComplete.then(() => part.select());
          }
        }
        break;
      default: break;
    }
    if(this.checkYearFormat() && this.checkMonthFormat() && this.checkDayFormat()) {
      this.value = `${this.year!.padStart(2, '0')}-${this.month!.padStart(2, '0')}-${this.day!.padStart(2, '0')}`;
    }
  }

  private focusNextSubfield(currentField: HTMLInputElement) {
    const allInputs = Array.from(this.shadowRoot!.querySelectorAll('input'));
      const index = allInputs.indexOf(currentField);
      const nextInput = allInputs[index + 1];
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
  }

  private checkMonthFormat(): boolean {
    const numVal = Number(this.month);
    if(!this.month) {
      return false;
    }
    if(numVal > 12) {
      this.month = "12";
      return false;
    }
    if(numVal < 1) {
      this.month = "01";
      return false;
    }
    return true;
  }

  private checkDayFormat(): boolean {
    const numVal = Number(this.day);
    if(!this.day) {
      return false;
    }
    if(numVal > 31) {
      this.day = "31";
      return false;
    }
    if(numVal < 1) {
      this.day = "01";
      return false;
    }
    return true;
  }

  private checkYearFormat(): boolean {
    const numVal = Number(this.year);
    if(!this.year || numVal === 0) {
      return false;
    }
    return true;
  }

  private blurMonthHandler(e: FocusEvent): void {
    const part = e.target as HTMLInputElement;
    if(this.checkMonthFormat()) {
      part.value = Number(part.value).toString().padStart(2, '0')
    } else {
      this.highlightDatePart(part);
    }
  }

  private blurDayHandler(e: FocusEvent): void {
    const part = e.target as HTMLInputElement;
    if(this.checkDayFormat()) {
      part.value = Number(part.value).toString().padStart(2, '0')
    } else {
      this.highlightDatePart(part);
    }
  }

  private blurYearHandler(e: FocusEvent): void {
    const part = e.target as HTMLInputElement;
    if(this.checkYearFormat()) {
      part.value = Number(part.value).toString().padStart(4, '0')
    } else {
      this.highlightDatePart(part);
    }
  }

  private highlightDatePart(part: HTMLInputElement): void {
    const label = this.shadowRoot?.querySelector(`label[for=${part.getAttribute('id')}]`)
    label!.classList.add('highlight');
    setTimeout(() => label!.classList.remove('highlight'), 500)
  }

  protected transformValueToSubfields(value: any) {
    const [year, month, day] = value.split('-');
    this.year = year;
    this.month = month;
    this.day = day;
  }

  protected validateMaxValue(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.max !== undefined && this.constraints.max === "today" && new Date(this.value) > new Date()) {
      errors.rangeOverflow = true;
      errorMessages.push(`Date must be in the past.`);
    }
    if (this.constraints?.max !== undefined && new Date(this.value) > new Date(this.constraints.max)) {
      errors.rangeOverflow = true;
      errorMessages.push(`Date must be before ${this.constraints.max}.`);
    }
  }

  protected validateMinValue(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.min !== undefined && this.constraints.min === "today" && new Date(this.value) < new Date()) {
      errors.rangeOverflow = true;
      errorMessages.push(`Date must be in the future.`);
    }
    if (this.constraints?.min !== undefined && new Date(this.value) < new Date(this.constraints.min)) {
      errors.rangeUnderflow = true;
      errorMessages.push(`Date must be after ${this.constraints.min}.`);
    }
  }

  protected delegateFocusToInput(e: Event) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInput = path.find(el => el.tagName === 'MD-OUTLINED-SELECT');
    let firstInput;
    if (!clickedInput) {
      if (this.required) {
        firstInput = this.shadowRoot?.querySelector('md-outlined-select');
      } else {
        firstInput = this.shadowRoot?.querySelector('input');
      }
      firstInput?.focus();
    }
  }

  override focus(options?: {preventScroll: boolean, focusVisible: boolean}): void {
    let firstInput;
    if (this.required) {
      firstInput = this.shadowRoot?.querySelector('md-outlined-select');
    } else {
      firstInput = this.shadowRoot?.querySelector('input');
    }
    if (firstInput) {
      firstInput.focus({ preventScroll: true, ...options });
      firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  static styles = [
    AbstractSmartElement.styles,
    css`
      .date-wrapper {
        display: flex;
        gap: 2px;
        padding: 8px 16px;
        align-items: center;
      }
      .date-part {
        display: flex;
        flex-direction: column;
        gap: 2px;
        justify-content: center;
        align-items: center;
      }
      input {
        display: block;
        border: .1px solid black;
        border-radius: 4px;
        padding: 6px;
        box-sizing: content-box;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }
      .year-input {
        width: 4ch;
      }
      .month-input, .day-input {
        width: 2ch;
      }
      label.format-restriction {
        font-size: 12px;
        color: #666;
      }
      label.format-restriction.highlight {
        color: red;
        font-weight: bold;
        animation: shake .5s alternate;
      }
      @keyframes shake {
        0% {transform: translateX(-1px)}
        10% {transform: translateX(1px)}
        20% {transform: translateX(-1px)}
        30% {transform: translateX(1px)}
        40% {transform: translateX(-1px)}
        50% {transform: translateX(1px)}
        60% {transform: translateX(-1px)}
        70% {transform: translateX(1px)}
        100% {transform: translateX(0)}
      }
      .dash {
        padding-inline: 4px;
        margin-top: -10px;
      }

      .date-wrapper.material {
        display: flex;
        gap: 2px;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 16px 16px 16px;
        align-items: center;
        justify-content: flex-start;
      }

      md-outlined-select {
        flex: 1 0 0;
        min-width: unset;
      }
      :host {
      --md-outlined-select-text-field-outline-color: var(--md-sys-color-outline);
      --md-outlined-select-text-field-focus-outline-color: var(--md-sys-color-outline);
      --md-outlined-select-text-field-outline-width: 2px;
      --md-outlined-select-text-field-hover-outline-width: 2px;
      --md-outlined-select-text-field-container-shape: 8px;
      }

      md-outlined-select::part(menu) {
        --md-menu-container-shape: 0;
      }
    `
  ]

  protected override inputHTML(): HTMLTemplateResult {
    return html`
      ${when(this.required,
        () => html`
          <div class="date-wrapper material">
            <md-outlined-select required ?error=${this._error} class="year-input" label="Year" id="${this.id}_year" @input=${this.handleInput}>
            ${Array.from({ length: 150 }, (_, i) => i + (new Date().getFullYear()+1-100)).map((option) => html`
              <md-select-option ?selected=${this.year === option.toString()} value=${option}><div slot="headline">${option}</div></md-select-option>
              `)}
            </md-outlined-select>
            <md-outlined-select required ?error=${this._error} class="month-input" label="Month" id="${this.id}_month" @input=${this.handleInput}>
            ${Array.from({ length: 12 }, (_, i) => i + 1).map((option) => html`
              <md-select-option ?selected=${this.month === option.toString().padStart(2, '0')} value=${option}><div slot="headline">${option}</div></md-select-option>
              `)}
            </md-outlined-select>
            <md-outlined-select required ?error=${this._error} class="day-input" label="Day" id="${this.id}_day" @input=${this.handleInput}>
            ${Array.from({ length: 31 }, (_, i) => i + 1).map((option) => html`
              <md-select-option ?selected=${this.day === option.toString().padStart(2, '0')} value=${option}><div slot="headline">${option}</div></md-select-option>
              `)}
            </md-outlined-select>
          </div>
        `,
        () => html`
          <div class="date-wrapper">
            <div class="date-part">
              <input @input=${this.handleInput} @blur=${this.blurYearHandler} id="${this.id}_year" type="text" class="year-input" maxlength="4" minlength="4" .value=${this.year ?? ''}>
              <label class="format-restriction" for="${this.id}_year">YYYY</label>
            </div>
            <div class="dash">-</div>
            <div class="date-part">
              <input @input=${this.handleInput} @blur=${this.blurMonthHandler} id="${this.id}_month" type="text" class="month-input" maxlength="2" minlength="2" .value=${this.month ?? ''}>
              <label class="format-restriction" for="${this.id}_month">MM</label>
            </div>
            <div class="dash">-</div>
            <div class="date-part">
              <input @input=${this.handleInput} @blur=${this.blurDayHandler} id="${this.id}_day" type="text" class="day-input" maxlength="2" minlength="2" .value=${this.day ?? ''}>
              <label class="format-restriction" for="${this.id}_day">DD</label>
            </div>
          </div>
        `
      )}
    `
  }

}
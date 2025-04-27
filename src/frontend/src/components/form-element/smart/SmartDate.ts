import { when } from "lit/directives/when.js";
import { css, html, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSmartElement from "./AbstractSmartElement.js";
import { InputType } from "../InputType.js";

@customElement('smart-date')
export default class SmartDate extends AbstractSmartElement {

  protected inputType: InputType = "date";
  private year?: string;
  private month?: string;
  private day?: string;

  protected handleInput(event: InputEvent): void {
    const part = event.target as HTMLInputElement;
    part.value = part.value.replace(/\D/g, '')
    let numVal = Number(part.value);
    switch(part.getAttribute('id')?.split('_').pop()) {
      case 'year':
        this.year = part.value;
        break;
      case 'month':
        if(numVal > 12) {
          numVal = 12;
          this.highlightDatePart(part);
          part.value = numVal.toString();
        }
        if(numVal < 1) {
          numVal = 1;
          this.highlightDatePart(part);
          part.value = numVal.toString();
        }
        this.month = part.value.padStart(2, '0');
        break;
      case 'day':
        if(numVal > 31) {
          numVal = 31;
          this.highlightDatePart(part);
          part.value = numVal.toString();
        }
        if(numVal < 1) {
          numVal = 1;
          this.highlightDatePart(part);
          part.value = numVal.toString();
        }
        this.day = part.value.padStart(2, '0');
        break;
      default: break;
    }
    if([this.year, this.month, this.day].every(val => val !== undefined)) {
      this.value = `${this.year}-${this.month!}-${this.day}`;
    }
    const partLength = Number(part.getAttribute('maxLength'));
    if(part.value.length === partLength) {
      const allInputs = Array.from(this.shadowRoot!.querySelectorAll('input'));
      const index = allInputs.indexOf(part);
      const nextInput = allInputs[index + 1];
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  }

  private highlightDatePart(part: HTMLInputElement): void {
    const label = this.shadowRoot?.querySelector(`label[for=${part.getAttribute('id')}]`)
    label!.classList.add('highlight');
    setTimeout(() => label!.classList.remove('highlight'), 500)
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
            ${Array.from({ length: 100 }, (_, i) => i + 1925).map((option) => html`
              <md-select-option value=${option}><div slot="headline">${option}</div></md-select-option>`)}
            </md-outlined-select>
            <md-outlined-select required ?error=${this._error} class="month-input" label="Month" id="${this.id}_month" @input=${this.handleInput}>
            ${Array.from({ length: 12 }, (_, i) => i + 1).map((option) => html`
              <md-select-option value=${option}><div slot="headline">${option}</div></md-select-option>`)}
            </md-outlined-select>
            <md-outlined-select required ?error=${this._error} class="day-input" label="Day" id="${this.id}_day" @input=${this.handleInput}>
            ${Array.from({ length: 31 }, (_, i) => i + 1).map((option) => html`
              <md-select-option value=${option}><div slot="headline">${option}</div></md-select-option>`)}
            </md-outlined-select>
          </div>
        `,
        () => html`
          <div class="date-wrapper">
            <div class="date-part">
              <input @input=${this.handleInput} id="${this.id}_year" type="text" class="year-input" maxlength="4" minlength="4">
              <label class="format-restriction" for="${this.id}_year">YYYY</label>
            </div>
            <div class="dash">-</div>
            <div class="date-part">
              <input @input=${this.handleInput} id="${this.id}_month" type="text" class="month-input" maxlength="2" minlength="2">
              <label class="format-restriction" for="${this.id}_month">MM</label>
            </div>
            <div class="dash">-</div>
            <div class="date-part">
              <input @input=${this.handleInput} id="${this.id}_day" type="text" class="day-input" maxlength="2" minlength="2">
              <label class="format-restriction" for="${this.id}_day">DD</label>
            </div>
          </div>
        `
      )}
    `
  }

}
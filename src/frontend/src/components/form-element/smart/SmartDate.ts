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
        this.month = part.value;
        break;
      case 'day':
        if(numVal > 31) {
          numVal = 31;
          this.highlightDatePart(part);
          part.value = numVal.toString();
        }
        this.day = part.value;
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
    console.log(label, label!.classList)
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
    `
  ]

  protected override inputHTML(): HTMLTemplateResult {
    return html`
      ${when(this.required,
        () => html`
          d
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
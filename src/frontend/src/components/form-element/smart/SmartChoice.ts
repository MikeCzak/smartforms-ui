/* eslint-disable wc/guard-super-call */
import { css, html, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { InputType } from "../InputType.js";
import AbstractChoice from "../base-class/AbstractChoice.js";
import Colors from "../Colors.js";
import SmartInputs from "../SmartInputs.js";

@customElement('smart-choice')
export default class SmartChoice extends AbstractChoice {

  protected inputType: InputType = null;

  private selectChoiceType() {
    if (this.options.length === 1) {
      return this.checkbox();
    }
    switch(this.choiceType) {
      case "single":
        if(this.options.length < 5) {
          return this.radio();
        }
        return this.dropdown();
      case "multiple": return this.checkbox();

      default: throw new Error(`Invalid choice type on Choice ${this.label}: ${this.choiceType}`);
    }
  }

  private radio(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${this.options.map((option, index) => html`
        <label for=${this.getOptionId(index)}>
          <md-radio
          class="material-field"
          ?required=${this.required}
          ?error=${this._error}
          id=${this.getOptionId(index)}
          .name=${this.id}
          .value=${option}
          @input=${this.handleInput}></md-radio>
          ${option}
        </label>
      `)}
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
      `
  };

  private checkbox(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${this.options.map((option, index) => html`
        <label for=${this.getOptionId(index)}>
          <md-checkbox
            class="material-field"
            ?required=${this.required}
            ?error=${this._error}
            id=${this.getOptionId(index)}
            .name=${this.id}
            value=${option}
            @change=${(event: Event) => this.handleCheckboxChange(event, option)}
          ></md-checkbox>
          ${option}
        </label>
      `)}
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
      `
  };

  private dropdown(): HTMLTemplateResult {
    return html`
      <md-outlined-select
        class="material-field"
        ?required=${this.required}
        ?error=${this._error}
        .name=${this.id}
        @input=${this.handleInput}>
          ${this.options.map((option) => html`
            <md-select-option value=${option}>
              <div slot="headline">${option}</div>
            </md-select-option>
              `)}
        </md-outlined-select>
    `
  };

  private handleCheckboxChange(event: Event, option: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.value = [...(this.value || []), option];
    } else {
      this.value = (this.value || []).filter((val: string) => val !== option);
    }
  }

  protected validateRequiredField(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.required && (!this.value || this.value.length === 0)) {
      // eslint-disable-next-line no-param-reassign
      errors.valueMissing = true;
      if(this.options.length === 1) {
        errorMessages.push('Please check this box if you want to proceed.');
      } else {
        errorMessages.push('Please select at least one option.');
      }
    }
  }

  protected override handleInput(event: InputEvent): void {
    const mdField = event.target as any;
    this.value = mdField.value;
  }

  protected labelHTML(): HTMLTemplateResult {
    return html`
    <label class="label ${this.required ? 'required' : ''}" for="${this.id}">${this.label}</label>
    `;
  }

  protected inputHTML(): HTMLTemplateResult {
    return html`
      ${this.selectChoiceType()}
    `
  }

  static styles = [
    Colors.styles,
    SmartInputs.styles,
    css`
    .smart-select {
      width: 100%;

    }
    md-checkbox, md-radio {
      margin-bottom: 14px;
    }
    md-outlined-select {
      width: 100%;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
    }

    :host {
      --md-outlined-select-text-field-outline-color: var(--md-sys-color-outline);
      --md-outlined-select-text-field-focus-outline-color: var(--md-sys-color-outline);
      --md-outlined-select-text-field-outline-width: 2px;
      --md-outlined-select-text-field-hover-outline-width: 2px;
      --md-outlined-select-text-field-container-shape: 8px;
    }

    md-outlined-select::part(menu) {
      --md-menu-container-color: white;
      --md-menu-container-shape: 0;
    }
    `
  ]

  render(): HTMLTemplateResult {
    return html`
    <div class="wrapper ${this.required ? 'required' : ''}">
      <div class="top">
        <div class="left"></div>
          ${this.labelHTML()}
        <div class="right"></div>
      </div>
      <div class="content">
        ${this.inputHTML()}
      </div>
    </div>
    <small>${this.info}</small>
    `
  }
}
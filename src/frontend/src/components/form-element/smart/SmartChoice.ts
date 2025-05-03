/* eslint-disable wc/guard-super-call */
import { css, html, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { InputType } from "../InputType.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import AbstractSmartChoice from "./AbstractSmartChoice.js";

@customElement('smart-choice')
export default class SmartChoice extends AbstractSmartChoice {

  protected inputType: InputType = null;
  private _grouped = !(typeof this.options[0] === 'string');

  private selectChoiceType() {
    if (this.numOptions === 1) {
      return this.checkbox(false);
    }
    switch(this.choiceType) {
      case "single":
        if(this.numOptions < 5) {
          return this.radio();
        }
        return this.dropdown(this._grouped);
      case "multiple": return this.checkbox(this._grouped);

      default: throw new Error(`Invalid choice type on Choice ${this.label}: ${this.choiceType}`);
    }
  }

  private radio(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${(this.options as string[]).map((option, index) => html`
        <label for=${this.getOptionId(index)}>
          <md-radio
          class="material-field"
          ?required=${this.required}
          ?checked=${this.value.includes(option)}
          ?error=${this._error}
          id=${this.getOptionId(index)}
          .name=${this.id}
          .value=${option}
          @input=${this.handleInput}></md-radio>
          ${option}
        </label>
      `)}
      `
  };

  private checkbox(grouped: boolean): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${when(grouped,
        () => html`
        <div class="checkbox-group">
          ${(this.options as { groupName: string; entries: string[] }[])
            .slice()
            .sort((a, b) => a.groupName.localeCompare(b.groupName))
            .map(group => {
              const sortedEntries = group.entries.slice().sort((a, b) => a.localeCompare(b));
              return html`
                <div class="choice-group">
                  <h3 class="group-header">${group.groupName}</h3>
                  ${sortedEntries.map((option, index) => html`
                    <label for=${this.getOptionId(index)}>
                      <md-checkbox tabindex="0" class="material-field" ?required=${this.required} ?checked=${this.value.includes(option)} ?error=${this._error}
                        id=${this.getOptionId(index)} .name=${this.id} value=${option} @change=${(event: Event) => this.handleCheckboxChange(event, option)}
                      ></md-checkbox>
                      ${option}
                    </label>
                  `)}
                </div>
              `;
            })
          }
        </div>`,
        () => html`
          ${(this.options as string[]).map((option, index) => html`
            <label for=${this.getOptionId(index)}>
              <md-checkbox
                tabindex="0"
                class="material-field"
                ?required=${this.required}
                ?checked=${this.value.includes(option)}
                ?error=${this._error}
                id=${this.getOptionId(index)}
                .name=${this.id}
                value=${option}
                @change=${(event: Event) => this.handleCheckboxChange(event, option)}
              ></md-checkbox>
              ${option}
            </label>
          `)}
        `
      )}
    `
  };

  private dropdown(grouped: boolean): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      <md-outlined-select
        tabindex="0"
        class="material-field"
        ?required=${this.required}
        ?error=${this._error}
        .name=${this.id}
        value=${this.value}
        @input=${this.handleInput}>
        ${when(grouped,
          () => html`
            ${(this.options as { groupName: string; entries: string[] }[])
              .slice()
              .sort((a, b) => a.groupName.localeCompare(b.groupName))
              .map(group => {
                const sortedEntries = group.entries.slice().sort((a, b) => a.localeCompare(b));
                return html`
                  <md-select-option disabled class="group-header">
                    <div slot="headline"><strong>===== ${group.groupName} =====</strong></div>
                  </md-select-option>

                  ${sortedEntries.map(entry => html`
                    <md-select-option value=${entry}>
                      <div slot="headline">${entry}</div>
                    </md-select-option>
                  `)}
                `;
              })
            }
          `,
          () => html`
            ${(this.options as string[]).map((option) => html`
              <md-select-option value=${option}>
                <div slot="headline">${option}</div>
              </md-select-option>
            `)}
          `
        )}
      </md-outlined-select>
    `
  }

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
      } else if (this.choiceType === 'multiple') {
          errorMessages.push('Please select at least one option.');
      } else {
        errorMessages.push('Please select an option.');
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
      --md-menu-container-shape: 0;
    }

    md-select-option.group-header {
      text-align: center;
      background-color: white;
    }

    .checkbox-group {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 40px;
    }

    .choice-group {
      display: flex;
      flex-direction: column;
      & label {
        display: block;
      }
    }

    h3.group-header {
      display: inline-block;
      padding: 0 50px 0 0;
      box-sizing: content-box;
      border-bottom: 1px solid var(--md-sys-color-outline);
      border-image: linear-gradient(to right, var(--md-sys-color-outline), transparent);
      border-image-slice: 1;
    }
    `
  ]

  render(): HTMLTemplateResult {
    return html`
    <div tabindex="0" class="wrapper ${this.required ? 'required' : ''}  ${this._error ? 'invalid' : ''}">
      <div class="top">
        <div class="left"></div>
          ${this.labelHTML()}
        <div class="right"></div>
      </div>
      <div class="content">
        ${this.inputHTML()}
      </div>
    </div>
    <small class="error-text">${this._errorText}</small>
    `
  }
}
import { HTMLTemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractChoice from "../base-class/AbstractChoice.js";

@customElement('material-choice')
export default class MaterialChoice extends AbstractChoice {

// TODO: add rules for cb/radio depending on 1 el/more els, etc.

  private selectChoiceType() {
    if (typeof this.options[0] !== 'string') {
      return this.dropdownGrouped();
    }
    if (this.options.length === 1) {
      return this.checkbox();
    }
    switch(this.choiceType) {
      case "single":
        if((this.options as string[]).length < 5) {
          return this.radio();
        }
        if (typeof this.options[0] !== 'string') {
          throw new Error("Invalid options format. Must be flat array or object { groupName: 'value', entries: [...].}");
          ;
        }
        return this.dropdownFlat();
      case "multiple": return this.checkbox();

      default: throw new Error(`Invalid choice type on Choice ${this.label}: ${this.choiceType}`);
    }
  }

  private radio(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${(this.options as string[]).map((option, index) => html`
        <div class="choice">
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
        </div>
      `)}
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
      `
  };

  private checkbox(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      ${(this.options as string[]).map((option, index) => html`
        <div class="choice">
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
        </div>
      `)}
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
      `
  };

  private dropdownFlat(): HTMLTemplateResult {
    return html`
      <div class="choice">
          <md-filled-select
          class="material-field"
          ?required=${this.required}
          ?error=${this._error}
          label=${this.label}
          .name=${this.id}
          @input=${this.handleInput}>
            ${(this.options as string[]).map((option) => html`
              <md-select-option value=${option}>
                <div slot="headline">${option}</div>
              </md-select-option>
                `)}
          </md-filled-select>
      </div>
    `
  };

  private dropdownGrouped(): HTMLTemplateResult {
    return html`
      <div class="choice">
        <md-filled-select
          class="material-field"
          ?required=${this.required}
          ?error=${this._error}
          label=${this.label}
          .name=${this.id}
          @input=${this.handleInput}>
          ${(
        this.options as { groupName: string; entries: string[] }[]
      )
        .slice()
        .sort((a, b) => a.groupName.localeCompare(b.groupName))
        .map(group => {
          const sortedEntries = group.entries.slice().sort((a, b) => a.localeCompare(b));
          return html`
            <md-select-option disabled>
              <div slot="headline"><strong>===== ${group.groupName} =====</strong></div>
            </md-select-option>

            ${sortedEntries.map(entry => html`
              <md-select-option value=${entry}>
                <div slot="headline">${entry}</div>
              </md-select-option>
            `)}
          `;
        })}
        </md-filled-select>
      </div>
    `;
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
      errorMessages.push('Select at least one option.');
    }
  }

  protected override handleInput(event: InputEvent): void {
    const mdField = event.target as any;
    this.value = mdField.value;
  }

  static styles = css`
  md-filled-select { display: block}
  md-checkbox, md-radio {
      margin-bottom: 14px;
    }
  .label.error {
    color: var(--md-sys-color-error);
  }
  p.error-text {
    margin-top: 4px;
    font-size: 12px;
    color: var(--md-sys-color-error);
  }
  md-select-option[disabled] {
      text-align: center;
      background-color: white;
    }
  `

  render(): HTMLTemplateResult {
    return html`
    <h4 class="label ${this._error ? 'error' : ''}">${this.label}${this.required?'*':''}</h4>
      ${this.selectChoiceType()}
    `
  }
}
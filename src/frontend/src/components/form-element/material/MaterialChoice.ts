import { HTMLTemplateResult, css, html } from "lit";
import { when } from "lit/directives/when.js";
import { customElement } from "lit/decorators.js";
import AbstractChoice from "../base-class/AbstractChoice.js";
import AbstractFormElement from "../AbstractFormElement.js";

@customElement('material-choice')
export default class MaterialChoice extends AbstractChoice {


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
    <h4 class="label ${this._error ? 'error' : ''}">${this.label}${this.required?'*':''}</h4>
      ${this.info && html`<p class="info-text">${this.info}</p>`}
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

  private checkbox(grouped: boolean): HTMLTemplateResult {
    let globalIndex = 0; // Initialize a global index

    return html`
      <h4 class="label ${this._error ? 'error' : ''}">${this.label}${this.required ? '*' : ''}</h4>
      ${this.info && html`<p class="info-text">${this.info}</p>`}
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
                    ${sortedEntries.map(option => {
                      const index = globalIndex ++; // Use and increment the global index
                      return html`
                        <label for=${this.getOptionId(index)}>
                          <md-checkbox
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
                      `;
                    })}
                  </div>
                `;
              })}
          </div>
        `,
        () => html`
          ${(this.options as string[]).map((option, index) => html`
            <label for=${this.getOptionId(index)}>
              <md-checkbox
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
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
    `;
  }

  private dropdown(grouped: boolean): HTMLTemplateResult {
    return html`
    ${this.info && html`<p class="info-text">${this.info}</p>`}
      <md-filled-select
        class="material-field"
        ?required=${this.required}
        ?error=${this._error}
        label=${this.label}
        .name=${this.id}
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
      </md-filled-select>
      ${this._errorText && html`<p class="error-text">${this._errorText}</p>`}
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
      if(this.choiceType === "single") {
        errorMessages.push('Please select an option.');
      } else {
        errorMessages.push('Please select at least one option.');
      }
    }
  }

  protected override handleInput(event: InputEvent): void {
    const mdField = event.target as any;
    this.value = mdField.value;
  }

  static styles = [
    AbstractFormElement.styles,
    css`
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
    padding-inline-start: 16px;
  }
  md-select-option[disabled] {
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
  `]

  render(): HTMLTemplateResult {
    return html`
      ${this.selectChoiceType()}
    `
  }
}
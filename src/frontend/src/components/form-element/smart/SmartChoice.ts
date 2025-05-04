/* eslint-disable wc/guard-super-call */
import { css, html, HTMLTemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { InputType } from "../InputType.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import AbstractSmartChoice from "./AbstractSmartChoice.js";

@customElement('smart-choice')
export default class SmartChoice extends AbstractSmartChoice {

  @query('.search-dropdown') private _searchDropdown!: HTMLElement;

  protected inputType: InputType = null;
  @state() private _query: string = '';
  private _searchFilter: (element: string) => boolean = (element: string) => element.toLowerCase().includes(this._query.toLowerCase());

  protected radio(): HTMLTemplateResult {
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

  protected checkbox(grouped: boolean): HTMLTemplateResult {
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

  protected dropdown(grouped: boolean): HTMLTemplateResult {
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

  protected searchableDropdown(grouped: boolean): HTMLTemplateResult {
    return html`
    <div class="searchable-dropdown">
      <input
        type="text"
        class="search-field"
        @input=${this.handleQueryChange}
        ?required=${this.required}
        .value=${this.value}
        >
        ${when(grouped,
          () => {

          },
          () => html`
            <ul class="search-dropdown">
              ${(this.options as string[]).filter(this._searchFilter).map((option) => html`
                <li tabindex="-1" @click=${this.handleSelection} @keydown=${this.handleSelection} class="selectable">${option}</li>
              `)}
            </ul>
          `
        )}
      </div>
    `
  }

  private handleQueryChange(e: InputEvent): void {
    this._query = (e.target as HTMLInputElement).value;
  }

  private handleSelection(e: MouseEvent | KeyboardEvent): void {
    e.stopPropagation()
    this.value = (e.target as HTMLElement).innerText;
    this.hideDropdown();
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
    const input = event.target as any;
    this.value = input.value;
  }

  protected showDropdown(e: FocusEvent | MouseEvent): void {
    this._searchDropdown.classList.add('open');
  }

  protected hideDropdown(e?: FocusEvent): void {
    this._searchDropdown.classList.remove('open');
  }

  protected labelHTML(): HTMLTemplateResult {
    return html`
    <label class="label ${this.required ? 'required' : ''}" for="${this.id}">${this.label}</label>
    `;
  }

  protected inputHTML(): HTMLTemplateResult {
    const renderFunction = this.renderMap[this.renderType];
    return html`
      ${renderFunction(this.grouped)}
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

    .searchable-dropdown {
      position: relative;
      width: 100%;
    }

    .search-dropdown {
      position: absolute;
      width: calc(100% - 6px);
      top: 100%;
      left: -12px;
      display: none;
      background: var(--dropdown-menu);
      z-index: 2;
      padding: 16px 0;
      list-style-type: none;
      border-radius: var(--smart-border-radius);
      max-height: 300px;
      overflow-y: scroll;
      box-shadow: 0 0 6px rgba(0, 0, 0, .5);

      &.open {
        display: block;
      }
    }

    .selectable {
      padding: 16px;
      cursor: pointer;

      &:hover, &.focused {
        background-color: rgba(var(--primary-rgb), .5);
      }
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


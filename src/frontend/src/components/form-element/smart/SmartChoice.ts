/* eslint-disable wc/guard-super-call */
import { css, html, HTMLTemplateResult } from "lit";
import { customElement, query, queryAll } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { InputType } from "../InputType.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import AbstractSmartChoice from "./AbstractSmartChoice.js";

@customElement('smart-choice')
export default class SmartChoice extends AbstractSmartChoice {

  @query('.search-dropdown') private _searchDropdown!: HTMLElement;
  @query('.search-field') private _searchField!: HTMLInputElement;
  // eslint-disable-next-line no-undef
  @queryAll('li.selectable') private _listItems!: NodeListOf<HTMLLIElement>

  public willBlockArrowNavigation = () => {
    switch(this.renderType) {
      case "dropdown": return true;
      case "searchableDropdown": return true;
      case "radio": return true;
      default: return false;
    }
  };
  protected inputType: InputType = null;
  private _searchFilter: (element: string) => boolean = (element: string) => element.toLowerCase().includes(this.query.toLowerCase());
  private _focusedIndex: number = -1;
  private _checkBoxesTabbable = true;
  private _isFocusingInternally = false;

  protected radio(): HTMLTemplateResult {
    return html`
      ${this.info && html`<p>${this.info}</p>`}
      <div class="radio-group">
        ${(this.options as string[]).map((option, index) => html`
          <label for=${this.getOptionId(index)}>
            <div class="radio">
              <input type="radio"
                ?required=${this.required}
                ?checked=${this.value.includes(option)}
                id=${this.getOptionId(index)}
                .name=${this.id}
                .value=${option}
                @input=${this.handleInput}
              >
              ${option}
              <span class="radio-checkmark"></span>
              <div class="target-area"></div>
            </div>
          </label>
        `)}
      </div>
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
                      <md-checkbox tabindex=${this._checkBoxesTabbable ? '0' : '-1'} class="material-field" ?required=${this.required} ?checked=${this.value.includes(option)} ?error=${this._error}
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
                tabindex=${this._checkBoxesTabbable ? '0' : '-1'}
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
        autocomplete="off"
        @input=${this.handleQueryChange}
        @keydown=${this.dropdownNavHandler}
        @focus=${this.showDropdown}
        @blur=${this.hideDropdown}
        ?required=${this.required}
        .value=${this.value}
        >
        ${when(grouped,
          () => html`
            <ul tabindex="-1" class="search-dropdown">
              ${(this.options as { groupName: string; entries: string[] }[])
                .slice()
                .sort((a, b) => a.groupName.localeCompare(b.groupName))
                .map(group => {
                  const sortedEntries = group.entries
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .filter(this._searchFilter);
                  if (sortedEntries.length === 0) return null;

                  return html`
                    <div class="choice-group">
                      <li class="group-header"><strong>===== ${group.groupName} =====</strong></li>
                      ${sortedEntries.map((option) => html`
                        <li tabindex="-1" @click=${this.handleSelection} @keydown=${this.handleSelection} class="selectable">${option}</li>
                      `)}
                    </div>
                  `;
                })
              }
            </ul>
          `,
          () => html`
            <ul tabindex="-1" class="search-dropdown">
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
    this.showDropdown();
    this.query = (e.target as HTMLInputElement).value;
    this._focusedIndex = -1;
    this.updateFocus();
  }

  private handleSelection(e: MouseEvent | KeyboardEvent): void {
    e.stopPropagation()
    this.value = (e.target as HTMLElement).innerText;
    this.hideDropdown();
  }

  private dropdownNavHandler(e: KeyboardEvent): void {
    // e.stopPropagation();
    const items = Array.from(this._listItems);
    if (e.key === 'ArrowDown') {
      this.showDropdown();
      e.preventDefault();
      this._focusedIndex = (this._focusedIndex + 1) % items.length;
      this.updateFocus();
    } else if (e.key === 'ArrowUp') {
      this.showDropdown();
      e.preventDefault();
      this._focusedIndex = (this._focusedIndex - 1 + items.length) % items.length;
      this.updateFocus();
    } else if (e.key === 'Enter' && this._focusedIndex >= 0) {
      e.preventDefault();
      items[this._focusedIndex].click();
      this._searchField.value = items[this._focusedIndex].innerText;
    } else if (e.key ==='Escape') {
      this.hideDropdown();
    }
  }

  private updateFocus(): void {
    Array.from(this._listItems).forEach((el, i) => {
      if (i === this._focusedIndex) {
        el.classList.add('focused');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('focused');
      }
    });
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

  override focus(options?: {preventScroll: boolean, focusVisible: boolean}): void {
    let firstInput;
    // eslint-disable-next-line default-case
    switch(this.renderType) {
      case "checkbox": firstInput = this.shadowRoot?.querySelector('md-checkbox'); break;
      case "radio": firstInput = this.shadowRoot?.querySelector('input'); break;
      case "dropdown": firstInput = this.shadowRoot?.querySelector('md-outlined-select'); break;
      case "searchableDropdown": firstInput = this.shadowRoot?.querySelector('input'); break;
    }

    if (firstInput) {
      firstInput.focus({ preventScroll: true, ...options });
      firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (this.renderType === "searchableDropdown") {
        this.showDropdown();
      }
    } else {
      this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  protected override setCustomEventListeners(): void {
    this.addEventListener('blur', this.resumeNavigation, true)
    this.addEventListener('focusin', this.onFocusIn, true);
    this.addEventListener('keydown', this.resumeNavigation)
  }

  private onFocusIn(e: FocusEvent): void {
    this._isFocusingInternally = true;
  }

  private resumeNavigation(e: UIEvent): void {
    if (e instanceof KeyboardEvent && e.key === 'Escape') {
      this.blur();
      setTimeout(() => document.body.focus(), 0);
      this._navigator?.resumeNavigation(this);
    } else if (e instanceof FocusEvent) {
      this._isFocusingInternally = false;

      setTimeout(() => {
        const root = this.shadowRoot;
        const active = root!.activeElement;
        if (!this.shadowRoot!.contains(active)) {
          this._navigator?.resumeNavigation(this);
        }
      }, 0);
    }
  }

  protected override handleInput(event: InputEvent): void {
    const input = event.target as any;
    this.value = input.value;
  }

  protected showDropdown(e?: FocusEvent | MouseEvent): void {
    e?.preventDefault();
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

    .radio-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 16px;
    }

    .radio {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      margin: 0;
      padding: 0;
      gap: 6px;
      cursor: pointer;
      & input {
        width: 20px;
        height: 20px;
        margin: 0;
      }
      & .radio-checkmark {
        position: absolute;
        opacity: 0;
        top: 50%;
        left: 3px;
        transform: translate(0, -50%);
        background-color: var(--primary, darkblue);
        width: 14px;
        height: 14px;
        border-radius: 100%;
      }
      & input:checked ~ .radio-checkmark {
        opacity: 1;
      }
      & .target-area {
        position: absolute;
        opacity: 0;
        top: 50%;
        left: -10px;
        transform: translate(0, -50%);
        background-color: rgba(128, 128, 128, .2);
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      &:hover .target-area {
        opacity: 1;
      }
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
      width: calc(100% + 26px);
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

      & .group-header {
        background-color: white;
        text-align: center;
        padding: 12px 0;
        color: grey;
      }
    }

    .search-dropdown::-webkit-scrollbar {
      width: 6px;
    }

    .search-dropdown::-webkit-scrollbar-track {
      background: transparent;
    }

    .search-dropdown::-webkit-scrollbar-thumb {
      background: rgba(var(--primary-rgb), .5);
      border-radius: var(--smart-border-radius);
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
    <div class="wrapper ${this.required ? 'required' : ''}  ${this._error ? 'invalid' : ''}">
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


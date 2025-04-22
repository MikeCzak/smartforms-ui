import { css, CSSResultGroup, html, HTMLTemplateResult } from "lit";
import AbstractFormElement from "../AbstractFormElement.js";
import IChoiceElementParams from "../IChoiceElementParams.js";

export default abstract class AbstractChoice extends AbstractFormElement {

  private _options: Array<string>;

  private _choiceType: "single"|"multiple";


  constructor(params: IChoiceElementParams) {
    super(params);
    this._options = params.options;
    this._choiceType = params.choiceType;
  }

  get options() {
    if(this._options.length > 5)
      {
        this._options.sort()
      }
    return this._options;
  }

  get choiceType() {
    return this._choiceType;
  }


  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }

  protected radio(): HTMLTemplateResult {
    return html`${this.options.map((option, index) => html`
      <div class="choice">
        <label for=${this.getOptionId(index)}>
          <md-radio
          class="material-field"
          ?required=${this.isRequired()}
          id=${this.getOptionId(index)}
          .name=${this.id}
          .value=${option}
          @input=${this.handleInput}></md-radio>
          ${option}
        </label>
      </div>
    `)}`
  };

  protected checkbox(): HTMLTemplateResult {
    return html`
    ${this.info && html`<p>${this.info}</p>`}
    ${this.options.map((option, index) => html`
      <div class="choice">
        <label for=${this.getOptionId(index)}>
          <md-checkbox
            class="material-field"
            ?required=${this.isRequired()}
            id=${this.getOptionId(index)}
            .name=${this.id}
            value=${option}
            @change=${(event: Event) => this.handleCheckboxChange(event, option)}
          ></md-checkbox>
          ${option}
        </label>
      </div>
    `)}`
  };

  protected dropdown(): HTMLTemplateResult {
    return html`
      <div class="choice">
          <md-filled-select class="material-field" ?required=${this.isRequired()} label=${this.label} .name=${this.id} @input=${this.handleInput}>
            ${this.options.map((option) => html`
              <md-select-option value=${option}>
                <div slot="headline">${option}</div>
              </md-select-option>
                `)}
          </md-filled-select>
      </div>
    `
  };

  private handleCheckboxChange(event: Event, option: string): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.value = [...(this.value || []), option];
    } else {
      this.value = (this.value || []).filter((val: string) => val !== option);
    }

    this.internals_.setFormValue(this.value);
  }

  static styles = css`
  md-filled-select { display: block}
  md-checkbox, md-radio {
      margin-bottom: 14px;
    }
  .label.error {
    color: rgb(255 180 171);
  }
  `
}
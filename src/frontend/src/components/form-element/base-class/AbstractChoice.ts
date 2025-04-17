import { html, HTMLTemplateResult } from "lit";
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
    return this._options;
  }

  get choiceType() {
    return this._choiceType;
  }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }

  protected getOptionId(index: number): string {
    return `${this.id}-${index}`;
  }

  protected radio(): HTMLTemplateResult {
    return html`${this.options.map((option, index) => html`
      <div class="choice">
        <label for=${this.getOptionId(index)}>
          <md-radio ?required=${this.isRequired()} id=${this.getOptionId(index)} name=${this.id} value=${option}></md-radio>
          ${option}
        </label>
      </div>
    `)}`
  };

  protected checkbox(): HTMLTemplateResult {
    return html`${this.options.map((option, index) => html`
      <div class="choice">
        <label for=${this.getOptionId(index)}>
          <md-checkbox ?required=${this.isRequired()} id=${this.getOptionId(index)} name=${this.id} value=${option}></md-checkbox>
          ${option}
        </label>
      </div>
    `)}`
  };

  protected dropdown(): HTMLTemplateResult {
    return html`
      <div class="choice">
          <md-filled-select ?required=${this.isRequired()} label=${this.label}>
            ${this.options.map((option) => html`
              <md-select-option value=${option}>
                <div slot="headline">${option}</div>
              </md-select-option>
                `)}
          </md-filled-select>
      </div>
    `
  };
}
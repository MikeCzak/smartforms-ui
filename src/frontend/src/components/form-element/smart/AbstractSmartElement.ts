import { HTMLTemplateResult, html, CSSResultGroup } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { query, state } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import { InputType } from "../InputType.js";
import { PatternValidator } from "../../../util/PatternValidator.js";
import IBaseFormElementParams from "../IBaseFormElementParams.js";
import { when } from "lit/directives/when.js";


export default abstract class AbstractSmartElement extends AbstractFormElement {
  static styles: CSSResultGroup = [
    Colors.styles,
    SmartInputs.styles
  ]

  @state() private validationResults: Array<{ rule: string; valid: boolean }> = [];
  @state() private overallValid: boolean | null = null;

  @query('input') protected inputElement!: HTMLInputElement;
  @query('.real-time-validation') protected realTimeValidation!: HTMLElement;

  protected patternValidator?: PatternValidator;

  constructor(params: IBaseFormElementParams) {
    super(params);
    if (params.constraints?.pattern) {
      this.patternValidator = new PatternValidator(params.constraints?.pattern);
    }
  }

  protected handleInput(event: InputEvent): void {
    const input = event.target as any;
    this.value = input.value;

    if(this.patternValidator !== undefined && this.patternValidator.fullyParsed) {
      this.validationResults = this.patternValidator!.validate(this.inputElement.value);
      this.overallValid = this.patternValidator!.isValid(this.inputElement.value);
      this.realTimeValidation.classList.add('show');
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.delegateFocusToInput)
    this.addEventListener('focus', this.focusHandler);
    this.addEventListener('blur', this.blurHandler);
    this.addEventListener('blur', this.hideValidationHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.delegateFocusToInput)
    this.removeEventListener('focus', this.focusHandler);
    this.removeEventListener('blur', this.blurHandler);
    this.removeEventListener('blur', this.hideValidationHandler);
  }

  private hideValidationHandler(): void {
    this.realTimeValidation.classList.remove('show');
  }

  protected delegateFocusToInput() {
    this.blur();
    this.focus();
  }

  render(): HTMLTemplateResult {
    return html`
    <div class="real-time-validation">
      <md-elevated-card>
        <ul>
          ${this.validationResults.map(({ rule, valid }) => html`<li>${rule}: ${valid ? "✅" : "❌"}</li>`)}
        </ul>
      </md-elevated-card>
    </div>
    <div class="wrapper ${this.required ? 'required' : ''} ${this.overallValid ? 'valid' : ''}">
      <div class="top">
        <div class="left"></div>
          ${this.labelHTML()}
        <div class="right"></div>
      </div>
      <div class="content">
        ${this.inputHTML()}
      </div>
    </div>
    <div class="info">
      <small>${this.info}</small>
      ${when(this.constraints?.maxLength, () => html`<small class="counter">${this.value.length}/${this.constraints?.maxLength}</small>`)}
    </div>
    `
  }

  protected inputHTML(): HTMLTemplateResult {
    return html`
      <input
        type=${this.inputType}
        .supportingText=${this._errorText ?? this.info}
        ?error=${this._error}
        @input=${this.handleInput}
        ?required=${this.required}
        pattern=${ifDefined(this.constraints?.pattern)}
        maxLength=${ifDefined(this.constraints?.maxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        min=${(ifDefined(this.constraints?.min))}
        max=${(ifDefined(this.constraints?.max))}
        >
    `;
  }

  protected labelHTML(): HTMLTemplateResult {
    return html`
    <label class="label ${this.required ? 'required' : ''}" for="${this.id}">${this.label}</label>
    `;
  }

  protected abstract inputType: InputType;
}
import { HTMLTemplateResult, html, CSSResultGroup } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { query } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import { InputType } from "../InputType.js";
import { PatternValidator } from "../../../util/PatternValidator.js";
import IBaseFormElementParams from "../IBaseFormElementParams.js";


export default abstract class AbstractSmartElement extends AbstractFormElement {
  static styles: CSSResultGroup = [
    Colors.styles,
    SmartInputs.styles
  ]

  @query('input') protected inputElement!: HTMLInputElement;

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

    if(this.patternValidator !== undefined) {
      const results = this.patternValidator!.validate(this.inputElement.value);

      results.forEach(({ rule, valid }) => {
        console.log(rule.description, valid ? "✅" : "❌");
      });

      const overallValid = this.patternValidator!.isValid(this.inputElement.value);
      console.log("Overall valid:", overallValid);
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.delegateFocusToInput)
    this.addEventListener('focus', this.focusHandler);
    this.addEventListener('blur', this.blurHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.delegateFocusToInput)
    this.removeEventListener('focus', this.focusHandler);
    this.removeEventListener('blur', this.blurHandler);
  }

  protected delegateFocusToInput() {
    this.blur();
    this.focus();
  }

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
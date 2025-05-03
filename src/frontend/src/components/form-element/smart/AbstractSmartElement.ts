import { HTMLTemplateResult, html, CSSResultGroup } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { query, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import AbstractFormElement from "../AbstractFormElement.js";
import Colors from "../../../styles/Colors.js";
import SmartInputs from "../../../styles/SmartInputs.js";
import { InputType } from "../InputType.js";
import { PatternValidator } from "../../../util/PatternValidator.js";
import IBaseFormElementParams from "../IBaseFormElementParams.js";
import IValueFormatter from "../../../util/ValueFormatter/IValueFormatter.js";
import ChunkFormatter from "../../../util/ValueFormatter/ChunkFormatter.js";
import IbanFormatter from "../../../util/ValueFormatter/IbanFormatter.js";
import { getLastInteractionWasKeyboard } from "../../../util/LastInterActionTracker.js";


export default abstract class AbstractSmartElement extends AbstractFormElement {

  @state() protected validationResults: Array<{ rule: string; valid: boolean }> = [];
  @state() protected overallValid: boolean | null = null;

  @query('input') protected inputElement!: HTMLInputElement;
  @query('.real-time-validation') protected realTimeValidation!: HTMLElement;

  protected patternValidator?: PatternValidator;
  protected valueFormatter?: IValueFormatter;
  protected maySaveToStorage: boolean = true;
  protected formattedValue: any = this.value;
  protected maxLength?: number;
  protected formattedMaxLength?: number;

  constructor(params: IBaseFormElementParams) {
    super(params);
    if (params.constraints) {
      this.checkElementConstraints();
    }
    if(params.constraints?.maxLength) {
      this.maxLength = params.constraints.maxLength;
    }
    if (params.constraints?.pattern !== undefined) {
      this.patternValidator = new PatternValidator(params.constraints);
    }
    if (params.grouping !== undefined) {
      this.valueFormatter = new ChunkFormatter(params.grouping.chunkSize, params.grouping.delimiter);
      if (params.grouping.chunkSize && params.grouping.delimiter) {
        this.info += ` Enter alphanumeric characters only. "${params.grouping.delimiter}" will be added automatically.`
      }
    } else if (this.label.toLowerCase().includes("iban")) {
      this.valueFormatter = new IbanFormatter();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected checkElementConstraints(): void {};

  protected override _attachShadow(): void {
    this.attachShadow({ mode: 'open', delegatesFocus: false });
  }

  protected handleInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const oldFormatted = input.value;
    const oldCursor = input.selectionStart ?? oldFormatted.length;

    let formatted = oldFormatted;
    let raw = formatted;

    if (this.valueFormatter) {
      raw = this.valueFormatter.getRawValue(formatted);
      formatted = this.valueFormatter.getFormattedValue(raw);
    }

    this.value = raw;
    this.formattedValue = formatted;

    const newCursor = this.valueFormatter?.getAdjustedCursorPosition(
      oldFormatted,
      formatted,
      oldCursor
    ) ?? formatted.length;

    requestAnimationFrame(() => {
      input.setSelectionRange(newCursor, newCursor);
    });

    if (this.patternValidator?.fullyParsed) {
      this.validationResults = this.patternValidator.validate(raw);
      this.overallValid = this.patternValidator.isValid(raw);
      this.realTimeValidation.classList.add('show');
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      if(this.maySaveToStorage) {
        sessionStorage.setItem(this.id, JSON.stringify(this.value));
      }
      this.internals_.setFormValue(this.value);
      this._error = false;
      this._errorText = null;
      this.setValidity();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.loadStoredData();
    if (this.maxLength) {
      const rawMaxLength = this.maxLength;
      const extra = this.valueFormatter?.getMaxLengthIncrementFactor(rawMaxLength) ?? 0;
      this.formattedMaxLength = rawMaxLength + extra;
      this.style.setProperty('--maxLength', `${this.formattedMaxLength}ch`);
      this.style.setProperty('--max-length-bottom-border','1px dashed rgba(0, 0, 0, .3)')
    }
    this.addEventListener('click', this.delegateFocusToInput);
    this.addEventListener('focus', this.focusHandler);
    this.addEventListener('blur', this.blurHandler);
    this.addEventListener('blur', this.hideValidationHandler);
    this.setTabIndexForSafari();
  }

  // eslint-disable-next-line class-methods-use-this
  protected setTabIndexForSafari() {};

  protected loadStoredData(): void {
    const stored = sessionStorage.getItem(this.id);
    if (stored) {
      let parsed;
      try { parsed = JSON.parse(stored); }
      catch (e) { parsed = null; }
      if (parsed !== null && parsed !== '') {
        this.value = parsed;
        this.formattedValue = parsed;
        if (this.valueFormatter) {
          this.formattedValue = this.valueFormatter.getFormattedValue(parsed);
        }
        this.transformValueToSubfields(parsed);
        this.internals_.setFormValue(parsed);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected transformValueToSubfields(value: any) {}

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.delegateFocusToInput)
    this.removeEventListener('focus', this.focusHandler);
    this.removeEventListener('blur', this.blurHandler);
    this.removeEventListener('blur', this.hideValidationHandler);
  }

  protected override focusHandler(e: FocusEvent): void {
    this.startTime = Date.now();
    const target = e.target as HTMLElement;
    if (getLastInteractionWasKeyboard()) {
      requestAnimationFrame(() => {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  protected hideValidationHandler(): void {
    if(this.realTimeValidation !== null) {
      this.realTimeValidation.classList.remove('show');
    }
  }

  protected delegateFocusToInput(e: Event) {
    const path = e.composedPath() as HTMLElement[];

    const clickedInput = path.find(el => el.tagName === 'INPUT');

    if (!clickedInput) {
      const firstInput = this.shadowRoot?.querySelector('input');
      firstInput?.focus();
    }
  }

  override focus(options?: {preventScroll: boolean, focusVisible: boolean}): void {
    const firstInput = this.shadowRoot?.querySelector('input');
    if (firstInput) {
      firstInput.focus({ preventScroll: true, ...options });
      firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  static styles: CSSResultGroup = [
    Colors.styles,
    SmartInputs.styles
  ]

  render(): HTMLTemplateResult {
    return html`
    <div class="real-time-validation">
      <md-elevated-card>
        <ul style="list-style-type: none">
          ${this.validationResults.map(({ rule, valid }) => html`<li>${valid ? "✅" : "❌"} ${rule}</li>`)}
        </ul>
      </md-elevated-card>
    </div>
    <div class="wrapper ${this.required ? 'required' : ''} ${this.overallValid ? 'valid' : ''} ${this._error ? 'invalid' : ''}">
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
      ${when(this.info, () => html`<small>${this.info}</small>`)}
      ${when(this.maxLength, () => html`<small class="counter">${this.value.length}/${this.maxLength}</small>`)}
    </div>
    <small class="error-text">${this._errorText}</small>
    `
  }

  protected inputHTML(): HTMLTemplateResult {
    return html`
      <input
        type=${this.inputType}
        @input=${this.handleInput}
        ?required=${this.required}
        pattern=${ifDefined(this.constraints?.pattern)}
        maxLength=${ifDefined(this.formattedMaxLength)}
        minLength=${ifDefined(this.constraints?.minLength)}
        min=${(ifDefined(this.constraints?.min))}
        max=${(ifDefined(this.constraints?.max))}
        .value=${this.formattedValue}
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
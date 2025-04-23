/* eslint-disable no-param-reassign */
import { css, CSSResultGroup, HTMLTemplateResult, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import IFormElement from './IFormElement.js';
import AbstractSection from './base-class/AbstractSection.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  static formAssociated = true;

  @property({attribute: true, reflect: true}) public name: string;
  @property({attribute: true, reflect: true}) public value: any = '';
  @property({type: Boolean, attribute: true, reflect: true}) public required: boolean;
  @query('.material-field') protected _materialField: any;
  @state() protected _error: boolean = false;
  @state() protected _errorText?: string|null = null;

  private _id: string;
  private _label: string;
  private _info: string;
  private _constraints?:  {[key: string]: any};
  private _dependsOn?: IFormElement;
  private _dependingFields: Array<IFormElement|AbstractSection> = [];
  private _metaData: Map<string, any> = new Map<string, any>([['focusTime', 0], ['validationErrors', {}]]);
  private _startTime?: number|null = null;
  public internals_;


  constructor(params: IBaseFormElementParams) {
    super();
    this._id = params.id;
    this.name = params.name;
    this._label = params.label;
    this._info = params.info || '';
    this.required = params.required ?? true;
    this._dependsOn = params.dependsOn;
    this._constraints = params.constraints;
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.internals_ = this.attachInternals();
    this.internals_.setFormValue(this.value);
  }

  public get id(): string {
    return this._id;
  }

  public get label(): string {
    return this._label;
  }

  public get info(): string {
    return this._info;
  }

  public get dependsOn(): IFormElement | undefined {
    return this._dependsOn;
  }

  public get dependingFields(): Array<IFormElement | AbstractSection> {
    return this._dependingFields;
  }

  public get constraints(): { [key: string]: any } | undefined {
    return this._constraints;
  }

  public isRequired(): boolean {
    return this.required;
  }

  public hasDependencies(): boolean {
    return this._dependingFields.length > 0;
  }

  public addDependingField(element: IFormElement|AbstractSection): IFormElement {
    this._dependingFields.push(element)

    return this;
  }

  static styles: CSSResultGroup = css`
    md-filled-text-field, md-filled-select {
      display: block;
    }
    md-filled-text-field {
      white-space: pre-line
    }
  `

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value')) {
      this.internals_.setFormValue(this.value);

      this._error = false;
      this._errorText = null;
      this.setValidity();
    }
  }

  protected setValidity() {
    const errors: { [key: string]: boolean; } = {};
    const errorMessages: string[] = [];

    this.validateRequiredField(errors, errorMessages);
    this.validateMinValue(errors, errorMessages);
    this.validateMaxValue(errors, errorMessages);
    this.validateMinLength(errors, errorMessages);
    this.validateMaxLength(errors, errorMessages);
    this.validatePattern(errors, errorMessages);

    const combinedErrorMessage = errorMessages.join('\n');

    if (Object.keys(errors).length > 0) {
      this.internals_.setValidity(errors, combinedErrorMessage);
    } else {
      this.internals_.setValidity({}, '');
    }
  }

  protected validatePattern(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.pattern && !new RegExp(this.constraints.pattern).test(this.value)) {
      errors.patternMismatch = true;
      errorMessages.push('Invalid format.');
    }
  }

  protected validateMaxLength(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.maxLength !== undefined && this.value.length > this.constraints.maxLength) {
      errors.tooLong = true;
      errorMessages.push(`Value must be at most ${this.constraints.maxLength} characters long.`);
    }
  }

  protected validateMinLength(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.minLength !== undefined && this.value.length < this.constraints.minLength) {
      errors.tooShort = true;
      errorMessages.push(`Value must be at least ${this.constraints.minLength} characters long.`);
    }
  }

  protected validateMaxValue(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.max !== undefined && this.value > this.constraints.max) {
      errors.rangeOverflow = true;
      errorMessages.push(`Value must be at most ${this.constraints.max}.`);
    }
  }

  protected validateMinValue(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.constraints?.min !== undefined && this.value < this.constraints.min) {
      errors.rangeUnderflow = true;
      errorMessages.push(`Value must be at least ${this.constraints.min}.`);
    }
  }

  protected validateRequiredField(errors: { [key: string]: boolean; }, errorMessages: string[]) {
    if (this.required && !this.value) {
      errors.valueMissing = true;
      errorMessages.push('This field is required.');
    }
  }

  public validate(reportValidity: boolean = true): IFormElement | null {
    const isValid = this.internals_.checkValidity();
    const { validationMessage } = this.internals_;
    if (this._materialField && !isValid) {
      if (reportValidity) {
        this.reportValidity(validationMessage);
      }

      return this;
    }
    return null;
  }

  protected reportValidity(validationMessage: string) {
    this._error = true;
    this._errorText = validationMessage;
  }

  protected handleInput(event: InputEvent): void {
    const mdField = event.target as any;
    const input = mdField.shadowRoot?.querySelector('input') as HTMLInputElement;
    this.value = input.value;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.focusHandler);
    this.addEventListener('blur', this.blurHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.focusHandler);
    this.removeEventListener('blur', this.blurHandler);
  }

  protected focusHandler(e: FocusEvent): void {
    this._startTime = Date.now();
  }

  protected blurHandler(e: FocusEvent): void {
    if (this._startTime) {
      this._metaData.set('focusTime', Date.now() - this._startTime);
    }
    //TODO: finish time tracking
  }

  abstract render(): HTMLTemplateResult
}

import { css, HTMLTemplateResult, LitElement } from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import IFormElement from './IFormElement.js';
import AbstractSection from './base-class/AbstractSection.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  static formAssociated = true;

  @property({attribute: true, reflect: true}) public name: string;
  @property({attribute: true, reflect: true}) public value: any = '';
  @property({type: Boolean, attribute: true, reflect: true}) public required: boolean;
  @queryAll('.material-field') protected _materialFields?: HTMLElement[];
  @state() protected _error: Boolean = false;

  // private _validationElement!: HTMLInputElement;

  private _id: string;
  private _label: string;
  private _info: string;
  private _constraints?:  {[key: string]: any};
  private _dependsOn?: IFormElement;
  private _dependingFields: Array<IFormElement|AbstractSection> = [];
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

  public addDependingFields(...elements: IFormElement[]): IFormElement {
    this._dependingFields.push(...elements);

    return this;
  }

  public addDependingField(element: IFormElement|AbstractSection): IFormElement {
    this._dependingFields.push(element)

    return this;
  }

static styles = css`
    md-filled-text-field, md-filled-select {
      display: block;
    }
  `
// protected firstUpdated(_changedProperties: PropertyValues): void {
//   requestAnimationFrame(() => {
//     const input = this._materialFields?.shadowRoot?.querySelector('input') as HTMLInputElement;
//     if (input) {
//       this._validationElement = input;
//     } else if (this._materialFields !== undefined) {
//       this._validationElement = this._materialFields as any;
//     }
//     // console.log("Validation element for", this.id, ":", this._validationElement)
//   });
// }

updated(changedProperties: Map<string, any>) {
  if (changedProperties.has('value')) {
    this.internals_.setFormValue(this.value);
    for (const field of this._materialFields! as any) {
      field.removeAttribute('error');
    }
    this._error = false;
  }

  const errors: { [key: string]: boolean } = {};
  const errorMessages: string[] = [];

  if (this.required && !this.value) {
    errors.valueMissing = true;
    errorMessages.push('This field is required.');
  }
  if (this.constraints?.min !== undefined && this.value < this.constraints.min) {
    errors.rangeUnderflow = true;
    errorMessages.push(`Value must be at least ${this.constraints.min}.`);
  }
  if (this.constraints?.max !== undefined && this.value > this.constraints.max) {
    errors.rangeOverflow = true;
    errorMessages.push(`Value must be at most ${this.constraints.max}.`);
  }
  if (this.constraints?.minLength !== undefined && this.value.length < this.constraints.minLength) {
    errors.tooShort = true;
    errorMessages.push(`Value must be at least ${this.constraints.minLength} characters long.`);
  }
  if (this.constraints?.maxLength !== undefined && this.value.length > this.constraints.maxLength) {
    errors.tooLong = true;
    errorMessages.push(`Value must be at most ${this.constraints.maxLength} characters long.`);
  }
  if (this.constraints?.pattern && !new RegExp(this.constraints.pattern).test(this.value)) {
    errors.patternMismatch = true;
    errorMessages.push('Invalid format.');
  }

  const combinedErrorMessage = errorMessages.join('\n');

  if (Object.keys(errors).length > 0) {
    this.internals_.setValidity(errors, combinedErrorMessage);
  } else {
    this.internals_.setValidity({}, '');
  }

  // Do not update the supporting text here; defer it to validate()
}

public validate(): IFormElement | undefined {
  const isValid = this.internals_.checkValidity();
  const { validationMessage } = this.internals_;
  const materialFields = this._materialFields as any;
  if (materialFields && !isValid) {
    for (const field of this._materialFields! as any) {
      field.supportingText = validationMessage;
      field.setAttribute('error', true);
    }

    this._error = true;
    return this;
  }
  return undefined;
}

public setCustomValidity(message: string): void {
  this.internals_.setValidity(message ? { customError: true } : {}, message);
}

protected handleInput(event: InputEvent): void {
  const mdField = event.target as any;
  const input = mdField.shadowRoot?.querySelector('input') as HTMLInputElement;

  if (input) {
    this.value = input.value;
  } else {
    this.value = mdField.value;
  }
  this.internals_.setFormValue(this.value);
}

  abstract render(): HTMLTemplateResult
}

import { css, HTMLTemplateResult, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import IFormElement from './IFormElement.js';
import AbstractSection from './base-class/AbstractSection.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';
import { InputType } from './InputType.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  static formAssociated = true;

  @property({attribute: true, reflect: true}) public name: string;

  @property({attribute: true, reflect: true}) public value: any = '';

  @property({type: Boolean, attribute: true, reflect: true}) public required: boolean;

  @query('input') inputElement!: HTMLInputElement

  private _id: string;
  private _label: string;
  private _info?: string;
  private _constraints?:  {[key: string]: any};
  private _dependsOn?: IFormElement;
  private _dependingFields: Array<IFormElement|AbstractSection> = [];
  public internals_;

  protected abstract inputType: InputType;


  constructor(params: IBaseFormElementParams) {
    super();
    this._id = params.id;
    this.name = params.name;
    this._label = params.label;
    this._info = params.info;
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

  public get info(): string | undefined {
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

updated(changedProperties: Map<string, any>) {
  if (changedProperties.has('value')) {
    this.internals_.setFormValue(this.value);
  }
  if (this.required && !this.value) {
    this.internals_.setValidity({ valueMissing: true }, 'This field is required.');
  } else {
    this.internals_.setValidity({}, ''); // Clear validity state
  }
}

public checkValidity(): boolean {
  return this.internals_.checkValidity();
}

public reportValidity(): boolean {
  return this.internals_.reportValidity();
}

public setCustomValidity(message: string): void {
  this.internals_.setValidity(message ? { customError: true } : {}, message);
}

protected handleInput(event: InputEvent): void {
  const mdField = event.target as HTMLElement;
  const input = mdField.shadowRoot?.querySelector('input') as HTMLInputElement;

  if (input) {
    this.value = input.value; // Synchronize the value
    this.internals_.setFormValue(this.value); // Update the ElementInternals form value
  } else {
    console.error('Internal input element not found!');
  }
}

  abstract validate(): boolean

  abstract render(): HTMLTemplateResult
}

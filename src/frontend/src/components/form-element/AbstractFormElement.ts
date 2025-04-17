import { HTMLTemplateResult, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import IFormElement from './IFormElement.js';
import AbstractSection from './base-class/AbstractSection.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  private _id: string;
  private _name: string;
  private _label: string;
  private _info?: string;
  private _constraints?:  {[key: string]: any};
  private _dependsOn?: IFormElement;
  private _dependingFields: Array<IFormElement|AbstractSection> = [];

  @property({type: Boolean}) protected _required: boolean;

  constructor(params: IBaseFormElementParams) {
    super();
    this._id = params.id;
    this._name = params.name;
    this._label = params.label;
    this._info = params.info;
    this._required = params.required ?? true;
    this._dependsOn = params.dependsOn;
    this._constraints = params.constraints;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
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
    return this._required;
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

  abstract validate(): boolean

  abstract render(): HTMLTemplateResult
}

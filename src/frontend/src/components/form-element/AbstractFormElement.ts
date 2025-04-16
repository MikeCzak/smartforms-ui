import { HTMLTemplateResult, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import IFormElement from './IFormElement.js';
import AbstractSection from './base-class/AbstractSection.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  private _id: string;

  private _name: string;

  private _label: string;

  private _info: string;

  private _constraints:  {[key: string]: any}|undefined;

  private _dependsOn: IFormElement|undefined;

  private _dependingFields: Array<IFormElement|AbstractSection> = [];

  @property({type: Boolean}) protected _required: boolean;

  constructor(
    id: string,
    name: string,
    label: string,
    info: string,
    isRequired: boolean = true,
    constraints: {[key: string]: any}|undefined = undefined,
    dependsOn: IFormElement|undefined = undefined
  ) {
    super();
    this._id = id;
    this._name = name;
    this._label = label;
    this._info = info;
    this._required = isRequired;
    this._dependsOn = dependsOn;
    this._constraints = constraints;
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

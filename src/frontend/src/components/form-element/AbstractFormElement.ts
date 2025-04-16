import { HTMLTemplateResult, LitElement } from 'lit';
import IFormElement from './IFormElement.js';
import { property } from 'lit/decorators.js';

export default abstract class AbstractFormElement extends LitElement implements IFormElement {

  protected _id: string;

  protected _label: string;

  protected _dependsOn: IFormElement|undefined;

  protected _dependingFields: Array<IFormElement> = [];

  @property({type: Boolean}) protected _required: boolean;

  constructor(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined) {
    super();
    this._id = id;
    this._label = label;
    this._dependsOn = dependsOn;
    this._required = isRequired;
    if (dependsOn) {
      dependsOn.addDependingField(this);
    }
  }

  public get id(): string {
    return this._id;
  }

  public get label(): string {
    return this._label;
  }

  public isRequired(): boolean {
    return this._required;
  }

  public hasDependencies(): boolean {
    return this._dependingFields.length > 0;
  }

  public addDependingField(...elements: IFormElement[]): IFormElement {
    this._dependingFields.push(...elements);

    return this;
  }

  abstract validate(): boolean

  abstract render(): HTMLTemplateResult
}

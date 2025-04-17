import {HTMLTemplateResult, LitElement, css, html} from 'lit';
import IFormElement from "../IFormElement.js";

export default abstract class AbstractSection extends LitElement {

  private _id: string;

  private _label: string;

  private _info: string;

  private _children: Array<IFormElement> = [];

  private _numChildren: number = 0;

  constructor(id: string, label: string, info: string, dependsOn: IFormElement|undefined = undefined) {
    super()
      this._id = id;
      this._label = label;
      this._info = info;
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

    public get info(): string {
      return this._info;
    }

  public addElement(element: IFormElement): AbstractSection {
    this._numChildren = this._children.push(element);

    return this;
  }

  public removeElement(element: IFormElement): AbstractSection {
    this._children = this._children.filter(child => child !== element);
    this._numChildren = this._children.length;

    return this;
  }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }

  public render(): HTMLTemplateResult {
    return html`
    <h2>${this._label}</h2>
    ${this.info && html`<p>${this.info}</p>`}
    <div>
      ${this._children.map(child => child.render())}
    </div>
    `;
  }
}
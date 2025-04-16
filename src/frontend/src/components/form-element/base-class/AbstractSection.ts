import {HTMLTemplateResult, html} from 'lit';
import AbstractFormElement from "../AbstractFormElement.js";
import IFormElement from "../IFormElement.js";

export default abstract class AbstractSection extends AbstractFormElement {

  private _children: Array<IFormElement> = [];

  private _numChildren: number = 0;

  public addElement(element: IFormElement): IFormElement {
    this._numChildren = this._children.push(element);

    return this;
  }

  public removeElement(element: IFormElement): IFormElement {
    this._children = this._children.filter(child => child !== element);
    this._numChildren = this._children.length;

    return this;
  }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }

  public render(): HTMLTemplateResult {
    return html`
    <div>
      ${this._children.map(child => child.render())}
    </div>
    `;
  }
}
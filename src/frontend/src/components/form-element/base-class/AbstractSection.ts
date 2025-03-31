import AbstractFormElement from "../AbstractFormElement.js";
import IFormElement from "../IFormElement.js";

export default abstract class AbstractSection extends AbstractFormElement {

  private _children: Array<IFormElement> = [];

  private _numChildren: number = 0;

  public addChild(element: IFormElement): IFormElement {
    this._numChildren = this._children.push(element);

    return this;
  }

  public removeChild(element: IFormElement): IFormElement {
    this._children = this._children.filter(child => child !== element);
    this._numChildren = this._children.length;

    return this;
  }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }

  public getHTMLResult(): HTMLElement {
    const container = document.createElement('div');

    this._children.forEach(child => {
      container.appendChild(child.getHTMLResult());
    });

    return container;
  }
}
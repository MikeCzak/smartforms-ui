import { LitElement, html, css, HTMLTemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/progress/circular-progress.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: Object = {};

  @property() public abstract formName: string;

  protected abstract _formElementFactory: AbstractFormElementFactory;

  protected _formElements: IFormElement[] = [];



  protected parseData(data: Object): void {
    // TODO implement parser class instead of this:
    this._formElements.push(this._formElementFactory.createTextfield("name", "Name", true));


  }

  addFormElement(element: IFormElement): IForm {
    throw new Error('Method not implemented.');
  }

  getFormElements(): Array<IFormElement> {
    throw new Error('Method not implemented.');
  }

  getFormElementById(id: string): IFormElement {
    throw new Error('Method not implemented.');
  }


  render() {
    return html`
    ${this._formElements.length > 0 ?
      html`
        <div>
          ${this._formElements.map(el => el.render())}
        </div>`
      : html`
        <md-circular-progress indeterminate></md-circular-progress>`
    }
    ${this.formName}`;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.parseData(this.formData);
    // for (const el in this._formData) {
    //   console.log(el)
    // }
  }
}

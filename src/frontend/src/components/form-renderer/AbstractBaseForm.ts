import { LitElement, html, css, HTMLTemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/progress/circular-progress.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: Object = {};

  protected _formElements: IFormElement[] = [];

  @property() protected abstract formName: string;


  protected parseData(data: Object): void {
    throw new Error('Method not implemented.');
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
          form: ${JSON.stringify(this._formElements)}
        </div>`
      : html`
        <md-circular-progress indeterminate></md-circular-progress>`
    }
    ${this._formName}`;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    // for (const el in this._formData) {
    //   console.log(el)
    // }
  }
}

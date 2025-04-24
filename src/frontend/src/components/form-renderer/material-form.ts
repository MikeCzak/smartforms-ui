import { property, customElement } from 'lit/decorators.js';
import { html } from 'lit';
import AbstractBaseForm from './AbstractBaseForm.js';
import MaterialFormElementFactory from '../form-element/MaterialFormElementFactory.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';

@customElement('material-form')
export default class MaterialForm extends AbstractBaseForm {

  @property({type: String}) public formType: string = "material_form";

  protected _formElementFactory: AbstractFormElementFactory;

  constructor() {
    super();
    this._formElementFactory = new MaterialFormElementFactory();
  }

  public validateForm(): boolean {
    const invalidElements = [];
    for (const element of this._formElements) {
      if (element.validate()) {
       invalidElements.push(element);
      }
    }
    if (invalidElements.length === 0) {
      return true;
    }

    invalidElements[0].focus();
    return false;
  }

  protected override getSubmissionOverlay() {
    return html``
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this.rawForm) {
    //   console.log(el)
    // }
  }
}

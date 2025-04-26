import { property, customElement } from 'lit/decorators.js';
import { css, html } from 'lit';
import '@material/web/progress/circular-progress.js';
import AbstractBaseForm from './AbstractBaseForm.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import SmartFormElementFactory from '../form-element/SmartFormElementFactory.js';

@customElement('smart-form')
export default class SmartForm extends AbstractBaseForm {

  @property({type: String}) public formType: string = "smart_form";

  protected _formElementFactory: AbstractFormElementFactory;

  constructor() {
    super();
    this._formElementFactory = new SmartFormElementFactory();
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
    invalidElements[0].focus({preventScroll: true});
    return false;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this._formData) {
    //   console.log(el)
    // }
  }

  // eslint-disable-next-line class-methods-use-this
  protected override getSubmissionOverlay() {
    return html`
      <div class="submitted-overlay">
        <md-elevated-card>
          submitting...
          <md-circular-progress indeterminate></md-circular-progress>
        </md-elevated-card>
      </div>
    `
  }

  static styles = [
    AbstractBaseForm.styles,
    css`
      :host {
        max-width: 600px;
      }
    `
   ]
}
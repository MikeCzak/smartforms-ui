import { property, customElement } from 'lit/decorators.js';
import { html } from 'lit';
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
    let isValid = true;
    // TODO: implement this
    return isValid;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this._formData) {
    //   console.log(el)
    // }
  }

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

}
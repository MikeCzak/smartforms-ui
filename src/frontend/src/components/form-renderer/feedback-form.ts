/* eslint-disable prefer-destructuring */
/* eslint-disable wc/guard-super-call */
import { property, customElement } from 'lit/decorators.js';
import { css, html } from 'lit';
import '@material/web/progress/circular-progress.js';
import AbstractBaseForm from './AbstractBaseForm.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import SmartFormElementFactory from '../form-element/SmartFormElementFactory.js';


@customElement('feedback-form')
export default class FeedbackForm extends AbstractBaseForm {

  @property({type: String}) public formType: string = "feedback";

  protected _formElementFactory: AbstractFormElementFactory;


  constructor() {
    super();
    this._formElementFactory = new SmartFormElementFactory();
  }

  public validateForm(): boolean {
    return true;
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
        width: 600px;
        max-width: 98vw;
      }

      @media (max-width: 900px) {
        :host {
          margin-right: 50px;
        }
      }
    `
   ]

   protected postSubmitCallback(submissionSuccessful: boolean): void {
    this.dispatchEvent(new CustomEvent('formSubmitted', {bubbles: true, composed: true, detail: {"submissionSuccessful": submissionSuccessful, "formType": this.formType}}));
    sessionStorage.clear();
    localStorage.clear();
  };
}
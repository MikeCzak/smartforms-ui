import { LitElement, html, css } from 'lit';
import { when } from 'lit/directives/when.js';
import { customElement, property, state } from 'lit/decorators.js';
import './my-icon.js';
import ApiClient from '../util/ApiClient.js';

@customElement('thank-you')
export default class ThankYou extends LitElement {

  @state() private _feedbackForm: Object = {};
  @property({type: String, attribute: false}) internalFormId!: string;

  static styles = css`
    .thank-you, .feedback {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 100%;
      text-align: center;
      margin-bottom: 100px;
    }
    my-icon.success {
      color: green;
      font-size: 40px;
    }
    my-icon.feedback-icon {
      font-size: 80px;
    }
  `;

  render() {
    return html`
    <div class="thank-you">
      <p><my-icon icon="task_alt" class="success"></my-icon> Form successfully submitted.</p>
      <p>
        Thank you SO MUCH for your time!<br>
        You're almost there - please provide some feedback about the form
        filling experience in the form below!
      </p>
    </div>
    ${when(
      !this._feedbackForm,
      () => html`
        <div class="feedback">
          <h1>
            <my-icon icon="chat" class="feedback-icon"></my-icon>
            Feedback
          </h1>
          <smart-form .formData=${this._feedbackForm}></smart-form>
        </div>
      `,
      () => html`<md-circular-progress indeterminate></md-circular-progress> loading feedback form...`
    )}
    `;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.loadFeedbackForm();
  }

  private async loadFeedbackForm() {
    this._feedbackForm = await ApiClient.loadFormData('feedback');
  }
}

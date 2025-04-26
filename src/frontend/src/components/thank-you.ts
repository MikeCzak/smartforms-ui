import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './my-icon.js';
import ApiClient from '../util/ApiClient.js';

@customElement('thank-you')
export default class ThankYou extends LitElement {

  @state() private _feedbackForm: Object = {};
  @property({type: String, attribute: false}) internalFormId!: string;

  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      text-align: center;
    }
    my-icon.success {
      color: green;
      font-size: 40px;
    }
    my-icon.feedback-icon {
      font-size: 120px;
    }
  `;

  render() {
    return html`
    <div class="wrapper">
      <p><my-icon icon="task_alt" class="success"></my-icon> Form successfully submitted.</p>
      <p>
        Thank you SO MUCH for your time!<br>
        You're almost there - please provide some valuable feedback about the form
        filling experience in the feedback form below!
      </p>
      <my-icon icon="chat" class="feedback-icon"></my-icon>
    </div>
    <smart-form .formData=${this._feedbackForm}></smart-form>
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

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './my-icon.js';

@customElement('thank-you')
export default class ThankYou extends LitElement {


  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      text-align: center;
    }
    my-icon {
      color: green;
      font-size: 120px;
    }
  `;

  render() {
    return html`
    <div class="wrapper">
      <p>Form successfully submitted.</p>
      <my-icon icon="task_alt"></my-icon>
      <p>Thank you for your time!<br>You can close this page now.</p>
    </div>
    `;
  }
}

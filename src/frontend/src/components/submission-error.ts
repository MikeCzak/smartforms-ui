import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './my-icon.js';

@customElement('submission-error')
export default class SubmissionError extends LitElement {


  static styles = css`
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    my-icon {
      color: var(--md-sys-color-error);
      font-size: 120px;
    }
  `;

  render() {
    return html`
    <div class="wrapper">
      <p>Something went wrong.</p>
      <my-icon icon="dangerous"></my-icon>
      <p>Your form could not be submitted!<br>I was informed and won't bother you with another try.<br>Thank you anyway!</p>
    </div>
    `;
  }
}

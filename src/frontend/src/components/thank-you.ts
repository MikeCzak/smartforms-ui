import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './my-icon.js';

import AbstractSmartElement from './form-element/smart/AbstractSmartElement.js';

@customElement('thank-you')
export default class ThankYou extends LitElement {

  @property({type: String}) formName: string = 'Form';
  @property({type: Boolean}) showGoodbye: boolean = true;

  static styles = [
    AbstractSmartElement.styles,
    css`
    my-icon.success {
      color: green;
      font-size: 40px;
    }
    .thank-you {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `];

  render() {
    return html`
      <div class="thank-you">
        <p><my-icon icon="task_alt" class="success"></my-icon> ${this.formName} successfully submitted.</p>
        ${this.showGoodbye ? html`<p>Thank you SO MUCH for your time!</p>`:''}
      </div>
    `;
  }
}

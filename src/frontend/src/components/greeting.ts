import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@material/web/checkbox/checkbox.js';
import '@material/web/labs/card/elevated-card.js';
import '@material/web/button/filled-button.js'

@customElement('form-greeting')
export class Greeting extends LitElement {

  @property({type: Boolean, attribute: false})
  private _agreed: boolean = false;


  static styles = css`
    md-elevated-card {
      padding: 16px;
      margin: auto 16px;
      display: flex;
      align-items: flex-start;
      text-align: start;

    }

    md-elevated-card.agreed {
      height: auto;
    }

    md-checkbox {
      margin-right: 10px;
    }

    h2 {
      font-size: var(--md-sys-typescale-title-large);
    }

    p, li {
      line-height: 24px;
      text-justify: true;
    }

    p:last-of-type {
      margin-bottom: 100px;
    }

    ul {
      margin-top: 0;
    }

    form {
      margin-left: auto;
      margin-top: 20px;
    }

    label:has([required]) {
      position: relative;
      background-color: var(--md-sys-color-surface-container-low);
      padding: 8px;
    }

    label:has([required]):before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      height: calc(100% + 4px);
      width: 100%;
      background: linear-gradient(90deg, var(--required) 0%, transparent 50%);
    }

    label:has([required]):after {
      content: '*';
      color: var(--required);

  `;

  render() {
    return html`
      <md-elevated-card>
        <h2>Welcome to SmartForms UI!</h2>
        <p>
          Thank you in advance for participating in my study - you're helping me a bunch! <br>
          You will be presented a form that has been designed for test purposes, meaning its contents and
          requirements do not necessarily reflect a real-world situation, but cover all the aspects I need to test.
          You will be provided dummy data for fields regarding personal information so that you don't have to enter any real data.
          <br><br>Please try to
        </p>

          <ul>
            <li>fill out the form as if it was a real one,</li>
            <li>avoid validation errors due to wrong data formats,</li>
            <li>fill all required fields (marked like the one below) and</li>
            <li>complete the form without interruptions.</li>
          </ul>

          There is no time limit, but the completion time will be part of the measurements.
        <p>
          When you're ready, please tick the checkbox below and then click the "Get started!" button.
          Thanks again - you rock!
        </p>
        <label for="agreed">
          <md-checkbox id="agreed" aria-required="true" required @change=${this.handleCheck}></md-checkbox>
          I have read the introduction above and am ready to start.
        </label>
        <form id="form" @submit=${this.handleSubmit}>
          <md-filled-button ?disabled=${!this._agreed} type=submit>Get started!</md-filled-button>
        </form>
      </md-elevated-card>
    `;
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.dispatchEvent(new SubmitEvent("submit", { bubbles: true }) )
  }

  private handleCheck(event: Event) {
    this._agreed = (event.target as HTMLInputElement).checked;
  }
}
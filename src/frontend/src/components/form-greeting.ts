import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@material/web/checkbox/checkbox.js';
import '@material/web/labs/card/elevated-card.js';
import '@material/web/button/filled-button.js'

@customElement('form-greeting')
export default class FormGreeting extends LitElement {

  @property({type: Boolean, attribute: false})
  private _agreed: boolean = false;


  static styles = css`

    md-elevated-card {
      padding: 16px;
      margin: auto 16px;
      display: flex;
      align-items: flex-start;
      text-align: start;
      max-width: 900px;
    }

    md-elevated-card.agreed {
      height: auto;
    }

    md-checkbox {
      margin-right: 10px;
    }

    h2 {
      font-size: var(--md-sys-typescale-display-medium);
      color: var(--md-sys-color-secondary);
    }

    p, li {
      line-height: 24px;
      text-justify: true;
    }

    p:last-of-type {
      margin-bottom: 40px;
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
      padding-bottom: 8px;
    }

    label:has([required]):before {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      height: calc(100% + 4px);
      width: 100%;
      background: linear-gradient(90deg, var(--required) 0%, transparent max(150px, 60%));
    }

    label:has([required]):after {
      content: '*';
      color: var(--required);

  `;

  render() {
    return html`
      <md-elevated-card>
        <h2>Welcome to SmartForms UI!</h2>
        <p style="color: var(--required); font-weight: bold">This prototype focuses on keyboard interaction and is not optimized for mobile.</p>
        <p>
          Thank you in advance for participating in my study - you're helping me a bunch! <br>
          You will be presented a form that has been designed for test purposes, meaning its contents and
          requirements do not necessarily reflect a real-world situation, but cover all the aspects I need to test.
          You will be provided dummy data for fields regarding sensitive information (like account number) so that you don't have to enter any real data.
          <span style="color: var(--required); font-weight: bold">You can access that dummy data anytime by clicking on the floating button in the bottom-right corner. Try it now!</span>
          <br>You can use your real name, birthday, etc. but don't have to - I guarantee that your input is solely used for the empirical evaluation of the form filling process and
          none of it will be in any way made public or given to third parties.
          <br><br>Please try to
        </p>

          <ul>
            <li>fill out the form as if it was a real one: Be impatient!
              Put yourself in a "C'mon man, I just wanna quickly sign up and get on with life!" mindset!
              Be mad at me for stealing your precious time with a f***ing web form!
            </li>
            <li>fill all required fields (marked <span style="color: var(--required);">orange</span> and with a <span style="color: var(--required);">*</span>), filling all fields would be appreciated but isn't necessary, and</li>
            <li>complete the form as quickly as possible.</li>
          </ul>

          There is no time limit, but the completion time will be part of the measurements.
        <p>
          When you're ready, please tick the checkbox below and then click the "Get started!" button.
          Thanks again - you rock! <span style="font-size:30px">&#x1F918;</span>
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
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/greeting.js';
import './components/theme-toggle.js'

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {

  @property({ type: Boolean, attribute: false }) _greetingRead: boolean = JSON.parse(sessionStorage.greetingRead || 'false');

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 960px;
      margin: 32px auto;
      text-align: center;
      flex-grow: 1;
    }
  `;

  render() {
      return !this._greetingRead ? html`
        <main>
          <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
        </main>
      ` :
      html`empty`;
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._greetingRead = true;
    sessionStorage.greetingRead = JSON.stringify(this._greetingRead);
  }
}

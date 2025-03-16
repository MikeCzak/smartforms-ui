import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/greeting.js';
import './components/theme-toggle.js'

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {
  @property({ type: String }) header: string = 'SmartForms UI';

  @property({ type: Boolean }) greetingRead: boolean = false;

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



    @keyframes app-logo-spin {
      0% {
        transform: rotate3d(0, 1, 0, 0deg)
      }
      50% {
        transform: rotate3d(0, 1, 0, 180deg)
      }
      100% {
        transform: rotate3d(0, 1, 0, 360deg)
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <main>
        <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
      </main>
    `;
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.greetingRead = true;
  }
}

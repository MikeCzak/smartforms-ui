import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/greeting.js';

const logo = new URL('../../assets/logo.png', import.meta.url).href;

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {
  @property({ type: String }) header: string = 'SmartForms UI';

  @property({ type: Boolean }) greetingRead: boolean = false;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(6px + 2vmin);
      color: #010913;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;

    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin .5s ease-in-out;

      & img {
        width: calc(30px + 3vmin);
      }
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
        <div class="logo"><img alt="open-wc logo" src=${logo} /></div>
        <h1>${this.header}</h1>
        <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
      </main>

      <p class="app-footer">

      </p>
    `;
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.greetingRead = true;
  }
}

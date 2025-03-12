import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const logo = new URL('../../assets/logo.png', import.meta.url).href;

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {
  @property({ type: String }) header = 'SmartForms UI';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
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
        width: 100px;
      }
    }

    @keyframes app-logo-spin {
      0% {
        transform: scaleX(1);
      }
      50% {
        transform: scaleX(-1);
      }
      100% {
        transform: scaleX(1);
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

      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

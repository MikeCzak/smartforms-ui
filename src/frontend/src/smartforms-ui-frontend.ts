import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './components/greeting.js';
import './components/theme-toggle.js';
import '@material/web/progress/circular-progress.js'

const APIROOT = `${document.location.protocol}//${document.location.hostname}${document.location.hostname==='localhost' ? ':3000' : ''}`


@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {

  @property({ type: Boolean, attribute: false }) _greetingRead: boolean = JSON.parse(sessionStorage.greetingRead || 'false');

  @property({type: Object}) private _rawForm: JSON | undefined;

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
     (this._rawForm && html`

        <md-circular-progress indeterminate></md-circular-progress>
      `) || 'error fetching data';
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.loadFormData();
  }

  private async loadFormData() {
    try {
      const response = await fetch(`${APIROOT}/api/formdata/registration`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      this._rawForm = json;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._greetingRead = true;
    sessionStorage.greetingRead = JSON.stringify(this._greetingRead);
  }
}

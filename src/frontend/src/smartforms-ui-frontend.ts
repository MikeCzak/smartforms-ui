import { LitElement, html, css } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import './components/form-greeting.js';
import './components/theme-toggle.js';
import './components/form-renderer/smart-form.js';
import './components/form-renderer/material-form.js';
import ApiClient from './util/ApiClient.js';

export const isDev = document.location.hostname==='localhost';

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {

  @property({ type: Boolean, attribute: false }) _greetingRead: boolean = JSON.parse(sessionStorage.greetingRead || 'false');

  @property({type: Object}) private _rawForm: Object = {};

  @property({attribute: false}) private _formType: string|null = localStorage.getItem('formType');

  @state() private _showPersonalInfo: boolean = false;

  private _internalFormId: string | null = sessionStorage.getItem('internalFormId');

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 32px auto;
      flex-grow: 1;
      box-sizing: border-box;
      padding: 0 8px;
    }
    #personal-info-button {
      position: fixed;
      bottom: 56px;
      right: 16px;
      z-index: 100;
    }
    #personal-info-button.highlighted::before {
      content: 'south_east';
      margin-top: -48px;
      font-family:"Material Icons";
      font-size: 50px;
      font-weight: bold;
      color: var(--required);
      animation: jumping .5s infinite ease-in-out alternate
    }
    @keyframes jumping {
      from {transform: translateX(-20px) translateY(-20px)}
      to {transform: translateX(0) translateY(0)}
    }
    #back-button {
      position: fixed;
      bottom: 56px;
      left: 16px;
      z-index: 100;
    }
    #personal-info {
      /* display: none; */
      position: fixed;
      bottom: 132px;
      right: 16px;
      max-width: 90vw;
      background-color: var(--md-sys-color-surface);
      padding: 16px;
      padding-top: 6px;
      border-radius: var(--smart-border-radius);
      opacity: 0;
      z-index: 100;
      transition: opacity .3s ease-in-out;

      &.open {
        display: block;
        opacity: 1;
      }

      & .headline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0;
      }
    }

  `;

  render() {
      return ((Object.keys(this._rawForm).length > 0 && this._formType !== null && this._internalFormId !== null) && html`
        ${!this._greetingRead ? html`
          <main>
            <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
          </main>
        ` :
        choose(this._formType, [
          ['material', () => html`<material-form .formData=${this._rawForm} .internalFormId=${this._internalFormId!}></material-form>`],
          ['smart', () => html`<smart-form .formData=${this._rawForm} .internalFormId=${this._internalFormId!}></smart-form>`],
        ]
        )}
        <md-fab @click=${this.showPersonalData} id="personal-info-button" class="highlighted" aria-label="Your personal data">
          <my-icon slot="icon" icon="info"></my-icon>
        </md-fab>
        ${when(this._greetingRead, () => html`<md-fab label="Back to start" id="back-button" @click=${() => {this._greetingRead = false; this.loadFormData(); sessionStorage.greetingRead = JSON.stringify(this._greetingRead)}}>
          <my-icon slot="icon" icon="arrow_back"></my-icon>
        </md-fab>`)}
        <div id="personal-info" class="${this._showPersonalInfo ? 'open': ''}">
          <h3 class="headline">
            Your personal data
            <md-icon-button @click=${this.hidePersonalData} aria-label="Close dialog">
              <my-icon icon="close"></my-icon>
            </md-icon-button>
          </h3>

          <div class="content">
            Your Birthday: 20.10.2000<br>
            Your IBAN: AT23 1234 5678 1234 5678
          </div>
        </div>
      `) || html`<pre>loading form data...</pre>`;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.loadFormData();
  }

  private showPersonalData(event: Event): void {
    const target = event.target as Element;
    target.classList.remove("highlighted");
    this._showPersonalInfo = true;
  }

  private hidePersonalData(): void {
    this._showPersonalInfo = false;
  }

  private async loadFormData() {
    this._rawForm = await ApiClient.loadFormData('registration');
    if(this._formType === null || this._internalFormId === null) {
      const typeAndUUID = await ApiClient.loadNextFormType();
      if (typeAndUUID) {
        const {formtype, uuid} = typeAndUUID;
        this._formType = formtype;
        this._internalFormId = uuid;
        sessionStorage.setItem('internalFormId', uuid);
        localStorage.setItem('formType', this._formType!)
      }
    }
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._greetingRead = true;
    sessionStorage.greetingRead = JSON.stringify(this._greetingRead);
  }
}

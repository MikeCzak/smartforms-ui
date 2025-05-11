/* eslint-disable wc/guard-super-call */
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

  @property({type: Object}) private _rawForm: Object | null = null;

  @property({attribute: false}) private _formType: string|null = localStorage.getItem('formType');

  @state() private _showPersonalInfo: boolean = false;

  @state() private _formSubmitted: boolean = false;

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
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      position: fixed;
      bottom: 56px;
      right: 86px;
      max-width: 90vw;
      background-color: var(--md-sys-color-surface);
      padding: 6px 32px 16px 16px;
      border-radius: var(--smart-border-radius);
      z-index: 100;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      box-shadow: 0 0 6px rgba(0,0,0,.5);

      &.open {
        opacity: .85;
        visibility: visible;
        pointer-events: auto;

        &:hover {
          opacity: 1;
        }
      }

      & .headline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0;
      }

      & .content {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        & h3 {
          margin-block-end: .25em;
        }
      }
      & #close-personal-info-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

  `;

  render() {
      return ((this._rawForm !== null && this._formType !== null && this._internalFormId !== null) && html`
        ${!this._greetingRead ? html`
          <main>
            <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
          </main>
        ` :
        choose(this._formType, [
          ['material', () => html`<material-form .formData=${this._rawForm!} .internalFormId=${this._internalFormId!}></material-form>`],
          ['smart', () => html`<smart-form .formData=${this._rawForm!} .internalFormId=${this._internalFormId!}></smart-form>`],
        ]
        )}
        ${when(!this._formSubmitted, () => html`<md-fab @click=${this.showPersonalData} id="personal-info-button" class="highlighted" aria-label="Your personal data">
          <my-icon slot="icon" icon="info"></my-icon>
        </md-fab>`)}
        ${when(this._greetingRead && !this._formSubmitted, () => html`<md-fab label="Back to start" id="back-button" @click=${() => {this._greetingRead = false; this.loadFormData(); sessionStorage.greetingRead = JSON.stringify(this._greetingRead)}}>
          <my-icon slot="icon" icon="arrow_back"></my-icon>
        </md-fab>`)}
        <div id="personal-info" class="${this._showPersonalInfo ? 'open': ''}">
          <h2 class="headline">
            Your Dummy Data
            <md-icon-button id="close-personal-info-button" @click=${this.hidePersonalData} aria-label="Close dialog">
              <my-icon icon="close"></my-icon>
            </md-icon-button>
          </h2>

          <div class="content">
            <h3>Personal Info</h3>
            <p>Birthday:<br> 20.10.2000</p>
            <p>IBAN:<br> AT23 0400 9855 1607 1442</p>

            <h3>Your Device Data</h3>
            <p></p>Router Model: <br>Tenda AX3000</p>
            <p>MAC-Address: <br>8E:4A:C3:7B:92:F1</p>
            <p>Serial Number: <br>48372-10945-76283-59410</p>
            <p>License Number: <br>A7F3-KD92-Q1LM-48ZN-XR5B</p>
          </div>
        </div>
      `) || html`<pre>loading form data...</pre><md-circular-progress indeterminate></md-circular-progress>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('formSubmitted', this.submissionHandler)
    this.loadFormData();
    if (isDev) { // TODO: remove this
      // document.addEventListener('keydown', this.getDeepActiveElement)
    }
  }

  // getDeepActiveElement(e: KeyboardEvent): void { // TODO: remove this
  //   let active = document.activeElement;
  //   while (active?.shadowRoot && active.shadowRoot.activeElement) {
  //     active = active.shadowRoot.activeElement;
  //   }
  //   console.log(active);
  // }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('formSubmitted', this.submissionHandler);
  }

  private submissionHandler(): void {
    this._formSubmitted = true;
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
        this.requestUpdate()
      }
    }
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._greetingRead = true;
    sessionStorage.greetingRead = JSON.stringify(this._greetingRead);
  }
}

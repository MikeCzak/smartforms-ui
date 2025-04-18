import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import './components/form-greeting.js';
import './components/theme-toggle.js';
import './components/form-renderer/smart-form.js';
import './components/form-renderer/material-form.js';
import { MdDialog } from '@material/web/all.js';
import {EASING} from '@material/web/internal/motion/animation.js';
import { FormType } from './FormType.js';
import ApiClient from './util/ApiClient.js';

export const isDev = document.location.hostname==='localhost';

@customElement('smartforms-ui-frontend')
export class SmartformsUiFrontend extends LitElement {

  @property({ type: Boolean, attribute: false }) _greetingRead: boolean = JSON.parse(sessionStorage.greetingRead || 'false');

  @property({type: Object}) private _rawForm: Object = {};

  @property({attribute: false}) private _formType: FormType|null = null;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 960px;
      margin: 32px auto;
      flex-grow: 1;
    }
    #personal-info-button {
      position: fixed;
      bottom: 56px;
      right: 16px;
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
    #personal-info {
      margin: auto 16px 132px auto;
      max-width: 90vw;
    }

  `;

  render() {
      return (this._rawForm && this._formType && html`
      ${!this._greetingRead ? html`
        <main>
          <form-greeting @submit=${this.handleGreetingSubmit}></form-greeting>
        </main>
      ` :
        choose(this._formType, [
          [FormType.MATERIAL, () => html`<material-form .formData=${this._rawForm}></material-form>`],
          [FormType.SMART, () => html`<smart-form .formData=${this._rawForm}></smart-form>`],
        ]
        )}
        <md-fab @click=${this.showPersonalData} id="personal-info-button" class="highlighted" aria-label="Your personal data">
          <my-icon slot="icon" icon="info"></my-icon>
        </md-fab>
        <md-dialog id="personal-info">
          <span slot="headline">
            <span style="flex: 1;">Your personal data</span>
            <md-icon-button form="form" value="close" aria-label="Close dialog">
              <my-icon icon="close"></my-icon>
            </md-icon-button>
          </span>
          <form id="dialog-form" slot="content" method="dialog">
            Your Birthday: 20.10.2000
          </form>
        </md-dialog>
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
    const dialog = target.getRootNode() instanceof ShadowRoot
        ? (target.getRootNode() as ShadowRoot).querySelector('md-dialog')
        : target.nextElementSibling as MdDialog;
    if(dialog) {
      const open = dialog.getOpenAnimation();
      open.dialog = [[[{'transform': 'translateX(150px)'}, {'transform': 'translateX(0)'}], {duration: 500, easing: EASING.EMPHASIZED}]]
      const close = dialog.getCloseAnimation();
      close.dialog = [[[{"transform":"translateX(0)"},{"transform":"translateX(150px)"}],{"duration":150,"easing":"cubic-bezier(.3,0,.8,.15)"}]]
    }

    dialog?.show();
}

  private async loadFormData() {
    this._rawForm = await ApiClient.loadFormData('registration');
    this._formType = await ApiClient.loadNextFormType();
  }

  private handleGreetingSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._greetingRead = true;
    sessionStorage.greetingRead = JSON.stringify(this._greetingRead);
  }
}

import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import './components/form-greeting.js';
import './components/theme-toggle.js';
import './components/form-renderer/smart-form.js';
import './components/form-renderer/material-form.js';
import ApiClient from './util/ApiClient.js';
import { FormType } from './FormType.js';

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
     (this._rawForm && this._formType && html`
        ${choose(this._formType, [
          [FormType.MATERIAL, () => html`<material-form .formData=${this._rawForm}></material-form>`],
          [FormType.SMART, () => html`<smart-form .formData=${this._rawForm}></smart-form>`],
        ]
        )}
      `) || html`
      <pre>loading form data...</pre>`
      ;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.loadFormData();
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

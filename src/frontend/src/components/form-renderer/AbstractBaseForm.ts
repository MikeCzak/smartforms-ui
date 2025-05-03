import { LitElement, html, css, HTMLTemplateResult, CSSResultGroup } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import '@material/web/all.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import AbstractSection from '../form-element/base-class/AbstractSection.js';
import '../form-element/material/MaterialSection.js';
import { isDev } from '../../smartforms-ui-frontend.js';
import ApiClient from '../../util/ApiClient.js';
import '../thank-you.js';
import '../submission-error.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: { [key: string]: any } = {};

  @property() public abstract formType: string;

  @property() public formTitle: string = '';

  @property({attribute: false}) public internalFormId!: string;

  @query('#form #elements') form!: HTMLFormElement;

  @state() private _submissionSuccessful: boolean|null = null;

  @state() private _submitted: boolean = false;

  protected abstract _formElementFactory: AbstractFormElementFactory;

  protected _formSections: AbstractSection[] = [];

  protected _formElements: IFormElement[] = [];


  protected parseData(data: { [key: string]: any }): void {

    const createElement = (element: any): IFormElement | never => {
      if (element.type !== "form" && (!element.label || !element.name || element.required === undefined || !element.type)) {
        throw new Error(`Missing required keys for element: ${JSON.stringify(element)}`);
      }
      if (element.type === "form" && !element.subform) {
        throw new Error(`Missing key "subform" for nested form: ${JSON.stringify(element)}`);
      }
      if(element.constraints !== undefined) {
        if(element.constraints.max < element.constraints.min) {
          throw new Error(`Min constraint "${element.constraints.min}" is greater than max constraint "${element.constraints.min}"`);
        }
      }
      const factoryMethod = this._formElementFactory.factoryMap[element.type];
      if (!factoryMethod) {
        throw new Error(`No factory method found for element type: ${element.type}`);
      }

      if (element.dependsOn) {
        // eslint-disable-next-line no-param-reassign
        element.dependsOn.field = this.getElementByName(element.dependsOn.field);
      }


      return factoryMethod(element);
    };

    for (const section of data.sections) {
      const formSection = this._formElementFactory.createSection('section', section.title, section.info);

      for (const element of section.fields) {
        let formElement;
        if(element.type === "form") {
          for (const subformElement of element.subform.fields) {
            formElement = createElement(subformElement);
            if (formElement) {
              formSection.addElement(formElement);
              this._formElements.push(formElement);
            }
          }
        } else {
          formElement = createElement(element);
          if (formElement) {
            formSection.addElement(formElement);
            this._formElements.push(formElement);
          }
        }
      }

      this._formSections.push(formSection);
      if(this.form) {
        this.form.appendChild(formSection);
      } else {
        throw new Error("Form element not found in the DOM");
      }
    }
  }

  static styles: CSSResultGroup = css`
    :host {
      max-width: 460px;
    }
    .debug--formType {
      position: fixed;
      bottom: 2px;
      left: 2px;
      background: red;
    }

    .submit-button {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }

    .submitted-overlay {
      position: fixed;
      z-index: 100;
      display: flex;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, .6);
      & md-elevated-card {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 20px;
      }
    }
  `

  render() {
    return html`
      ${choose(this._submissionSuccessful, [
        [null, () => html`
          <h1>${this.formTitle}</h1>
          <form @submit=${this.submitForm} id="form" novalidate>
            <div id="elements"></div>
            <div class="submit-button">
              ${this._formElementFactory.getSubmit("Submit", this._submitted)}
            </div>
          </form>
          ${(this._submitted && this.getSubmissionOverlay()) || ''}
          ${isDev ? html`<div class="debug--formType">${this.formType}</div>` : ''}`
        ],
        [true, () => html`<thank-you .internalFormId=${this.internalFormId}></thank-you>`],
        [false, () => html`<submission-error></submission-error>`],
      ])}
    `
    ;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.formTitle = this.formData.formTitle;
  }

  protected firstUpdated(): void {
    this.parseData(this.formData);
  }

  private async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const isValid = this.validateForm();

    if (!isValid) { // TODO: remove debug not
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const jsonData: { [key: string]: any } = {};
      let totalFocusTime = 0;

      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      jsonData.metaData = {};

      this._formElements.forEach((e) => {
        jsonData.metaData[e.id] = {}
        e.metaData.forEach((v, k) => {
          jsonData.metaData[e.id][k] = v;
        })
        const elementFocusTime = e.metaData.get('focusTime');
        if(elementFocusTime) {
          totalFocusTime += elementFocusTime;
        }
      })
      jsonData.metaData.totalFocusTime = totalFocusTime;
      jsonData.internalFormId = {"internalFormId": this.internalFormId};
      this._submitted = true;
      ApiClient.saveForm(jsonData, this.formType).then(res => {
        this._submissionSuccessful = res;
      })
      this.postSubmitCallback();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected postSubmitCallback(): void {
    this.dispatchEvent(new CustomEvent('formSubmitted', {bubbles: true, composed: true}));
    sessionStorage.clear();
    localStorage.clear();
  };

  private getElementByName(name: string): IFormElement {
    for (const formElement of this._formElements) {
      if (formElement.originalName === name) {
        return formElement;
      }
    }
    throw new Error(`Referenced dependency element with name "${name}" not found.`);
  }

  abstract validateForm(): boolean;

  protected abstract getSubmissionOverlay(): HTMLTemplateResult;
}

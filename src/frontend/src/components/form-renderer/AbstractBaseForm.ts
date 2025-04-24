import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import '@material/web/all.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import AbstractSection from '../form-element/base-class/AbstractSection.js';
import '../form-element/material/MaterialSection.js';
import { isDev } from '../../smartforms-ui-frontend.js';
import ApiClient from '../../util/ApiClient.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: { [key: string]: any } = {};

  @property() public abstract formType: string;

  @property() public formTitle: string = '';

  @query('#form #elements') form!: HTMLFormElement;

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

  static styles = css`
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
  `

  render() {
    return html`
      <h1>${this.formTitle}</h1>
      <form @submit=${this.submitForm} id="form" novalidate>
        <div id="elements"></div>
        <div class="submit-button">
          ${this._formElementFactory.getSubmit("Submit")}
        </div>
      </form>
    ${isDev ? html`<div class="debug--formType">${this.formType}</div>` : ''}`;
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

    if (isValid) {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const jsonData: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      jsonData.metaData = {};
      this._formElements.forEach((e) => {jsonData.metaData[e.id] = e.metaData})
      console.log(jsonData)

      ApiClient.saveForm(jsonData, this.formType)
    }
  }

  private getElementByName(name: string): IFormElement {
    for (const formElement of this._formElements) {
      if (formElement.name === name) {
        return formElement;
      }
    }
    throw new Error(`Referenced dependency element with name "${name}" not found.`);
  }

  abstract validateForm(): boolean;
}

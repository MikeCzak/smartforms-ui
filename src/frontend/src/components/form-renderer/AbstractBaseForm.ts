import { LitElement, html, css, HTMLTemplateResult, CSSResultGroup } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import '@material/web/all.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import AbstractSection from '../form-element/base-class/AbstractSection.js';
import '../form-element/material/MaterialSection.js';
import { isDev } from '../../smartforms-ui-frontend.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: { [key: string]: any } = {};

  @property() public abstract formType: string;

  @property() public formTitle: string = '';

  @query('#form') form!: HTMLFormElement;

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
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.innerHTML = 'Submit';
    this.form.appendChild(submit);
  }

  static styles = css`
    .debug--formType {
      position: fixed;
      bottom: 2px;
      left: 2px;
      background: red;
    }
  `

  render() {
    return html`
      <h1>${this.formTitle}</h1>
      <form @submit=${this.submitForm} id="form">
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

  private submitForm(event: SubmitEvent) {
    // event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
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
}

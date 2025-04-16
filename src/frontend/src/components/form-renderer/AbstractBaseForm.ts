import { LitElement, html, css, HTMLTemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/progress/circular-progress.js';
import IForm from './IForm.js';
import IFormElement from '../form-element/IFormElement.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import AbstractSection from '../form-element/base-class/AbstractSection.js';
import '../form-element/material/MaterialSection.js';

export default abstract class AbstractBaseForm extends LitElement implements IForm {

  @property({attribute: false}) public formData: { [key: string]: any } = {};

  @property() public abstract formType: string;

  @property() public formTitle: string = '';

  protected abstract _formElementFactory: AbstractFormElementFactory;

  protected _formSections: AbstractSection[] = [];

  protected _formElements: IFormElement[] = [];


  protected parseData(data: { [key: string]: any }): void {
    this.formTitle = data.formTitle;

    const createElement = (element: any): IFormElement | never => {
      if (element.type !== "form" && (!element.label || !element.name || element.required === undefined || !element.type)) {
        throw new Error(`Missing required keys for element: ${JSON.stringify(element)}`);
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
    }
  }

  render() {
    return html`
    ${this._formSections.length > 0 ?
      html`
        <h1>${this.formTitle}</h1>
        <div>
          ${this._formSections.map(el => el)}
        </div>
        <material-section>asdf</material-section>`

      : html`<md-circular-progress indeterminate></md-circular-progress>`
    }
    ${this.formType}`;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.parseData(this.formData);
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

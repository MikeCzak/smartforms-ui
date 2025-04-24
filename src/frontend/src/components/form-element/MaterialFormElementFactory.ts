import { html } from 'lit';
import AbstractFormElementFactory from './AbstractFormElementFactory.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';
import IChoiceElementParams from './IChoiceElementParams.js';
import AbstractSection from './base-class/AbstractSection.js';
import IFormElement from './IFormElement.js';
import MaterialChoice from './material/MaterialChoice.js';
import MaterialDate from './material/MaterialDate.js';
import MaterialEmail from './material/MaterialEmail.js';
import MaterialHidden from './material/MaterialHidden.js';
import MaterialNumber from './material/MaterialNumber.js';
import MaterialPassword from './material/MaterialPassword.js';
import MaterialRange from './material/MaterialRange.js';
import MaterialSection from './material/MaterialSection.js';
import MaterialTel from './material/MaterialTel.js';
import MaterialTextarea from './material/MaterialTextarea.js';
import MaterialTextfield from './material/MaterialTextfield.js';

export default class MaterialFormElementFactory extends AbstractFormElementFactory {

  createSection(name: string, label: string, info: string, dependsOn: IFormElement | undefined = undefined): AbstractSection {
    return new MaterialSection(this.getUniqueIdFromName(name), label, info, dependsOn);
  }
  createTextfield(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialTextfield, params); }
  createTextarea(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialTextarea, params); }
  createChoice(params: IChoiceElementParams): IFormElement { return this.createElement(MaterialChoice, params); }
  createDate(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialDate, params); }
  createNumber(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialNumber, params); }
  createPassword(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialPassword, params); }
  createRange(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialRange, params); }
  createHidden(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialHidden, params); }
  createEmail(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialEmail, params); }
  createTel(params: IBaseFormElementParams): IFormElement { return this.createElement(MaterialTel, params); }

  public getSubmit(label: string) {
    return html`
      <md-filled-button type="submit">${label}</md-filled-button>
    `
  }
}
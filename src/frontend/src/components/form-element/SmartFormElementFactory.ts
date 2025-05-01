import { html } from 'lit';
import AbstractFormElementFactory from './AbstractFormElementFactory.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';
import IChoiceElementParams from './IChoiceElementParams.js';
import AbstractSection from './base-class/AbstractSection.js';
import IFormElement from './IFormElement.js';
import SmartChoice from './smart/SmartChoice.js';
import SmartDate from './smart/SmartDate.js';
import SmartEmail from './smart/SmartEmail.js';
import SmartHidden from './smart/SmartHidden.js';
import SmartNumber from './smart/SmartNumber.js';
import SmartPassword from './smart/SmartPassword.js';
import SmartRange from './smart/SmartRange.js';
import SmartSection from './smart/SmartSection.js';
import SmartTel from './smart/SmartTel.js';
import SmartTextarea from './smart/SmartTextarea.js';
import SmartTextfield from './smart/SmartTextfield.js';

export default class SmartFormElementFactory extends AbstractFormElementFactory {
  createSection(name: string, label: string, info: string, dependsOn: IFormElement | undefined = undefined): AbstractSection {
    return new SmartSection(this.getUniqueIdFromName(name), label, info, dependsOn);
  }

  createTextfield(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartTextfield, params); }
  createTextarea(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartTextarea, params); }
  createChoice(params: IChoiceElementParams): IFormElement { return this.createElement(SmartChoice, params); }
  createDate(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartDate, params); }
  createNumber(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartNumber, params); }
  createPassword(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartPassword, params); }
  createRange(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartRange, params); }
  createHidden(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartHidden, params); }
  createEmail(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartEmail, params); }
  createTel(params: IBaseFormElementParams): IFormElement { return this.createElement(SmartTel, params); }

  // eslint-disable-next-line class-methods-use-this
  public getSubmit(label: string, disabled: boolean = false) {
    return html`
      <md-filled-tonal-button ?disabled=${disabled} type="submit">${label}</md-filled-tonal-button>
    `
  }
}
import AbstractFormElementFactory from './AbstractFormElementFactory.js';
import AbstractSection from './base-class/AbstractSection.js';
import IFormElement from './IFormElement.js';


export default class SmartFormElementFactory extends AbstractFormElementFactory {
  createSection(name: string, label: string, info: string, dependsOn: IFormElement|undefined = undefined): AbstractSection {
    throw new Error('Method not implemented.');
  }

  createTextfield(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createTextarea(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createChoice(name: string, label: string, info: string, options: string[], choiceType: "single"|"multiple", isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createDate(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createNumber(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createPassword(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createRange(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createHidden(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createEmail(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createTel(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createSubmit(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }
}

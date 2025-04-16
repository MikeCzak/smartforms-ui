import AbstractFormElementFactory from './AbstractFormElementFactory.js';
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
import MaterialSubmit from './material/MaterialSubmit.js';
import MaterialTel from './material/MaterialTel.js';
import MaterialTextarea from './material/MaterialTextarea.js';
import MaterialTextfield from './material/MaterialTextfield.js';

export default class MaterialFormElementFactory extends AbstractFormElementFactory {
  createSection(name: string, label: string, info: string, dependsOn: IFormElement|undefined = undefined): AbstractSection {
    const section = new MaterialSection(this.getUniqueIdFromName(name), label, info, dependsOn);
    return section;
  }

  createTextfield(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const textfield = new MaterialTextfield(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return textfield;
  }

  createTextarea(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const textarea = new MaterialTextarea(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return textarea;
  }

  createChoice(name: string, label: string, info: string, options: string[], choiceType: "single"|"multiple", isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const choice = new MaterialChoice(this.getUniqueIdFromName(name), name, label, info, options, choiceType, isRequired, constraints, dependsOn);
    return choice;
  }

  createDate(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const date = new MaterialDate(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return date;
  }

  createNumber(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const number = new MaterialNumber(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return number;
  }

  createPassword(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const password = new MaterialPassword(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return password;
  }

  createRange(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const range = new MaterialRange(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return range;
  }

  createHidden(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const hidden = new MaterialHidden(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return hidden;
  }

  createEmail(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const email = new MaterialEmail(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return email;
  }

  createTel(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const tel = new MaterialTel(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return tel;
  }

  createSubmit(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn: IFormElement|undefined = undefined): IFormElement {
    const submit = new MaterialSubmit(this.getUniqueIdFromName(name), name, label, info, isRequired, constraints, dependsOn);
    return submit;
  }
}

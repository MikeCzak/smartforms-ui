/* eslint-disable lines-between-class-members */
import AbstractSection from './base-class/AbstractSection.js';
import IFormElement from './IFormElement.js';
import IFormElementFactory from './IFormElementFactory.js';

export default abstract class AbstractFormElementFactory implements IFormElementFactory
{
  protected _idMap: { [key: string]: number } = {};

  protected getUniqueIdFromName(name: string): string {
    if (this._idMap[name] === undefined) {
      this._idMap[name] = 1;
    } else {
      this._idMap[name] += 1;
    }

    return `${name}_${this._idMap[name]}`;
  }

  public factoryMap: { [key: string]: (element: any) => IFormElement | never } = {
        text: (element) => this.createTextfield(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        textarea: (element) => this.createTextarea(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        choice: (element) => {
          if (!element.options || !Array.isArray(element.options)) {
            throw new Error(`Invalid or missing options for choice element: ${JSON.stringify(element)}`);
          }
          return this.createChoice(element.name, element.label, element.info, element.options, element.choiceType, element.required, element.constraints, element.dependsOn);
        },
        date: (element) => this.createDate(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        number: (element) => this.createNumber(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        password: (element) => this.createPassword(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        range: (element) => this.createRange(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        hidden: (element) => this.createHidden(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        email: (element) => this.createEmail(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        tel: (element) => this.createTel(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
        submit: (element) => this.createSubmit(element.name, element.label, element.info, element.required, element.constraints, element.dependsOn),
      };

  abstract createSection(name: string, label: string, info: string, dependsOn?: IFormElement|undefined): AbstractSection
  abstract createTextfield(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createTextarea(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createChoice(name: string, label: string, info: string, options: string[], choiceType: "single"|"multiple", isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createDate(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createNumber(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createPassword(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createRange(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createHidden(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createEmail(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createTel(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  abstract createSubmit(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
}
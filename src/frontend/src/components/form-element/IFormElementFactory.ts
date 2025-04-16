import AbstractSection from "./base-class/AbstractSection.js";
import IFormElement from "./IFormElement.js";

export default interface IFormElementFactory {
  createSection(name: string, label: string, info: string, dependsOn?: IFormElement|undefined): AbstractSection
  createTextfield(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createTextarea(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createChoice(name: string, label: string, info: string, options: string[], choiceType: "single"|"multiple", isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createDate(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createNumber(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createPassword(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createRange(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createHidden(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createEmail(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createTel(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
  createSubmit(name: string, label: string, info: string, isRequired: boolean, constraints: {[key: string]: any}, dependsOn?: IFormElement|undefined): IFormElement
}
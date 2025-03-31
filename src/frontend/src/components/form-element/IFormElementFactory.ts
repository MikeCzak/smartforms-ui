import IFormElement from "./IFormElement.js";

export default interface IFormElementFactory {
  createSection(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createTextfield(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createTextarea(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createChoice(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createDate(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createNumber(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createPassword(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createRange(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createHidden(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createEmail(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createTel(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
  createSubmit(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement
}
import AbstractFormElementFactory from './AbstractFormElementFactory.js';
import IFormElement from './IFormElement.js';


export default class SmartFormElementFactory extends AbstractFormElementFactory {
  createSection(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createTextfield(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createTextarea(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createChoice(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createDate(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createNumber(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createPassword(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createRange(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createHidden(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createEmail(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createTel(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }

  createSubmit(id: string, label: string, isRequired: boolean, dependsOn: IFormElement|undefined = undefined): IFormElement {
    throw new Error('Method not implemented.');
  }
}

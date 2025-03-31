import IFormElement from './IFormElement.js';
import IFormElementFactory from './IFormElementFactory.js';

export default abstract class AbstractFormElementFactory
  implements IFormElementFactory
{
  protected _idMap: { [key: string]: number } = {};

  protected getUniqueIdFromId(id: string): string {
    if (this._idMap[id] === undefined) {
      this._idMap[id] = 1;
    } else {
      this._idMap[id] += 1;
    }

    return `${id}_${this._idMap[id]}`;
  }

  abstract createSection(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createTextfield(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createTextarea(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createChoice(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createDate(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createNumber(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createPassword(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createRange(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createHidden(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createEmail(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createTel(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

  abstract createSubmit(id: string, label: string, isRequired: boolean, dependsOn?: IFormElement|undefined): IFormElement

}

import AbstractSection from './base-class/AbstractSection.js';
import IBaseFormElementParams from './IBaseFormElementParams.js';
import IChoiceElementParams from './IChoiceElementParams.js';
import IFormElement from './IFormElement.js';

type Constructor<T> = new (...args: any[]) => T;

export default abstract class AbstractFormElementFactory
{
  protected _idMap: { [key: string]: number } = {};

  public factoryMap: { [key: string]: (params: IBaseFormElementParams) => IFormElement | never } = {
        text: (params) => this.createTextfield(params),
        textarea: (params) => this.createTextarea(params),
        choice: (params) => {
          const choiceParams = params as IChoiceElementParams;
          if (!choiceParams.options || !Array.isArray(choiceParams.options)) {
            throw new Error(`Invalid or missing options for choice element: ${JSON.stringify(params)}`);
          }
          return this.createChoice(params as IChoiceElementParams);
        },
        date: (params) => this.createDate(params),
        number: (params) => this.createNumber(params),
        password: (params) => this.createPassword(params),
        range: (params) => this.createRange(params),
        hidden: (params) => this.createHidden(params),
        email: (params) => this.createEmail(params),
        tel: (params) => this.createTel(params),
      };

  protected createElement<T extends IFormElement>(
    ElementClass: Constructor<T>,
    params: IBaseFormElementParams,
  ): T {
    // eslint-disable-next-line no-param-reassign
    params.id = this.getUniqueIdFromName(params.name);
    return new ElementClass(params);
  }

  public getUniqueIdFromName(name: string): string {
    if (this._idMap[name] === undefined) {
      this._idMap[name] = 1;
    } else {
      this._idMap[name] += 1;
    }

    return `${name}_${this._idMap[name]}`;
  }

  abstract createSection(name: string, label: string, info: string, dependsOn?: IFormElement|undefined): AbstractSection
  abstract createTextfield(params: IBaseFormElementParams): IFormElement
  abstract createTextarea(params: IBaseFormElementParams): IFormElement
  abstract createChoice(params: IChoiceElementParams): IFormElement
  abstract createDate(params: IBaseFormElementParams): IFormElement
  abstract createNumber(params: IBaseFormElementParams): IFormElement
  abstract createPassword(params: IBaseFormElementParams): IFormElement
  abstract createRange(params: IBaseFormElementParams): IFormElement
  abstract createHidden(params: IBaseFormElementParams): IFormElement
  abstract createEmail(params: IBaseFormElementParams): IFormElement
  abstract createTel(params: IBaseFormElementParams): IFormElement
  abstract getSubmit(label: string, disabled: boolean): any;
}
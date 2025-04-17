import IFormElement from './IFormElement.js';

export default interface IBaseFormElementParams {
  id: string;
  name: string;
  label: string;
  info?: string;
  required: boolean;
  constraints?: { [key: string]: any; };
  dependsOn?: IFormElement;
}

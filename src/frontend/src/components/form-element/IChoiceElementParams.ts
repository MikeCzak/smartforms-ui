import IBaseFormElementParams from './IBaseFormElementParams.js';

export default interface IChoiceElementParams extends IBaseFormElementParams {
  options: string[];
  choiceType: "single" | "multiple";
}

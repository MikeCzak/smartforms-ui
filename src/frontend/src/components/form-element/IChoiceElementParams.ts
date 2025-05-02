import IBaseFormElementParams from './IBaseFormElementParams.js';

export default interface IChoiceElementParams extends IBaseFormElementParams {
  options: string[] | { groupName: string; entries: string[] }[];
  choiceType: "single" | "multiple";
}

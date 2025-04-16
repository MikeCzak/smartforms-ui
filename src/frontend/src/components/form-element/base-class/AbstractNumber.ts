import { property } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";
import IFormElement from "../IFormElement.js";

export default abstract class AbstractNumber extends AbstractFormElement {

  @property({type: Number, attribute: true}) protected min: number|undefined = undefined;

  @property({type: Number, attribute: true}) protected max: number|undefined = undefined;

   constructor(
    id: string,
    name: string,
    label: string,
    info: string,
    isRequired: boolean = true,
    constraints: {[key: string]: any}|undefined = undefined,
    dependsOn: IFormElement|undefined = undefined
    ) {
      super(id, name, label, info, isRequired, constraints, dependsOn);
      if(constraints !== undefined) {
        this.min = constraints.min;
        this.max = constraints.max;
      }
    }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
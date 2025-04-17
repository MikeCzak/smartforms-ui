import { property } from "lit/decorators.js";
import AbstractFormElement from "../AbstractFormElement.js";
import IFormElement from "../IFormElement.js";
import IBaseFormElementParams from "../IBaseFormElementParams.js";

export default abstract class AbstractNumber extends AbstractFormElement {

  @property({type: Number, attribute: true}) protected min: number|undefined = undefined;

  @property({type: Number, attribute: true}) protected max: number|undefined = undefined;

   constructor(params: IBaseFormElementParams) {
      super(params);
      const { constraints } = params;
      if(constraints) {
        this.min = constraints.min;
        this.max = constraints.max;
      }
    }

  public validate(): boolean {
    throw new Error('Method not implemented.');
  }
}
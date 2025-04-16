import { property, customElement } from 'lit/decorators.js';
import '@material/web/all.js';
import AbstractBaseForm from './AbstractBaseForm.js';
import MaterialFormElementFactory from '../form-element/MaterialFormElementFactory.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';

@customElement('material-form')
export default class MaterialForm extends AbstractBaseForm {

  @property({type: String}) public formName: string = "material form";

  protected _formElementFactory: AbstractFormElementFactory;

  constructor() {
    super();
    this._formElementFactory = new MaterialFormElementFactory();
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this.rawForm) {
    //   console.log(el)
    // }
  }
}

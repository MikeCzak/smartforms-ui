import { html, css, HTMLTemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/progress/circular-progress.js';
import AbstractBaseForm from './AbstractBaseForm.js';

@customElement('material-form')
export default class MaterialForm extends AbstractBaseForm {

  @property({type: String}) public formName: string = "material form";

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this.rawForm) {
    //   console.log(el)
    // }
  }
}

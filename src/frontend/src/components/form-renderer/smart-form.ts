import { html, css, HTMLTemplateResult } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/progress/circular-progress.js';
import AbstractBaseForm from './AbstractBaseForm.js';

@customElement('smart-form')
export default class SmartForm extends AbstractBaseForm {

  public formName: string = "smart form";

  render() {
    return html`
      <md-circular-progress indeterminate></md-circular-progress>
      <div>smart form: ${JSON.stringify(this.formData)}</div>
    `;
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    // for (const el in this._formData) {
    //   console.log(el)
    // }
  }

}
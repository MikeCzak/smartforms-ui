/* eslint-disable prefer-destructuring */
/* eslint-disable wc/guard-super-call */
import { property, customElement, state } from 'lit/decorators.js';
import { css, html, HTMLTemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';
import '@material/web/progress/circular-progress.js';
import AbstractBaseForm from './AbstractBaseForm.js';
import AbstractFormElementFactory from '../form-element/AbstractFormElementFactory.js';
import SmartFormElementFactory from '../form-element/SmartFormElementFactory.js';
import InvalidFormNavigator from '../../util/InvalidFormNavigator.js';
import '../../util/smart-minimap.js';
import IFormElement from '../form-element/IFormElement.js';

@customElement('smart-form')
export default class SmartForm extends AbstractBaseForm {

  @property({type: String}) public formType: string = "smart_form";
  @state() _renderedElements?: IFormElement[];

  protected _formElementFactory: AbstractFormElementFactory;
  private _formNavigator?: InvalidFormNavigator;

  constructor() {
    super();
    this._formElementFactory = new SmartFormElementFactory();
  }

  public validateForm(): boolean {
    const invalidElements = [];
    for (const element of this._formElements) {
      if (!element.isValid()) {
       invalidElements.push(element);
      }
    }
    if (invalidElements.length === 0) {
      return true;
    }
    this._formNavigator = new InvalidFormNavigator(this._formElements);
    this._formNavigator.activate();
    this._formNavigator.focusFirst();
    this.dispatchEvent(new CustomEvent('validateAll', { bubbles: true, composed: true }));
    return false;
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this._formNavigator?.deactivate();
  }

  protected override postParsingHook(): void {
    const len = this._formElements.length;
    for(const [idx, el] of this._formElements.entries()) {
      el.next = this._formElements[(idx + 1) % len]
      el.prev = this._formElements[(idx - 1 + len) % len]
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected override getSubmissionOverlay() {
    return html`
      <div class="submitted-overlay">
        <md-elevated-card>
          submitting...
          <md-circular-progress indeterminate></md-circular-progress>
        </md-elevated-card>
      </div>
    `
  }

  static styles = [
    AbstractBaseForm.styles,
    css`
      :host {
        max-width: 600px;
      }
    `
   ]

   protected firstUpdated(): void {
    super.firstUpdated();
    this._renderedElements = this._formElements;
   }

   protected override customFormComponents(): HTMLTemplateResult {
    return html`
      ${when(this._renderedElements, () => html`<smart-minimap .formElements=${this._renderedElements}></smart-minimap>`)}
    `
   }
}
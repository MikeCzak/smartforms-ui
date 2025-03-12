import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@material/web/checkbox/checkbox.js';

@customElement('form-greeting')
export class Greeting extends LitElement {

  @property({type: Boolean, reflect: true})
  private _agreed: boolean = false;

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <md-checkbox aria-required="true" required @change=${this.handleCheck}></md-checkbox>
        <button ?hidden=${!this._agreed} type=submit>Get started!</button>
      </form>
    `
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.dispatchEvent(new SubmitEvent("submit", { bubbles: true }) )
  }

  private handleCheck(event: InputEvent) {
    this._agreed = (event.target as HTMLInputElement ).checked
  }
}
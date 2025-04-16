import { LitElement, html, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('my-icon')
export default class MyIcon extends LitElement {
  @property({ type: String }) icon: string = '';

  static styles = css`
    :host {
      display: inline-block;
      font-family: 'Material Icons', sans-serif;
      font-size: 24px;
      vertical-align: middle;
    }
    span {
      display: inline-block;
    }
  `;

  render() {
    return this.icon ? html`
      <span class="material-icons">${this.icon}</span>
    ` : nothing;
  }
}

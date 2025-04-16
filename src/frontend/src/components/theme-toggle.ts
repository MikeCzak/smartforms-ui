import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import { IconButton } from '@material/web/iconbutton/internal/icon-button.js';
import './my-icon.js';

@customElement('theme-toggle')
export default class ThemeToggle extends LitElement {

  @property()
  private mode: ('dark' | 'light') = 'light';

  render() {
      return html`
        <md-icon-button ?selected=${this.mode === 'dark'} @change=${this.handleChange} toggle id="theme-toggle">
          <my-icon icon="${this.mode}_mode"></my-icon>
        </md-icon-button>
      `;
    }

  private handleChange(e: Event) {
    const toggle = e.target as IconButton
    this.mode = toggle.selected ? 'dark' : 'light';
    this.setTheme(this.mode);
  }

  private setTheme(mode: 'light' | 'dark'): void {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
    this.mode = mode;
    localStorage.setItem('theme', mode);
  }

  private loadTheme(): void {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

    this.setTheme(savedTheme);
  }

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.loadTheme()
  }
}
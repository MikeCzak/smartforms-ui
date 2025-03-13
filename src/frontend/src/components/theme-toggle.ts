import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/web/iconbutton/icon-button.js';
import { IconButton } from '@material/web/iconbutton/internal/icon-button.js';
import { MdIcon } from './MdIcon.js';

@customElement('theme-toggle')
export default class ThemeToggle extends LitElement {

  @property()
  private mode: ('dark' | 'light') = 'light';

  private icon: MdIcon;

  constructor() {
    super();
    this.icon = new MdIcon();
    this.icon.icon = this.mode;
  }

  render() {
      return html`
        <md-icon-button ?selected=${this.mode === 'dark'} @change=${this.handleChange} toggle id="theme-toggle">
          ${this.icon}
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
    this.icon.icon = `${this.mode}_mode`
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
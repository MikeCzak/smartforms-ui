/* eslint-disable wc/guard-super-call */
import { css, CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import IFormElement from "../components/form-element/IFormElement.js";

@customElement('smart-minimap')
export default class SmartMiniMap extends LitElement {

  @property({type: Array, attribute: false}) formElements: IFormElement[] = [];
  @state() scrollPosition = 0;

  get mapScale(): number {
    return ((window.innerHeight / 100) * SmartMiniMap.mapHeight) / document.documentElement.scrollHeight;
  }

  get maskHeight(): number {
    return window.innerHeight * this.mapScale;
  }

  static mapHeight: number = 30;

  static styles?: CSSResultGroup = css`

    :host {
      position: fixed;
      top: 100px;
      right: 20px;

    }

    #minimap {
      position: relative;
      display: block;
      background-color: var(--smart-minimap-background, rgba(0, 0, 0, .5));
      border-radius: var(--smart-border-radius);
      width: 150px;
      height: ${SmartMiniMap.mapHeight}vh;
      padding: 6px;
      box-sizing: border-box;
    }

    .map-entry {
      position: absolute;
      display: block;
      left: 20%;
      right: 20%;
      border-radius: 2px;
      border: 2px solid #fff;
      box-sizing: border-box;

    }

    .map-entry.required {
      border-color: var(--required);
    }

    .map-entry.invalid {
      border-color: var(--error, #f00) !important;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      z-index: 999;
    }

    #mask-window {
      cursor: grab;
    }

    #mask-window.dragging {
      cursor: grabbing !important;
    }

    .map-viewport {
      position: absolute;
      left: -20px;
      top: 0;
      background-color: red;
      width: 10px;
    }

    .map-entry-submit {
      position: absolute;
      bottom: 2px;
      right: 20%;
      background-color: #ccc;
      height: 4px;
      width: 20px;
      border-radius: 2px;
    }

  `;

  render() {
    return html`
      <div id="minimap">
        ${this.formElements.map(el => html`
          <div id="${el.id}_minimap" class="map-entry${el.required ? ' required' : ''}" style="top: ${this.getMapPosition(el)}px; height: ${this.getElementHeightInMap(el)}px;"></div>
        `)}
        <div class="map-entry-submit"></div>
        <div class="overlay">
          <svg width="100%" height="100%">
            <defs>
              <mask id="mask">
                <rect width="100%" height="100%" fill="white"/>
                <rect x="0" y="${this.scrollPosition}" width="200" height="${this.maskHeight}" fill="black" pointer-events="all" style="cursor: grab;"/>
              </mask>
            </defs>
            <rect rx="10" ry="10" id="mosk" width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#mask)"/>
            <rect
            id="mask-window"
            x="0"
            y="${this.scrollPosition}"
            width="200"
            height="${this.maskHeight}"
            fill="transparent"
            stroke="black"
            stroke-width="1"
            pointer-events="all"
            style="cursor: grab;"
          />
          </svg>
        </div>
      </div>
    `
  }

  private getMapPosition(el: IFormElement): number {
    return el.yPos! * this.mapScale;
  }

  private getElementHeightInMap(el: IFormElement): number {
    return el.getBoundingClientRect().height * this.mapScale;
  }

  private scrollHandler = (e: Event) => {
    this.scrollPosition = window.scrollY * this.mapScale;
  }

private onValidate = (e: Event): void => {
  this.formElements.forEach((el) => {
    const miniMapElement = this.shadowRoot?.querySelector(`#${el.id}_minimap`);
    if (el.isValid()) {
      miniMapElement?.classList.remove('invalid');
    } else {
      miniMapElement?.classList.add('invalid');
    }
  });
}


  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    const svg = this.renderRoot.querySelector('svg')!;
    const maskWindow = this.renderRoot.querySelector('#mask-window') as SVGRectElement;

    let isDragging = false;
    let startY = 0;
    let offsetY = 0;
    const minimapHeight = SmartMiniMap.mapHeight * window.innerHeight / 100;
    const {maskHeight} = this;

    const updateScrollFromMinimapY = (y: number) => {
      y = Math.max(0, Math.min(minimapHeight - maskHeight, y));
      this.scrollPosition = y;
      const scrollY = y / this.mapScale;
      window.scrollTo({ top: scrollY });
      maskWindow.setAttribute('y', `${y}`);
    };

    svg.addEventListener('pointerdown', (e: PointerEvent) => {
      isDragging = true;

      const svgRect = svg.getBoundingClientRect();
      startY = e.clientY;

      const clickY = e.clientY - svgRect.top;
      const maskY = parseFloat(maskWindow.getAttribute('y') || "0");

      if (clickY < maskY || clickY > maskY + maskHeight) {
        updateScrollFromMinimapY(clickY - maskHeight / 2);
        offsetY = maskHeight / 2;
      } else {
        offsetY = startY - maskY - svgRect.top;
      }

      svg.setPointerCapture(e.pointerId);
      svg.style.cursor = "grabbing";
    });

    svg.addEventListener('pointermove', (e: PointerEvent) => {
      if (!isDragging) return;

      const svgRect = svg.getBoundingClientRect();
      const mouseY = e.clientY - svgRect.top;
      const newY = mouseY - offsetY;

      updateScrollFromMinimapY(newY);
    });

    svg.addEventListener('pointerup', (e: PointerEvent) => {
      isDragging = false;
      svg.releasePointerCapture(e.pointerId);
      svg.style.cursor = "grab";
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('validate', this.onValidate);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('validate', this.onValidate);
  }
}
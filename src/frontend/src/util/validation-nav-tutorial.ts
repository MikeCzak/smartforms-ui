import { CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import SmartInputs from "../styles/SmartInputs.js";
import ValidationNavDemo from "../styles/ValidationNavDemo.js";

@customElement('validation-nav-tutorial')
export default class ValidationNavTutorial extends LitElement {

  @state() _showHelp: boolean = true;
  @query('#demo-element-1') demoField1!: HTMLElement;
  @query('#demo-element-2') demoField2!: HTMLElement;
  @query('#demo-element-3') demoField3!: HTMLElement;
  @query('#up-key') upKey!: HTMLElement;
  @query('#down-key') downKey!: HTMLElement;
  @query('#esc-key') escKey!: HTMLElement;

  static styles?: CSSResultGroup =
  [
    SmartInputs.styles,
    ValidationNavDemo.styles
  ]

  render() {
    return html`
      <div id="help" class="${this._showHelp ? ' show' : ''}">
        <md-elevated-card class="content">
          <md-icon-button id="close-button" @click=${() => { this._showHelp = false; }} aria-label="close help">
            <my-icon icon="close"></my-icon>
          </md-icon-button>
          <h2>
            Revision Mode
            <div class="subheading">There were validation errors.</div>
          </h2>
          <p>
            You can navigate to the next/previous <span style="color: var(--error)">\u2716 invalid field</span> with the arrow keys <span class="key arrow up"></span><span class="key arrow down"></span>.
            <br>
            When you focus a field that would normally use the arrow keys for interaction (like a dropdown or a group of radio buttons), the input element will enter a
            navigation-locked state indicated by four little markers around it (see example below). While in locked state, you can use the arrow keys to interact with the field as expected.
            Press <span class="key esc"><span class="key-label">esc</span></span> when you're done with that field and the arrow keys will return to navigating between invalid fields.
          </p>
          <div class="lock-demo">
            <div id="form-elements">
              <div id="demo-element-1" class="demo-element">
                <div class="wrapper">
                  <div class="top">
                    <div class="left"></div>
                    <div class="label">Name</div>
                    <div class="right"></div>
                  </div>
                  <div class="demo-content">
                    <div class="text-field-dummy"></div>
                  </div>
                </div>
              </div>

              <div id="demo-element-2" class="demo-element">
                <div class="wrapper">
                  <div class="top">
                    <div class="left"></div>
                    <div class="label">No Name</div>
                    <div class="right"></div>
                  </div>
                  <div class="demo-content">
                    <div class="text-field-dummy"></div>
                  </div>
                </div>
              </div>

              <div id="demo-element-3" class="demo-element">
                <div class="wrapper">
                  <div class="top">
                    <div class="left"></div>
                    <div class="label">There is always a choice</div>
                    <div class="right"></div>
                  </div>
                  <div class="demo-content">
                    <div class="dropdown-field-dummy">
                      <div class="selection"></div>
                      <div class="arrow down"></div>
                    </div>
                    <div id="dropdown">
                      <div class="option" id="option1">Red Pill</div>
                      <div class="option" id="option2">Blue Pill</div>
                      <div class="option" id="option3">Both</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="buttons">
              <span id="up-key" class="key arrow up"></span>
              <span id="down-key" class="key arrow down"></span>
              <span id="esc-key" class="key esc"><span class="key-label">esc</span></span>
            </div>
          </div>
          <p style="align-self: flex-end">
            <md-filled-button @click=${() => { this._showHelp = false; }}>Got it!</md-filled-button>
          </p>
        </md-elevated-card>
      </div>
      <md-fab id="help-button" @click=${() => { this._showHelp = !this._showHelp; }}>
        <my-icon slot="icon" icon="help"></my-icon>
      </md-fab>
    `
  }

  private static attachMarkers(element: HTMLElement): void {
    const markerTL = document.createElement('div');
    const markerTR = document.createElement('div');
    const markerBR = document.createElement('div');
    const markerBL = document.createElement('div');
    markerTL.classList.add("tl");
    markerTR.classList.add("tr");
    markerBL.classList.add("bl");
    markerBR.classList.add("br");
    [markerTL, markerTR, markerBR, markerBL].forEach(el => {
      el.classList.add("lock-state-marker");
      element.appendChild(el);
    });
  }

  private highlightLockState(element: HTMLElement): void {
      element.querySelectorAll('.lock-state-marker')?.forEach(marker => {
        marker.classList.remove("release");
        marker.classList.add("show");
      })
    }

  private releaseLockState(element: HTMLElement) {
    const markers = element.querySelectorAll('.lock-state-marker');
    markers?.forEach(marker => {
      marker.classList.add("release");
      setTimeout(() => {
        marker.classList.remove("show");
      }, 500);
    });
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    ValidationNavTutorial.attachMarkers(this.demoField1);
    ValidationNavTutorial.attachMarkers(this.demoField2);
    ValidationNavTutorial.attachMarkers(this.demoField3);
    this.startAnimation();
  }

  private startAnimation(): void {
    this.highlightLockState(this.demoField1!);
    this.pressUp();
    setTimeout(() => {this.pressUp();}, 600);
  }

  private pressUp(): void {
    this.upKey.classList.add('animated');
    setTimeout(() => {
      this.upKey.classList.remove('animated');
    }, 500);
  }
}
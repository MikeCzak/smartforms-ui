/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import { CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, query, queryAll, state } from "lit/decorators.js";
import SmartInputs from "../styles/SmartInputs.js";
import ValidationNavDemo from "../styles/ValidationNavDemo.js";

@customElement('validation-nav-tutorial')
export default class ValidationNavTutorial extends LitElement {

  @state() _showHelp: boolean = false;
  @query('#demo-element-1') demoField1!: HTMLElement;
  @query('#demo-element-2') demoField2!: HTMLElement;
  @query('#demo-element-3') demoField3!: HTMLElement;
  @queryAll('.demo-element') demoElements!: HTMLElement[];
  @query('#up-key') upKey!: HTMLElement;
  @query('#down-key') downKey!: HTMLElement;
  @query('#esc-key') escKey!: HTMLElement;

  private animationAbortController?: AbortController;


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
            navigation-locked state indicated by four little markers around it (see demo below). While in locked state, you can use the arrow keys to interact with the field as expected.
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
      <md-fab id="help-button" @click=${this.showHelp}>
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
    this.showHelp();
  }

  private showHelp() {
    if(!this._showHelp) {
      this._showHelp = true;
      this.startAnimation();
    }
  }

  private async startAnimation(): Promise<void> {
    this.animationAbortController?.abort();
    this.animationAbortController = new AbortController();
    const {signal} = this.animationAbortController;

    this.resetAnimation();

    try {
      while (this._showHelp) {
        this.demoFocus(this.demoField1!);
        await this.animateCSS(this.downKey, 'animated', signal, 1000, 0);
        this.demoFocus(this.demoField2!);

        await this.animateCSS(this.upKey, 'animated', signal, 700, 0);
        this.demoFocus(this.demoField1!);

        await this.animateCSS(this.downKey, 'animated', signal, 300, 0);
        this.demoFocus(this.demoField2!);

        await this.animateCSS(this.downKey, 'animated', signal, 700, 50);
        this.demoFocus(this.demoField3!);
        this.highlightLockState(this.demoField3!);
        this.selectDropdownOption(1);

        await this.animateCSS(this.downKey, 'animated', signal, 1000, 0);
        this.selectDropdownOption(2);

        await this.animateCSS(this.downKey, 'animated', signal, 200, 0);
        this.selectDropdownOption(3);

        await this.animateCSS(this.upKey, 'animated', signal, 200, 0);
        this.selectDropdownOption(2);

        await this.animateCSS(this.downKey, 'animated', signal, 400, 0);
        this.selectDropdownOption(3);

        await this.animateCSS(this.escKey, 'animated', signal, 700, 0);
        (this.demoField3.querySelector('#dropdown')! as HTMLElement).style.visibility = 'hidden';
        this.selectDropdownOption(0);
        this.releaseLockState(this.demoField3);

        await this.animateCSS(this.upKey, 'animated', signal, 1000, 0);
        this.demoFocus(this.demoField2!);

        await this.animateCSS(this.upKey, 'animated', signal, 300, 0);
        this.demoFocus(this.demoField1!);


      }
    } catch (err) {
      if ((err as DOMException).name !== 'AbortError') {
        console.error('Unexpected animation error:', err);
      }
    }
  }

  private resetAnimation() {
    this.selectDropdownOption(0);
    this.demoElements.forEach(element => {
      const markers = element.querySelectorAll('.lock-state-marker');
      markers?.forEach(marker => {
        marker.classList.remove("show");
        (marker as HTMLElement).style.opacity = '0';
      });
    });
  }

  private demoFocus(element: HTMLElement): void {
    this.demoElements.forEach(el => {
      el.classList.remove('focused');
      if(element !== this.demoField3) {
        (this.demoField3.querySelector('#dropdown')! as HTMLElement).style.visibility = 'hidden';
      }
    })
    element.classList.add('focused');
    if(element === this.demoField3) {
      (element.querySelector('#dropdown')! as HTMLElement).style.visibility = 'visible';
    }
  }

  private selectDropdownOption(option: number): void {
    this.demoField3.querySelectorAll('.option').forEach(o => {
      if(o.id === `option${option}`) {
        o.classList.add('selected');
      } else {
        o.classList.remove('selected');
      }
    })
  }

  private async animateCSS(
    element: HTMLElement,
    animationClass: string,
    signal?: AbortSignal,
    preDelayMs = 0,
    postDelayMs = 0
  ): Promise<void> {
    const delay = (ms: number): Promise<void> =>
       new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);
        signal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new DOMException('Aborted', 'AbortError'));
        }, { once: true });
      });

    if (preDelayMs > 0) {
      await delay(preDelayMs);
    }

    await new Promise<void>((resolve, reject) => {
      const handleAbort = () => {
        element.classList.remove(animationClass);
        element.removeEventListener('animationend', handleAnimationEnd);
        reject(new DOMException('Aborted', 'AbortError'));
      };

      const handleAnimationEnd = () => {
        element.classList.remove(animationClass);
        element.removeEventListener('animationend', handleAnimationEnd);
        signal?.removeEventListener('abort', handleAbort);
        resolve();
      };

      signal?.addEventListener('abort', handleAbort, { once: true });
      element.addEventListener('animationend', handleAnimationEnd, { once: true });
      element.classList.add(animationClass);
    });

    if (postDelayMs > 0) {
      await delay(postDelayMs);
    }
  }


}
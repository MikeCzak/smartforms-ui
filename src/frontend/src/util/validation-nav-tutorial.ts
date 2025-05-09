import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import SmartInputs from "../styles/SmartInputs.js";
import SmartTextfield from "../components/form-element/smart/SmartTextfield.js";
import SmartChoice from "../components/form-element/smart/SmartChoice.js";

@customElement('validation-nav-tutorial')
export default class ValidationNavTutorial extends LitElement {

  @state() _showHelp: boolean = true;

  static styles?: CSSResultGroup =
  [SmartInputs.styles,
  css`
    #help-button {
      position: fixed;
      bottom: 126px;
      right: 16px;
      z-index: 100;
      transform: translateX(200px);
      animation: slide-from-right .3s ease-out forwards;
    }

    #help {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color .2s linear, visibility 0s linear .2s;

      &.show {
        visibility: visible;
        background-color: rgba(0, 0, 0, .7);
        transition: background-color .2s linear, visibility 0s linear;
      }

      &.show .content {
        margin-top: 0;
        margin-left: 0;
        transform: scale(1);
      }

      & .content {
        position: relative;
        padding: 32px;
        box-shadow: 4px 4px 24px;
        width: 500px;
        max-width: 98vw;
        margin-top: 70vh;
        margin-left: 90vw;
        transform: scale(.1);
        transition: all .2s ease-in;
        line-height: 1.75;

        & h2 {
          font-size: 2.5em;
          margin: 0;
          & .subheading {
            color: var(--error);
            font-size: 1.3rem;
            font-weight: normal;
            margin: -8px 0 12px 0;
          }
        }
      }

      & #close-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    @keyframes slide-from-right {
      to {transform: translateX(0);}
    }

    .key {
      display: inline-block;
      position: relative;
      padding: 0;
      margin: 0 2px;
      margin-bottom: -8px;
      border-radius: 4px;
      background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
      box-shadow: inset -3px -3px 1px #888, inset 3px 3px 1px #fff, 1px 1px 2px rgba(0, 0, 0, 0.2);
      font-family: monospace;
      font-size: 0.9rem;
      color: #333;
      text-align: center;

      &.esc {
        width: 35px;
        height: 25px;
        & .key-label {
          bottom: 6px;
          left: 6px;
        }
      }

      &.arrow {
        position: relative;
        width: 25px;
        height: 25px;
        &:after {
          position: absolute;
          content: '';
          top: 50%;
          left: 50%;
          font-size: 18px;
          width: 0;
          height: 0;
          border: 4.5px solid transparent;
        }
        &.up:after {
          border-bottom-color: #333;
          transform: translate(-5px, -7.5px);
        }
        &.down:after {
          border-top-color: #333;
          transform: translate(-5px, -3px);
        }
      }
    }

    .key-label {
      position: absolute;
      font-weight: bold;
      font-size: 10px;
    }

    .lock-state {
      position: relative;
    }

    .lock-state-marker {
      --marker-distance-n: -5px;
      --marker-distance-p: 5px;
      position: absolute;
      border-color: var(--error);
      border-width: 2px;
      width: 10px;
      height: 10px;
      opacity: 1;
    }
  `]

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
          </p>
          <p>
          When you focus a field that would normally use the arrow keys <span class="key arrow up"></span><span class="key arrow down"></span>
          for interaction (like a dropdown or a group of radio buttons), the input element will enter a
          navigation-locked state indicated by four little markers around it. While in locked state, you can use <span class="key arrow up"></span><span class="key arrow down"></span> to interact with the field as expected.
          Press <span class="key esc"><span class="key-label">esc</span></span> when you're done, and the arrow keys <span class="key arrow up"></span><span class="key arrow down"></span> will return to navigating between invalid fields.
        </p>
        <div class="lock-demo">
          <span class="lock-state on">
            <span class="lock-state-marker tl"></span>
            <span class="lock-state-marker tr"></span>
            <span class="lock-state-marker br"></span>
            <span class="lock-state-marker bl"></span>
          </span>
          <span class="lock-state off">
            <span class="lock-state-marker tl"></span>
            <span class="lock-state-marker tr"></span>
            <span class="lock-state-marker br"></span>
            <span class="lock-state-marker bl"></span>
          </span>
          ${(() => {
            const textField = new SmartChoice({id: "demo-textfield", label: "Name", required: false, name: "demo-textfield", options: ["Yes", "No"], choiceType: "single"})
            return html`${textField}`
          })()}
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
}
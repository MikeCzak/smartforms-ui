import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractTextfield from "../base-class/AbstractTextfield.js";

@customElement('smart-textfield')
export default class SmartTextfield extends AbstractTextfield {

  static styles = css`
  .left, .right {
    border-top: 4px solid yellow;
    height: 12px;
  }

  .left {
    border-top-left-radius: 12px;
    margin-left: -3px;
      flex: 0 1 10%;
  }
  .right{
    border-top-right-radius: 12px;
    margin-right: -3px;
      flex: 0 1 100%;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .label {
    margin-top: -8px;
    padding: 0 6px;
    font-size: 20px;
  }

  .root {
    width: 300px;
    height: 250px;
    border:4px solid yellow;
    border-top: transparent;
    border-radius: 12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
  }
`

  render(): HTMLTemplateResult {
    return html`
    <div class="wrapper">
      <div class="top">
        <div class="left"></div>
        <label for="${this.id}" class="label">${this.label}</label>
        <div class="right"></div>
      </div>

      <div class="content">
        <input type="${this.inputType}" id="${this.id}" name="${this.id}" >
        <small>you know</small>
      </div>
    </div>
    `
  }
}
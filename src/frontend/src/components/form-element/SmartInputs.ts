import { css } from "lit";

export default class SmartInputs {

  static styles = css`

  :host {
    --smart-border-radius: 12px;
  }

  .left, .right {
    border-top: 2px solid var(--md-sys-color-outline);
    height: 12px;
  }

  .left {
    border-top-left-radius: var(--smart-border-radius);
    margin-left: -3px;
      flex: 0 1 5%;
  }
  .right {
    border-top-right-radius: var(--smart-border-radius);
    margin-right: -3px;
      flex: 0 1 100%;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .label {
    position: relative;
    margin-top: -8px;
    padding: 0 6px;
    font-size: 16px;
    white-space: nowrap;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--md-sys-color-outline);
    border-top: transparent;
    border-radius: var(--smart-border-radius);
    background-color: transparent;
  }

  .wrapper.required .left, .wrapper.required  .right {
    border-top: 2px solid var(--required);
    height: 12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
  input {
    color: var(--md-sys-color-on-surface);
    font-family: monospace;
    display: block;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    padding: 6px 12px 12px 12px;
    background-color: transparent;
  }

  small {
    display: block;
    padding: 6px 12px;
  }

  .wrapper:has(.required) {
    border: 2px solid var(--required);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--required-rgb), .4) 0%, transparent max(100px, 30%));
  }

  label.required:after {
    content: ' *';
    color: var(--required);
  }
  `
}
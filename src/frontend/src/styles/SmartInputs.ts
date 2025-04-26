import { css } from "lit";

export default class SmartInputs {

  static styles = css`

  :host {
    --smart-border-radius: 12px;
    --success: rgb(35, 144, 35);
    --success-rgb: 35, 144, 35;
    --error: rgb(200, 0, 20);
    --error-rgb: 200, 0, 20;
    position: relative;
    width: 100%;
  }

  .left, .right {
    border-top: 2px solid var(--md-sys-color-outline);
    height: 12px;
  }

  .left {
    border-top-left-radius: var(--smart-border-radius);
    margin-left: -1px;
      flex: 0 1 24px;
  }
  .right {
    border-top-right-radius: var(--smart-border-radius);
    margin-right: -1px;
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
    background-color: var(--smart-container-background-color);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--md-sys-color-outline);
    border-top: transparent;
    border-radius: var(--smart-border-radius);
    background-color: transparent;
  }

  .wrapper:focus-within {
    outline: 2px solid var(--md-sys-color-outline);
  }

  .wrapper.required:focus-within {
    outline: 2px solid var(--required);
  }

  .wrapper.invalid:focus-within {
    outline: 2px solid var(--error) !important;
  }

  .wrapper.required.valid:focus-within {
    outline: 2px solid var(--success);
  }

  .wrapper:has(.required) {
    border: 2px solid var(--required);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--required-rgb), .4) 0%, transparent max(100px, 30%));
  }

  .wrapper.required .left, .wrapper.required  .right {
    border-top: 2px solid var(--required);
    height: 12px;
  }

  .wrapper.required.valid .left, .wrapper.required.valid  .right {
    border-top: 2px solid var(--success);
  }

  .wrapper.required.valid {
    border: 2px solid var(--success);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--success-rgb), .4) 0%, transparent max(100px, 30%));
  }

  .wrapper.required.invalid .left, .wrapper.required.invalid  .right {
    border-top: 2px solid var(--error);
  }

  .wrapper.required.invalid {
    border: 2px solid var(--error);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--error-rgb), .4) 0%, transparent max(100px, 30%));
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

  label.required:after {
    content: ' *';
    color: var(--required);
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;

    & small {
      padding-bottom: 0;
    }

    & .counter {
      flex: 0 0 0;
    }
  }

  .real-time-validation {
    position: absolute;
    display: none;
    bottom: calc(100% + 12px);
    right: 12px;
    font-size: 14px;

    & md-elevated-card {
      padding: 12px 24px;
      border-bottom-right-radius: 0;

      & ul {
        padding: 0;
        margin: 0;
      }
    }
  }

  .real-time-validation.show {
    display: block;
  }

  .error-text {
    color: var(--error);
    padding: 4px 12px 0 12px;
    height: 16px;
  }
  `
}
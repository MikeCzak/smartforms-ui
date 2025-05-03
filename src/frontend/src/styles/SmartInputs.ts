import { css } from "lit";

export default class SmartInputs {

  static styles = css`

  :host {
    position: relative;
    max-width: 100%;
  }

  .left, .right {
    border-top: var(--smart-border-width) solid var(--md-sys-color-outline);
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
    border: var(--smart-border-width) solid var(--md-sys-color-outline);
    border-top: transparent;
    border-radius: var(--smart-border-radius);
    background-color: transparent;
  }

  .wrapper:focus-within {
    outline: var(--smart-outline-width) solid var(--md-sys-color-outline);
    & .label {
      font-weight: bold;
    }
  }

  .wrapper.required:focus-within {
    outline: var(--smart-outline-width) solid var(--required);
  }

  .wrapper.invalid:focus-within {
    outline: var(--smart-outline-width) solid var(--error) !important;
  }

  .wrapper.required.valid:focus-within {
    outline: var(--smart-outline-width) solid var(--success);
  }

  .wrapper:has(.required) {
    border: var(--smart-border-width) solid var(--required);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--required-rgb), .4) 0%, transparent 70px);
  }

  .wrapper.required .left, .wrapper.required  .right {
    border-top: var(--smart-border-width) solid var(--required);
    height: 12px;
  }

  .wrapper.required.valid .left, .wrapper.required.valid  .right {
    border-top: var(--smart-border-width) solid var(--success);
  }

  .wrapper.required.valid {
    border: var(--smart-border-width) solid var(--success);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--success-rgb), .4) 0%, transparent 70px);
  }

  .wrapper.required.invalid .left, .wrapper.required.invalid  .right {
    border-top: var(--smart-border-width) solid var(--error);
  }

  .wrapper.required.invalid {
    border: var(--smart-border-width) solid var(--error);
    border-top: transparent;
    background: linear-gradient(340deg, rgba(var(--error-rgb), .4) 0%, transparent 70px);
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 6px 12px 12px 12px;
    box-sizing: border-box;
  }
  input {
    color: var(--md-sys-color-on-surface);
    font-family: monospace;
    display: block;
    width: var(--maxLength, 100%);
    max-width: 100%;
    outline: none;
    border: none;
    border-bottom: var(--max-length-bottom-border, none);
    font-size: 16px;
    padding: 0;
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

  .info-text {
    font-size: smaller;
    padding: 4px 12px 0 12px;
  }

  .constraint-info {
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
    font-size: smaller;

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
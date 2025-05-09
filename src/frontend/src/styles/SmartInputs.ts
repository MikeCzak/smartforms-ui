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
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    border: var(--smart-border-width) solid var(--md-sys-color-outline);
    border-top: transparent;
    border-radius: var(--smart-border-radius);
    background-color: transparent;
    margin: 1px;
  }

  .wrapper:focus-within {
    border-width: var(--smart-border-width-focus);
    margin: 0;
    & .left, & .right {
      border-width: var(--smart-border-width-focus);
    }
    & .label {
      font-weight: bold;
      margin-left: -1px;
    }
  }

  .wrapper.required {
    border-color: var(--required);
    background: linear-gradient(340deg, rgba(var(--required-rgb), .4) 0%, transparent 70px);
    & .left, & .right {
      border-color: var(--required);
    }
  }

  .wrapper.invalid {
    border-color: var(--error);
    background: linear-gradient(340deg, rgba(var(--error-rgb), .4) 0%, transparent 70px);
    & .left, & .right {
      border-color: var(--error);
    }
  }

  .wrapper.required.valid {
    border-color: var(--success);
    background: linear-gradient(340deg, rgba(var(--success-rgb), .4) 0%, transparent 70px);
    & .left, & .right {
      border-color: var(--success);
    }
  }

  .wrapper.invalid .label {
    color: var(--error);
  }

  .wrapper.invalid:before {
    content:'\\2716';
        color: var(--error);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -50px;
        font-size: 16px;
        color: var(--error);
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

  .lock-state-marker {
    position: absolute;
    border-color: var(--error);
    border-width: 2px;
    width: 20px;
    height: 20px;
    opacity: 0;
  }

  @keyframes lock-tl {
    from {opacity: 0; transform: translate(var(--marker-animation-start-distance-n), var(--marker-animation-start-distance-n))}
    to {opacity: 1; transform: translate(0, 0)}
  }

  @keyframes lock-tr {
    from {opacity: 0; transform: translate(var(--marker-animation-start-distance-p), var(--marker-animation-start-distance-n))}
    to {opacity: 1; transform: translate(0, 0)}
  }

  @keyframes lock-bl {
    from {opacity: 0; transform: translate(var(--marker-animation-start-distance-n), var(--marker-animation-start-distance-p))}
    to {opacity: 1; transform: translate(0, 0)}
  }

  @keyframes lock-br {
    from {opacity: 0; transform: translate(var(--marker-animation-start-distance-p), var(--marker-animation-start-distance-p))}
    to {opacity: 1; transform: translate(0, 0)}
  }

  @keyframes release-tl {
    from {opacity: 1; transform: translate(0, 0)}
    to {opacity: 0; transform: translate(var(--marker-animation-end-distance-n), var(--marker-animation-end-distance-n))}
  }

  @keyframes release-tr {
    from {opacity: 1; transform: translate(0, 0)}
    to {opacity: 0; transform: translate(var(--marker-animation-end-distance-p), var(--marker-animation-end-distance-n))}
  }

  @keyframes release-bl {
    from {opacity: 1; transform: translate(0, 0)}
    to {opacity: 0; transform: translate(var(--marker-animation-end-distance-n), var(--marker-animation-end-distance-p))}
  }

  @keyframes release-br {
    from {opacity: 1; transform: translate(0, 0)}
    to {opacity: 0; transform: translate(var(--marker-animation-end-distance-p), var(--marker-animation-end-distance-p))}
  }

  .lock-state-marker.tl {
    top: var(--marker-distance-n);
    left: var(--marker-distance-n);
    border-top-style: solid;
    border-left-style: solid;
    &.show {
      animation: lock-tl var(--lock-state-animation-duration) ease-in forwards;
      animation-delay: var(--lock-state-animation-delay);
    }
    &.release {
      animation: release-tl var(--release-state-animation-duration) ease-out forwards;
      animation-delay: 0;
    }
  }

  .lock-state-marker.tr {
    top: var(--marker-distance-n);
    right: var(--marker-distance-n);
    border-top-style: solid;
    border-right-style: solid;
    &.show {
      animation: lock-tr var(--lock-state-animation-duration) ease-in forwards;
      animation-delay: var(--lock-state-animation-delay);
    }
    &.release {
      animation: release-tr var(--release-state-animation-duration) ease-out forwards;
      animation-delay: 0;
    }
  }

  .lock-state-marker.br {
    bottom: var(--marker-distance-n);
    right: var(--marker-distance-n);
    border-bottom-style: solid;
    border-right-style: solid;
    &.show {
      animation: lock-br var(--lock-state-animation-duration) ease-in forwards;
      animation-delay: var(--lock-state-animation-delay);
    }
    &.release {
      animation: release-br var(--release-state-animation-duration) ease-out forwards;
      animation-delay: 0;
    }
  }

  .lock-state-marker.bl {
    bottom: var(--marker-distance-n);
    left: var(--marker-distance-n);
    border-bottom-style: solid;
    border-left-style: solid;
    &.show {
      animation: lock-bl var(--lock-state-animation-duration) ease-in forwards;
      animation-delay: var(--lock-state-animation-delay);
    }
    &.release {
      animation: release-bl var(--release-state-animation-duration) ease-out forwards;
      animation-delay: 0;
    }
  }
  `
}
import { css } from "lit";

export default class ValidationNavDemo {

  static styles = css`
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
    border-radius: 4px;
    background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
    box-shadow: inset -3px -3px 1px #aaa, inset 3px 3px 1px #fff, 1px 1px 3px rgba(0, 0, 0, 0.4);
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

    &.animated {
      animation: key-press .5s ease-in-out forwards;
    }
  }

  p .key {
    margin-bottom: -8px;
  }

  @keyframes key-press {

    0%, 40% {
      box-shadow: inset -3px -3px 1px #aaa, inset 3px 3px 1px #fff, 2px 2px 3px rgba(0, 0, 0, 0.3);
      background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
      transform: translateY(0);
    }
    50%, 90% {
      box-shadow: inset -2px -2px 1px #a2a2a2, inset 3px 3px 1px #fff, 1px 1px 0 rgba(0, 0, 0, 0.1);
      background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
      transform: translateY(1px);
    }
    100% {
      box-shadow: inset -3px -3px 1px #aaa, inset 3px 3px 1px #fff, 2px 2px 3px rgba(0, 0, 0, 0.3);
      background: linear-gradient(to bottom, #f3f3f3, #dcdcdc);
      transform: translateY(0);
    }
  }

  .arrow {
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

  .key-label {
    position: absolute;
    font-weight: bold;
    font-size: 10px;
  }

  .lock-state {
    position: relative;
  }

  .lock-state-marker {
    --marker-distance-n: -7px;
    --marker-distance-p: 7px;
    position: absolute;
    border-color: var(--error);
    border-width: 2px;
    width: 10px;
    height: 10px;
    opacity: 0;
  }

  .lock-demo {
    --marker-animation-start-distance-n: -50px;
    --marker-animation-start-distance-p: 50px;
    --marker-animation-end-distance-n: -30px;
    --marker-animation-end-distance-p: 30px;

    margin-top: 50px;
    width: 100%;
    box-sizing: border-box;
    display: flex;


    & #form-elements {

      width: 66%;
      user-select: none;

      & .demo-element {
      position: relative;
      margin-bottom: 16px;

        & .wrapper.focused {
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

        & .label {
          font-size: 8px;
          margin-top: -6px;
        }
        & .text-field-dummy {
          display: block;
          width: 120px;
          height: 3px;
          border-bottom: 1px dashed grey;
          margin: 4px;
        }

        & .dropdown-field-dummy {
          position: relative;
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: flex-end;
          & .selection {
            flex: 1 0 100%;
          }
          & .arrow {

          }
        }
        & #dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            margin-top: 2px;
            padding: 4px;
            box-sizing: border-box;
            border-radius: var(--smart-border-radius);
            border: 1px solid var(--md-sys-color-outline);
            background-color: #ddd;
            visibility: hidden;

            & .option {
              font-size: 10px;
              padding-inline: 6px;
            }
          }
        & .demo-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          padding: 3px 6px 6px 6px;
          box-sizing: border-box;
          padding-right: 20px;
        }
      }
    }

    & #buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 33%;
    }
  }
`
}
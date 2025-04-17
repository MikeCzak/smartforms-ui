import { HTMLTemplateResult, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import AbstractSection from "../base-class/AbstractSection.js";

@customElement('material-section')
export default class MaterialSection extends AbstractSection {

  static styles = css`
    .choice {
      margin-bottom: 14px;
    }
    :host {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
    }

    `;



}
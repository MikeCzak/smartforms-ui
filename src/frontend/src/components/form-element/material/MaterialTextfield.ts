import AbstractTextfield from "../base-class/AbstractTextfield.js";

export default class MaterialTextfield extends AbstractTextfield {

  getHTMLResult(): HTMLElement {
    const container = document.createElement("div");
    const input = document.createElement("input");
    input.setAttribute("id", this._id);
    if(this._required) {
      input.setAttribute("required", "required");
    }
    const label = document.createElement("label");
    label.setAttribute("for", this._id)
    container.appendChild(input);
    container.appendChild(label);

    return container;
  }

}
import IFormElement from "../components/form-element/IFormElement.js";

export default interface INavigator {
  handleElementFocus(e: FocusEvent): void
  resumeNavigation(releasingElement: IFormElement): void
}
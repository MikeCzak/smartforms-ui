import IFormElement from "../components/form-element/IFormElement.js";

export default interface INavigator {
  resumeNavigation(releasingElement: IFormElement): void
}
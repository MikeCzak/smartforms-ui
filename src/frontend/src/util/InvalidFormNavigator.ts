import IFormElement from "../components/form-element/IFormElement.js";
import INavigator from "./INavigator.js";

export default class InvalidFormNavigator implements INavigator {

  private _invalidItems: IFormElement[];
  private _numItems: number;
  private _first: IFormElement;
  private _current: number = 0;
  private _paused = false;
  private _released: boolean = false;

  constructor(invalidItems: IFormElement[]) {
    this._invalidItems = invalidItems;
    this._numItems = invalidItems.length;
    [this._first] = this._invalidItems;
  }

  public activate(): void {
    document.addEventListener('keydown', this.handleKeydown);
  }

  public deactivate(): void {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      return;
    }

    if (this._paused) {return};


    if (e.key === 'ArrowDown') {
      this.focusNext();
    } else if (e.key === 'ArrowUp') {
      this.focusPrev();
    }

    this._released = false;
    e.preventDefault();
  }

  public focusFirst(): void {
    this._first.focus({ preventScroll: true });
    this._current = 0;
    if (this._invalidItems[this._current].willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusNext(): void {
    this._invalidItems[this._current].blur();
    this._current = (this._current + 1 + this._numItems) % this._numItems;
    this._invalidItems[this._current].focus({ preventScroll: true})
    if (this._invalidItems[this._current].willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusPrev(): void {
    this._invalidItems[this._current].blur();
    this._current = (this._current - 1 + this._numItems) % this._numItems;
    this._invalidItems[this._current].focus({ preventScroll: true})
    if (this._invalidItems[this._current].willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  public resumeNavigation(releasingElement: IFormElement) {
    this._paused = false;
    releasingElement.setNavigator(null);
  }

  private pauseNavigation() {
    this._paused = true;
    this._invalidItems[this._current].setNavigator(this);
  }

}
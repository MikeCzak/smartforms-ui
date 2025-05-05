import IFormElement from "../components/form-element/IFormElement.js";
import INavigator from "./INavigator.js";

export default class InvalidFormNavigator implements INavigator {

  private _invalidItems: IFormElement[];
  private _numItems: number;
  private _first: IFormElement;
  private _current: number = 0;
  private _paused = false;

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
    this._invalidItems[this._current].focus({ preventScroll: false})
    if (this._invalidItems[this._current].willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusPrev(): void {
    this._invalidItems[this._current].blur();
    this._current = (this._current - 1 + this._numItems) % this._numItems;
    this._invalidItems[this._current].focus({ preventScroll: false})
    if (this._invalidItems[this._current].willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  public resumeNavigation(releasingElement: IFormElement) {
    this._paused = false;
    releasingElement.setNavigator(null);
    this.releaseLockState(releasingElement);
  }

  private pauseNavigation() {
    this._paused = true;
    this._invalidItems[this._current].setNavigator(this);
    this.highlightLockState(this._invalidItems[this._current]);
  }

  private highlightLockState(element: IFormElement): void {
    const markerTL = document.createElement('div');
    const markerTR = document.createElement('div');
    const markerBR = document.createElement('div');
    const markerBL = document.createElement('div');
    markerTL.classList.add("tl");
    markerTR.classList.add("tr");
    markerBL.classList.add("bl");
    markerBR.classList.add("br");
    [markerTL, markerTR, markerBR, markerBL].forEach(el => {
      el.classList.add("lock-state-marker");
      element.shadowRoot?.appendChild(el);
    });
  }

  private releaseLockState(element: IFormElement) { // TODO: fix this
    const markers = element.shadowRoot?.querySelectorAll('.lock-state-marker');
    markers?.forEach(marker => {
      marker.classList.add("release");
      setTimeout(() => {
        element.shadowRoot?.removeChild(marker)
      }, 500);
    });
  }

}
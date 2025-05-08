import IFormElement from "../components/form-element/IFormElement.js";
import INavigator from "./INavigator.js";

export default class InvalidFormNavigator implements INavigator {

  private _elements: IFormElement[];
  private _first: IFormElement;
  private _current: IFormElement;
  private _paused: boolean = false;
  private _preventScroll: boolean = true;

  constructor(elements: IFormElement[]) {
    this._elements = elements;
    [this._first] = this._elements;
    this._current = this._first;
    this._elements.forEach(el => {
      el.setNavigator(this);
      el.addEventListener('focus', this.handleElementFocus.bind(this), true);
      this.attachMarkers(el);
      // TODO: nav-blocking elements still buggy in firefox
    });
  }

  public activate(): void {
    document.addEventListener('keydown', this.handleKeydown, true);
  }

  public deactivate(): void {
    document.removeEventListener('keydown', this.handleKeydown, true);
  }

  private handleKeydown = (e: KeyboardEvent): void => {

    if (this._paused) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focusNext();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focusPrev();
    }
  }

  public focusFirst(): void {
    let current = this._first;
    current = this._first;
    while (current.isValid()) { current = current.next };
    current.focus({ preventScroll: this._preventScroll });
    if (current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusNext(): void {
    let current = this._current;
    current.blur();
    do { current = current.next } while (current.isValid());
    current.focus({ preventScroll: this._preventScroll})
    if (current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusPrev(): void {
    let current = this._current;
    current.blur();
    do { current = current.prev } while (current.isValid());
    current.focus({ preventScroll: this._preventScroll})
    if (current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  public resumeNavigation(releasingElement: IFormElement) {
    this._paused = false;
    if (releasingElement.willBlockArrowNavigation()) {
      this.releaseLockState(releasingElement);
    }
  }

  private pauseNavigation() {
    this._paused = true;
  }

  public handleElementFocus(e: FocusEvent): void {
    e.stopImmediatePropagation();
    this.setCurrent(e.target as IFormElement);
  }

  public setCurrent(element: IFormElement): void {
    if (element.willBlockArrowNavigation()) {
      this.pauseNavigation();
      if (this._current !== element) {
        this.highlightLockState(element);
      };
    }
    this._current = element;
  }

  private attachMarkers(element: IFormElement): void {
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

  private highlightLockState(element: IFormElement): void {
    element.shadowRoot?.querySelectorAll('.lock-state-marker')?.forEach(marker => {
      marker.classList.remove("release");
      marker.classList.add("show");
    })
  }

  private releaseLockState(element: IFormElement) { // TODO: fix this
    const markers = element.shadowRoot?.querySelectorAll('.lock-state-marker');
    markers?.forEach(marker => {
      marker.classList.add("release");
      setTimeout(() => {
        marker.classList.remove("show");
      }, 500);
    });
  }

}
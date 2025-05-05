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
      el.addEventListener('focus', el.navigator!.handleElementFocus.bind(this), true);
      this.attachMarkers(el);
    });
  }

  public activate(): void {
    document.addEventListener('keydown', this.handleKeydown);
  }

  public deactivate(): void {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') return;
    if (e.key === 'Tab') return;

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
    this._current = this._first;
    this._first.focus({ preventScroll: this._preventScroll });
    if (this._current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
  }

  private focusNext(): void {
    this._current.blur();
    do { this._current = this._current.next } while (this._current.isValid());
    this._current.focus({ preventScroll: this._preventScroll})
    if (this._current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
    console.log(this._current, "after focusNext")
  }

  private focusPrev(): void {
    this._current.blur();
    do { this._current = this._current.prev } while (this._current.isValid());
    this._current.focus({ preventScroll: this._preventScroll})
    if (this._current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
    console.log(this._current, "after focusPrev")
  }

  public resumeNavigation(releasingElement: IFormElement) {
    this._paused = false;
    this.releaseLockState(releasingElement);
  }

  private pauseNavigation() {
    this._paused = true;
    this.highlightLockState(this._current);
  }

  public handleElementFocus(e: FocusEvent): void {
    e.stopImmediatePropagation();
    this.setCurrent(e.target as IFormElement);
  }

  public setCurrent(element: IFormElement): void {
    console.log(element, "sets current")
    this._current = element;
    if (this._current.willBlockArrowNavigation()) {
      this.pauseNavigation();
    }
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
/* eslint-disable class-methods-use-this */
import escapeRegex from "./EscapeRegex.js";
import IValueFormatter from "./IValueFormatter.js";

export default abstract class AbstractFormatter implements IValueFormatter {

  protected _delimiter: string;

  constructor(delimiter: string = ' ') {
    this._delimiter = delimiter;
  }

  public abstract getFormattedValue(raw: string): string;
  public abstract getRawValue(formatted: string): string;

  public getAdjustedCursorPosition(
    oldFormatted: string,
    newFormatted: string,
    oldCursor: number
  ): number {
    const oldBefore = oldFormatted.slice(0, oldCursor);
    const newBefore = newFormatted.slice(0, oldCursor);

    const delimiterRegex = new RegExp(`${escapeRegex(this._delimiter)}`, 'g');

    const oldSpaces = (oldBefore.match(delimiterRegex) || []).length;
    const newSpaces = (newBefore.match(delimiterRegex) || []).length;
    const delta = newSpaces - oldSpaces;

    return oldCursor + delta;
  }

  public getMaxLengthIncrementFactor(rawLength: number): number {
    const raw = 'X'.repeat(rawLength);
    const formatted = this.getFormattedValue(raw);
    return formatted.length - raw.length;
  }

}
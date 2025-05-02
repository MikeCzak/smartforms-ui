/* eslint-disable class-methods-use-this */
import AbstractFormatter from "./AbstractFormatter.js";
import escapeRegex from "./EscapeRegex.js";

export default class ChunkFormatter extends AbstractFormatter {
  private _chunkSize: number;

  constructor(chunkSize: number, delimiter: string = ' ') {
    super(delimiter);
    this._chunkSize = chunkSize;
  }

  public getFormattedValue(raw: string): string {
    const escapedDelimiter = escapeRegex(this._delimiter);
    const groupRegex = new RegExp(`(.{${this._chunkSize}})`, 'g');
    const delimiterRegex = new RegExp(escapedDelimiter, 'g');

    const stripped = raw.replace(delimiterRegex, '');
    const grouped = stripped.replace(groupRegex, `$1${this._delimiter}`);
    const trimRegex = new RegExp(`^${escapedDelimiter}+|${escapedDelimiter}+$`, 'g');

    return grouped.replace(trimRegex, '');
  }

  public getRawValue(formatted: string): string {
    const delimiterRegex = new RegExp(escapeRegex(this._delimiter), 'g');
    return formatted.replace(delimiterRegex, '');
  }
}

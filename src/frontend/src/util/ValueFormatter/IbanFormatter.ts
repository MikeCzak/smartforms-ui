/* eslint-disable class-methods-use-this */
import AbstractFormatter from "./AbstractFormatter.js";

export default class IbanFormatter extends AbstractFormatter {

  public getFormattedValue(raw: string): string {
    return raw
      .toUpperCase()
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  public getRawValue(formatted: string): string {
    return formatted.replace(/\s/g, '').toUpperCase();
  }
}

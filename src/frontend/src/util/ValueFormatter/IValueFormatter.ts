export default interface IValueFormatter {
  getFormattedValue(raw: string): string;
  getRawValue(formatted: string): string;
  getAdjustedCursorPosition(
    oldFormatted: string,
    newFormatted: string,
    oldCursor: number
  ): number;
  getMaxLengthIncrementFactor(originalMaxLength: number): number;
}

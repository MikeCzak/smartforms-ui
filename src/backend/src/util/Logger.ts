import { appendFileSync } from 'fs';
import { join } from 'path';

export default class Logger {
  private static logFilePath = join(__dirname, '../../log/api.log');

  public static log(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    try {
      console.log(`logging api request "${logMessage}" ...`)
      appendFileSync(Logger.logFilePath, logMessage, 'utf8');
      console.log('done');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }
}
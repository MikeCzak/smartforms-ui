import IFormloader from "./IFormLoader";
import * as fs from 'fs';
import * as path from 'path';
import FileNotFoundError from "./FileNotFoundError";

export default class RawFormLoader implements IFormloader {

  public async getForm(name: string): Promise<JSON> {
    console.log("DEBUG: dirname: " + __dirname + ", filename: " + __filename)
    const filePath = path.join(__dirname, '../../formTemplate/' + name +'.json');
    try {
      const fileContents = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(fileContents);
    } catch {
      throw new FileNotFoundError(`File not found: ${filePath}`)
    }
  }
}
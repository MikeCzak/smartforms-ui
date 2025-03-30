import { Request, Response } from 'express';
import IFormloader from '../util/IFormLoader';
import RawFormLoader from '../util/RawFormLoader';
import { NextFunction } from 'express-serve-static-core';
import * as fs from 'fs';
import * as path from 'path';
import 'crypto';

interface FormParams {
  name: string;
}

export default class FormController {
  private static _formloader: IFormloader;

  public static async getForm(req: Request<FormParams>, res: Response, next: NextFunction, formloader?: IFormloader): Promise<void> {
    if(formloader) {
      this._formloader = formloader;
    } else {
      this._formloader = new RawFormLoader();
    }
    try {
      const formData = await this._formloader.getForm(req.params.name);
      res.send(formData);
    } catch (error) {
      next(error);
    }

  }

  public static async newForm(form: string): Promise<void> {
    // const timestamp = new Date().toISOString()
    const uuid = crypto.randomUUID()
    const filePath = path.join(__dirname, '../../data', `${uuid}.json`);
    fs.writeFile(filePath, form, 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}
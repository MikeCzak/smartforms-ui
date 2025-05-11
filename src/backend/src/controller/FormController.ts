import { Request, Response } from 'express';
import IFormloader from '../util/IFormLoader';
import RawFormLoader from '../util/RawFormLoader';
import { NextFunction } from 'express-serve-static-core';
import * as fs from 'fs';
import * as path from 'path';
import Logger from '../util/Logger';

const crypto = require('crypto');

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

  public static async newForm(formData: string, formType: string, res: Response, next: NextFunction): Promise<void> {
    const timestamp = new Date().toISOString();
    const uuid = crypto.randomUUID();
    const fileName = `${formType}_${timestamp}_${uuid}.json`;
    const filePath = path.join(__dirname, '../../data', fileName);
    const dataToSave = {
      formType,
      timestamp,
      formData: formData,
    };
    Logger.log("Attempting to save form to file...")
    fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), 'utf-8', (err) => {
      if (err) {
        Logger.log(err.message);
        throw err;
      }
      res.send();
      Logger.log(`...done. The file ${fileName} has been saved!`);
    });
  }
}
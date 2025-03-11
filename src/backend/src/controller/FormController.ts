import { Request, Response } from 'express';
import IFormloader from '../util/IFormLoader';
import RawFormLoader from '../util/RawFormLoader';
import { NextFunction } from 'express-serve-static-core';

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
}
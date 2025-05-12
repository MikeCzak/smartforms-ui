import 'dotenv/config';
import express from 'express';
import FormController from './controller/FormController';
import { Request, Response, NextFunction } from 'express';
import FileNotFoundError from './util/FileNotFoundError';
import Logger from './util/Logger';

const cors = require('cors');
const crypto = require('crypto')

const PORT = process.env.PORT || 3000;
const app = express();
let smart = false;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello from the backend!");
});

app.get('/api/formdata/:name', (req, res, next) => {
  FormController.getForm(req, res, next);
});

app.get('/api/formtype/', (req, res, next) => {
  console.log("getting /api/formtype/")
  smart = !smart;
  const uuid = crypto.randomUUID();
  res.json({"formtype": smart ? 'smart' : 'material', "uuid": uuid});
});

app.post('/api/form/new/:formType/:formId', (req, res, next) => {
  FormController.newForm(req.body, req.params.formType, req.params.formId, res, next)
})


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  Logger.log(err.message);
  if (err instanceof FileNotFoundError) {
    return res.status(404).json({ error: "Requested file not found."});
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

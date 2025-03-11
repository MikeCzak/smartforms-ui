import 'dotenv/config';
import express from 'express';
import FormController from './controller/FormController';
import { Request, Response, NextFunction } from 'express';
import FileNotFoundError from './util/FileNotFoundError';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send("Hello from the backend!");
});

app.get('/api/formdata/:name', (req, res, next) => {
  FormController.getForm(req, res, next);
});




app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof FileNotFoundError) {
    return res.status(404).json({ error: "Requested file not found."});
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

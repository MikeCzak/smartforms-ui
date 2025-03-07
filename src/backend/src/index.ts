import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://admin:example@db:27017')
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Database connection error", err));

app.get('/', (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

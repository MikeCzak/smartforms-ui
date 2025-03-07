import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export const Test = mongoose.model("Test", TestSchema);


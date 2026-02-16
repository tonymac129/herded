import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: false },
  image: { type: String, required: false },
  quizzes: { type: [String], default: [] },
});

export const User = models.User || model("User", UserSchema);
